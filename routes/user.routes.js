//=========================IMPORTING MIDDLEWAARE/MODELS/MODULES=========================//
const router = require("express").Router();
const User = require("../models/User.model");
const { isAuthenticated } = require("../middleware/middlewares");
const bcrypt = require("bcrypt");

//=======================================================================================//
// All routes are prefixed with /user
//=======================================================================================//

//=========================GET=========================//
// should we keep it as is ? because we need allexperience instead ? or maybe just add isAuthenticated to it
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

    res.status(201).json({ user: createdUser });
  } catch (error) {
    next(error);
  }
});

//=========================PATCH=========================//
//  should we modify the picture(copy/paster the experience route ? using middleware cloudinary)

//PATCH => modify you profil
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
//PATCH => modify you profil
router.delete("/:id", isAuthenticated, async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});

module.exports = router;
