const router = require("express").Router();
const Experience = require("../models/experience.model");

// GET for lambdaUsers : You get all Pictures

router.get("/home", async (req, res, next) => {
  try {
    const allExperiences = await Experience.find().select("-_id picture name");
    return res.status(200).json(allExperiences);
  } catch (error) {
    next(error);
  }
});

// GET // search by : location , theme , activity
router.get("/home/search", async (req, res, next) => {
  try {
    const searchForExperience = req.query;
    const locatedExperiences = await Experience.find(searchForExperience);
    return res.status(200).json(locatedExperiences);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
