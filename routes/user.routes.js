//=========================IMPORTING MIDDLEWAARE/MODELS/MODULES=========================//
const router = require("express").Router();
const User = require("../models/User.model");
const { isAuthenticated } = require("../middleware/middlewares");
const bcrypt = require("bcrypt");
const validation = require("../middleware/validation.middleware");
//=======================================================================================//
// All routes are prefixed with /user
//=======================================================================================//

//=========================GET=========================//

//GET => find all users
router.get("/", async (req, res, next) => {
  try {
    const allUsers = await User.find();
    return res.status(200).json(allUsers);
  } catch (error) {}
});

//GET => should we GET the user id ? Because when he's logged in ,
// we should be able to display his own profil

//=========================POST=========================//

//POST => create a new user
router.post("/signup", validation, async (req, res, next) => {
  try {
    const newUser = req.body;
    const passwordHashed = bcrypt.hashSync(newUser.password, 10);
    const createdUser = await User.create({
      username: newUser.username,
      email: newUser.email,
      password: passwordHashed,
    });

    res.status(201).json({ user: createdUser });
  } catch (error) {
    next(error);
  }
});

//=========================PATCH=========================//
//  should we modify the picture(copy/paster the experience route ? using middleware cloudinary)

//PATCH => modify you profil
router.patch("/update/:id", isAuthenticated, async (req, res) => {
  const newUser = req.body;
  const userUpdated = await User.findByIdAndUpdate(req.params.id, newUser, { new: true });
  res.json({ userUpdated });
});
//PATCH => modify you profil
router.delete("/:id", isAuthenticated, async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});

module.exports = router;
