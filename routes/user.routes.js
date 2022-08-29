const router = require("express").Router();
const User = require("../models/User.model");
//const fileUploader = require("../config/cloudinary.config");
const { isAuthenticated } = require("../middleware/middlewares");
const bcrypt = require("bcrypt");
router.get("/", async (req, res, next) => {
  try {
    const allUsers = await User.find();
    return res.status(200).json(allUsers);
  } catch (error) {
    console.log("test");
  }
});

router.post("/create", async (req, res, next) => {
  try {
    const newUser = req.body;
    const passwordHashed = bcrypt.hashSync(newUser.password, 10);
    const createdUser = await User.create({
      username: newUser.username,
      email: newUser.email,
      password: passwordHashed,
      pictures: newUser.pictures,
      favorites: newUser.favorites,
    });
    console.log("createdUser", createdUser);

    res.status(201).json({ user: createdUser });
  } catch (error) {
    next(error);
  }
});

router.patch("/:id", isAuthenticated, async (req, res) => {
  const newUser = req.body;
  const userUpdated = await User.findByIdAndUpdate(
    req.params.id,
    {
      username: newUser.username,
      email: newUser.email,
      password: newUser.password,
      pictures: newUser.pictures,
      favorites: newUser.favorites,
    },
    { new: true }
  );
  res.json({ userUpdated });
});

router.delete("/:id", isAuthenticated, async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});
module.exports = router;
