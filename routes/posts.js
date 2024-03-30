const verifyJwt = require("../middlewares/verifyJwt");
const Post = require("../models/Post");
const User = require("../models/User");
const upload = require("../utils/upload");
const router = require("express").Router();

router.post("/", verifyJwt, upload.single('file'), async (req, res) => {
  try {
    const { title } = req.body;
    console.log(req.file.filename)
    const user = req.user;

    const post = new Post({
      title,
      image:  req.file ? req.file.filename: '',
      postedBy: user.id
    });

    const savedPost = await post.save();
    const newPost = await post.populate("postedBy");

    console.log({ newPost });

    res.send(newPost);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/", verifyJwt, async (req, res, next) => {
  try {
    const user = req.user;

    const { following } = await User.findById(user.id)
      .select({ following: 1 })
      .lean();


      console.log({following})

    const posts = await Post.find({
      $or: [{ postedBy: user.id }, { postedBy: { $in: [...following] } }],
    })
      .sort({
        createdAt: -1,
      })
      .populate("likes", "-password -following -followers")
      .populate("comments.user", "-password -following -followers")
      .populate("postedBy", "-password -following -followers");

    res.send(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/:postId/like", verifyJwt, async (req, res) => {
  try {
    const { postId } = req.params;
    const user = req.user;

    const post = await Post.findById(postId);

    if (!post) return res.status(404).json({ message: "Post not found" });

    let likedPost;
    if (post.likes.includes(user.id)) {
      likedPost = await Post.findByIdAndUpdate(
        postId,
        { $pull: { likes: user.id } },
        { new: 1 }
      ).populate("likes");
    } else {
      likedPost = await Post.findByIdAndUpdate(
        postId,
        { $push: { likes: user.id } },
        { new: 1 }
      ).populate("likes");
    }

    res.send(likedPost);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/:postId/comment", verifyJwt, async (req, res) => {
  try {
    const { postId } = req.params;

    const { text } = req.body;

    const user = req.user;

    const post = await Post.findById(postId);

    if (!post) return res.status(404).json({ message: "Post not found" });

    const commentedPost = await Post.findByIdAndUpdate(
      postId,
      { $push: { comments: { user: user.id, text } } },
      { new: 1 }
    ).populate("comments.user");

    res.send(commentedPost);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
