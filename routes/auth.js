const User = require("../models/User");
const { generateJWT } = require("../utils");
const verifyJwt = require("../middlewares/verifyJwt");

const router = require("express").Router();

router.post("/register", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const user = await User.findOne({ email }).lean();

    if (user) {
      return res.status(409).json({ message: "email already exists" });
    }

    const newuser = new User({
      firstName,
      lastName,
      email,
      password,
    });

    const savedUser = await newuser.save();

    res.send(savedUser);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log(email, password);

    if (!email || !password)
      return res.status(400).json({ mesasge: "Fields empty" });

    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: "User not found" });

    const isValid = await user.isValidPassword(password);

    if (!isValid) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const token = await generateJWT({
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
    });

    res.send({ token });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/current-user", verifyJwt, async (req, res) => {
  try {
    const user = req.user;

    const currentUser = await User.findById(req.user.id)
      .populate("followers", "firstName lastName")
      .populate("following", "firstName lastName")
      .select({ password: 0 });

    if (!user) return res.status(404).json({ message: "User not found" });

    res.send(currentUser);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
