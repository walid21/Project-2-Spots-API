const Spot = require("../models/Spot.model");
const mongoose = require("mongoose");
const db = require("../db/index");
const spots = [
  {
    name: "Gorge du Verdon",
    location: "France",
  },
  {
    name: "Askja",
    location: "Iceland",
  },
  {
    name: "calanque de Sormiou",
    location: "France",
  },
  {
    name: "lofoten islands",
    location: "Norway",
  },
  {
    name: "lac d'esparron",
    location: "France",
  },
];

//script that will be run to actually seed the database

async function dbLaunch() {
  const db = require("../db/index");
  await Spot.deleteMany();
  const createSpots = await Spot.create(spots);
  console.log("created spots", createSpots);
  mongoose.disconnect();
}

dbLaunch();
