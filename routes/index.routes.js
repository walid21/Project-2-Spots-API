const router = require("express").Router();
const authRoutes = require("./auth.routes");
const allExperience = require("./experience.routes");
const allUsers = require("./user.routes");
const { isAuthenticated } = require("../middleware/middlewares");
/* GET home page */
router.get("/", isAuthenticated, (req, res, next) => {
  console.log(req.user);
  res.json("All good in here");
});

router.use("/auth", authRoutes);
router.use("/experience", allExperience);
router.use("/user", allUsers);

module.exports = router;
