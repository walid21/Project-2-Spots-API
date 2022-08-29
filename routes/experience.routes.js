//=========================IMPORTING MIDDLEWAARE/MODELS/MODULES=========================//
const router = require("express").Router();
const Experience = require("../models/experience.model");
// const User = require("../models/User.model");
const { isAuthenticated } = require("../middleware/middlewares");
const uploader = require("../config/cloudinary.config");

//=======================================================================================//
// All routes are prefixed with /experience/
//=======================================================================================//

//=========================GET=========================//
// we should add the middleware isAuthenticated ?

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
    const locatedExperiences = await Experience.find(searchForExperience);
    return res.status(200).json(locatedExperiences);
  } catch (error) {
    next(error);
  }
});

//=========================POST=========================//

//POST => create a new Experience + uploadPicture to Cloudinary
router.post(
  "/create",
  isAuthenticated,
  uploader.single("pictures"),
  async (req, res, next) => {
    try {
      console.log(req.file);
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
  }
);

//=========================PATCH=========================// We should test them.
router.patch("/:id", isAuthenticated, async (req, res) => {
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

//=========================PATCH=========================//
router.delete("/:id", isAuthenticated, async (req, res) => {
  await Experience.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});

module.exports = router;
