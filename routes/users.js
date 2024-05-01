const verifyJwt = require("../middlewares/verifyJwt");
const Post = require("../models/Post");
const User = require("../models/User");
const upload = require("../utils/upload");
const HttpError = require("../utils/HttpError");
const router = require("express").Router();

router.post("/follow/:userId", verifyJwt, async (req, res) => {
  try {
    const { userId } = req.params;
    const user = req.user;

    if (req.user.id === userId)
      throw new HttpError(409, "You cannot follow yourself");

    const { following } = await User.findById(user.id).lean();

    let alreadyFollowed = false;
    following.forEach((follower) => {
      if (String(follower) === userId) {
        alreadyFollowed = true;
      }
    });

    if (alreadyFollowed) throw new HttpError(409, "Already Followed");

    if (Array.isArray(following) && following.includes(userId)) {
      throw new HttpError(409, "Already Follow this person");
    }

    const updatedFollower = await User.findByIdAndUpdate(userId, {
      $push: { followers: user.id },
    });
    const updatedFollowing = await User.findByIdAndUpdate(
      user.id,
      {
        $push: { following: userId },
      },
      { new: 1 }
    ).populate("following", "-password");

    res.json(updatedFollowing);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.post("/unfollow/:userId", verifyJwt, async (req, res) => {
  try {
    const { userId } = req.params;
    const user = req.user;

    await User.findByIdAndUpdate(userId, {
      $pull: { followers: user.id },
    });

    const updatedFollowing = await User.findByIdAndUpdate(
      user.id,
      {
        $pull: { following: userId },
      },
      { new: 1 }
    ).populate("following", "-password");

    res.json(updatedFollowing);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.get("/recommendation", verifyJwt, async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id)
      .select({ following: 1 })
      .lean();

    if (!user) throw new HttpError(404, "User not found");

    const profiles = await User.find({
      $and: [{ _id: { $ne: req.user.id } }, { _id: { $nin: user.following } }],
    })
      .select({ firstName: 1, lastName: 1 })
      .lean();
    res.send(profiles.slice(0, 4));
  } catch (error) {
    next(error);
  }
});

router.get("/:userId", verifyJwt, async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).select({ password: 0 }).lean();

    if (!user) throw new HttpError(404, "User not found");

    const posts = await Post.find({ postedBy: userId })
      .populate("postedBy")
      .populate("likes")
      .populate("comments.user")
      .lean();

    res.send({
      user,
      posts,
    });
  } catch (error) {
    next(error);
  }
});

router.post("/search", async (req, res, next) => {
  try {
    const { q } = req.query;

    if (!q) throw new HttpError(400, "Query q is missing");

    const profiles = await User.find({
      $or: [
        { firstName: { $regex: q, $options: "i" } },
        { lastName: { $regex: q, $options: "i" } },
      ],
    })
      .select({ password: 0, following: 0, followers: 0, email: 0 })
      .lean();

    const result = profiles.map((item) => {
      let obj = {
        id: item._id,
        title: `${item.firstName} ${item.lastName}`,
      };

      return obj;
    });

    res.send(result);
  } catch (error) {
    next(error);
  }
});

router.put(
  "/edit",
  verifyJwt,
  upload.single("file"),
  async (req, res, next) => {
    try {
      const user = req.user;
      const file = req.file;

      console.log(req.file);

      const { firstName, lastName, bio, city, country } = req.body;

      if (!firstName || !lastName || !bio || !city || !country)
        throw new HttpError(400, "All fields are required");

      const newObj = {
        ...req.body
      };

      if(file) {
        newObj.avatar = `${req.protocol}://${req.get("host")}/images/${file.filename}`
      }

      const profile = await User.findByIdAndUpdate(
        user.id,
        {
          $set: {
            ...newObj,
          },
        },
        { new: 1 }
      )
        .populate("followers", "-password -following -followers")
        .populate("following", "-password -following -followers")
        .select({ password: 0 });

      res.send(profile);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
