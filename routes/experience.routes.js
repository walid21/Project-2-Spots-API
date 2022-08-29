const router = require("express").Router();
const Experience = require("../models/experience.model");
const fileUploader = require('../config/cloudinary.config')

router.get("/", async (req, res, next) => {
  try {
    const allExperiences = await Experience.find();
    return res.status(200).json(allExperiences);
  } catch (error) {
    next(error);
  }
});
// GET // search by : location , theme , activity
router.get("/search", async (req, res, next) => {
  try {
    const searchForLocation = req.query;
    const locatedExperiences = await Experience.find(searchForLocation);
    return res.status(200).json(locatedExperiences);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const newExperience = req.body;
    const createdExperience = await Experience.create({
      name: newExperience.name,
      location: newExperience.location,
      theme: newExperience.theme,
      description: newExperience.description,
      activity: newExperience.activity,
      picture: newExperience.picture,
      userId: newExperience.userId,
    });
    console.log("createdExperience", createdExperience);

    res.status(201).json({ experience: createdExperience });
  } catch (error) {
    next(error);
  }
});

router.patch("/:id", async (req, res) => {
  const newExperience = req.body;
  const ExperienceUpdated = await Experience.findByIdAndUpdate(
    req.params.id,
    {
      name: newExperience.name,
      location: newExperience.location,
      theme: newExperience.theme,
      description: newExperience.description,
      activity: newExperience.activity,
      picture: newExperience.picture,
      userId: newExperience.userId,
    },
    { new: true }
  );
  res.json({ ExperienceUpdated });
});

router.delete("/:id", async (req, res) => {
  await Experience.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});

module.exports = router;
