const router = require("express").Router();
//=========================ROUTES=========================//
const authRoutes = require("./auth.routes");
const allExperience = require("./experience.routes");
const allUsers = require("./user.routes");
const favorites = require("./favorite.routes");
const Experience = require("../models/experience.model");

/* GET home page */
router.get("/home", async (req, res, next) => {
  try {
    const allExperiences = await Experience.find().select("-_id picture name");
    return res.status(200).json(allExperiences);
  } catch (error) {
    next(error);
  }
});

//=======================================================================================//
//  We are prefixing our route with :
//=======================================================================================//

router.use("/auth", authRoutes); //==> SignUp, Login and hashing
router.use("/experience", allExperience); //==>
router.use("/user", allUsers); //==>
router.use("/favorite", favorites);

module.exports = router;
