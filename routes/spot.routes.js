const router = require("express").Router();
const Spot = require("../models/Spot.model");

router.get("/", async (req, res, next) => {
  try {
    const allSpots = await Spot.find();
    return res.status(200).json(allSpots);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const newSpot = req.body;
    const createdSpot = await Spot.create({
      name: newSpot.name,
      location: newSpot.location,
      theme: newSpot.theme,
      activity: newSpot.activity,
      topography: newSpot.topography,
    });
    console.log("createdSpot", createdSpot);

    res.status(201).json({ spot: createdSpot });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
