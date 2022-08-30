const router = require("express").Router();
const Favorite = require("../models/favorites.model");
const User = require("../models/User.model");
const { isAuthenticated } = require("../middleware/middlewares");

router.get("/", isAuthenticated, async (req, res, next) => {
  try {
    const allFavorites = await Favorite.find(req.user._id).populate(
      "experience"
    );

    return res.status(200).json(allFavorites);
  } catch (error) {
    next(error);
  }
});

router.post("/create", isAuthenticated, async (req, res, next) => {
  try {
    const newFavorite = req.body;
    const createdFavorite = await Favorite.create({
      user: req.user._id,
      experience: newFavorite.experienceId,
    });
    res.status(201).json({ createdFavorite });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
