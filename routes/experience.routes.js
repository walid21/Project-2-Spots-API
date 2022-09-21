//=========================IMPORTING MIDDLEWAARE/MODELS/MODULES=========================//
const router = require("express").Router();
const Experience = require("../models/experience.model");
const User = require("../models/User.model");
const { isAuthenticated } = require("../middleware/middlewares");
const uploader = require("../config/cloudinary.config");

//=======================================================================================//
// All routes are prefixed with /experience/
//=======================================================================================//

//=========================GET=========================//
//

//GET => find all experiences
router.get("/", async (req, res, next) => {
  try {
    const allExperiences = await Experience.find();
    return res.status(200).json(allExperiences);
  } catch (error) {
    next(error);
  }
});

//GET => search by : location , theme , activity
router.get("/search", async (req, res, next) => {
  try {
    const searchForExperience = req.query;
    if (searchForExperience.userId === "me") {
      searchForExperience.userId = req.user.id;
    }
    const locatedExperiences = await Experience.find(searchForExperience);
    return res.status(200).json(locatedExperiences);
  } catch (error) {
    next(error);
  }
});

//=========================POST=========================//

//POST => create a new Experience + uploadPicture to Cloudinary
router.post("/create", isAuthenticated, uploader.single("picture"), async (req, res, next) => {
  try {
    const newExperience = req.body;
    const createdExperience = await Experience.create({
      name: newExperience.name,
      location: newExperience.location,
      theme: newExperience.theme,
      description: newExperience.description,
      activity: newExperience.activity,
      picture: req.file.path,
      userId: req.user._id,
    });

    res.status(201).json({ experience: createdExperience });
  } catch (error) {
    next(error);
  }
});

//=========================PATCH=========================// We should test them.
router.patch("/:id", isAuthenticated, uploader.single("picture"), async (req, res) => {
  try {
    const newExperience = req.body;
    const ExperienceUpdated = await Experience.findByIdAndUpdate(
      req.params.id,
      {
        name: newExperience.name,
        location: newExperience.location,
        theme: newExperience.theme,
        description: newExperience.description,
        activity: newExperience.activity,
        picture: req.file?.path,
        userId: newExperience.userId,
      },
      { new: true }
    );
    res.status(201).json({ ExperienceUpdated });
  } catch (error) {
    next(error);
  }
});

//=========================PATCH=========================//
router.delete("/:id", isAuthenticated, async (req, res) => {
  await Experience.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});

module.exports = router;
