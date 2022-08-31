const router = require("express").Router();
const Favorite = require("../models/favorites.model");
//const User = require("../models/User.model");
const { isAuthenticated } = require("../middleware/middlewares");

router.get("/", isAuthenticated, async (req, res, next) => {
  try {
    const allFavorites = await Favorite.find({ user: req.user._id }).populate("experience");

    return res.status(200).json(allFavorites);
  } catch (error) {
    next(error);
  }
});

router.post("/create", isAuthenticated, async (req, res, next) => {
  try {
    const newFavorite = req.body;
    console.log(newFavorite);
    const createdFavorite = await Favorite.create({
      user: req.user._id,
      experience: newFavorite.experience,
    });
    res.status(201).json({ createdFavorite });
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", isAuthenticated, async (req, res) => {
  await Favorite.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});

module.exports = router;
