const { Schema } = require("mongoose");
const verifyJwt = require("../middlewares/verifyJwt");
const Post = require("../models/Post");
const User = require("../models/User");
const upload = require('../utils/upload')
const router = require("express").Router();

router.post("/follow/:userId", verifyJwt, async (req, res) => {
  try {
    const { userId } = req.params;
    const user = req.user;

    console.log(userId);
    if (req.user.id === userId)
      return res.status(409).json({ message: "You cannot follow yourself" });

    const { following } = await User.findById(user.id).lean();

    // console.log(JSON.stringify(following, undefined, 2), typeof userId)
    // console.log(String(following.includes(userId)));

    let alreadyFollowed = false;
    following.forEach((follower) => {
      if (String(follower) === userId) {
        alreadyFollowed = true;
      }
    });

    if (alreadyFollowed)
      return res.status(409).json({ message: "Already followed" });

    if (Array.isArray(following) && following.includes(userId)) {
      return res.status(409).json({ message: "You already follow thi person" });
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
    res.status(500).json({ message: "Internal Server Error" });
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
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/:userId", verifyJwt, async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).select({ password: 0 }).lean();

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
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/search", async (req, res) => {
  try {
    const { q } = req.query;

    if (!q) return res.status(400).json({ message: "Query empty" });

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
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.put("/edit", verifyJwt, upload.single('avatar'), async (req, res, next) => {
  try {
    const user = req.user;
    const file = req.file.filename

    console.log("--------", req.file.filename)
    const { firstName, lastName, bio, city, country } = req.body;

    if ((!firstName, !lastName, !bio, !city, !country))
      return res.status(400).json({ message: "All fields required" });


    const newObj = { ...req.body, avatar: file }

    const profile = await User.findByIdAndUpdate(
      user.id,
      {
        $set: {
          ...newObj
        },
      },
      { new: 1 }
    )
      .populate("followers", "-password -following -followers")
      .populate("following", "-password -following -followers")
      .select({ password: 0 });

    res.send(profile);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
