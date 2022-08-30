const router = require("express").Router();
//=========================ROUTES=========================//
const authRoutes = require("./auth.routes");
const allExperience = require("./experience.routes");
const allUsers = require("./user.routes");
const allPictures = require("./lambdaUser.routes");
const lambdaUserRoutes = require("./lambdaUser.routes");

/* GET home page */
// router.get("/", (req, res, next) => {
//   res.json("All good in here");
// });

//=======================================================================================//
//  We are prefixing our route with :
//=======================================================================================//
router.use("/", lambdaUserRoutes); //==> Home page for all users : can GET on allExperiences
router.use("/auth", authRoutes); //==> SignUp, Login and hashing
router.use("/experience", allExperience); //==>
router.use("/user", allUsers); //==>
router.use("/picture", allPictures); //==>

module.exports = router;
