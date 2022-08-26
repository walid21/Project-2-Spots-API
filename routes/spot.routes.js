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
    });
    console.log("createdSpot", createdSpot);

    res.status(201).json({ spot: createdSpot });
  } catch (error) {
    next(error);
  }
});

router.patch("/:id", async (req, res) => {
  const newSpot = req.body;
  const spotUpdated = await Spot.findByIdAndUpdate(
    req.params.id,
    {
      name: newSpot.name,
      location: newSpot.location,
    },
    { new: true }
  );
  res.json({ spotUpdated });
});

router.delete("/:id", async (req, res) => {
  await Spot.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});

module.exports = router;
