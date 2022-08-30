const router = require("express").Router();
//=========================ROUTES=========================//
const authRoutes = require("./auth.routes");
const allExperience = require("./experience.routes");
const allUsers = require("./user.routes");
const favorites = require("./favorite.routes");

/* GET home page */
// router.get("/", (req, res, next) => {
//   res.json("All good in here");
// });

//=======================================================================================//
//  We are prefixing our route with :
//=======================================================================================//

router.use("/auth", authRoutes); //==> SignUp, Login and hashing
router.use("/experience", allExperience); //==>
router.use("/user", allUsers); //==>
router.use("/favorite", favorites);

module.exports = router;
