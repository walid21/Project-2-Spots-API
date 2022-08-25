const Spot = require("../models/Spot.model");
const mongoose = require("mongoose");
const db = require("../db/index");
const spots = [
  {
    name: "Gorge du Verdon",
    location: "France",
    theme: "Extreme",
    activity: "kayaking",
    topography: "rapids",
  },
  {
    name: "Askja",
    location: "Iceland",
    theme: "Extreme",
    activity: "4x4 riding",
    topography: "mountain",
  },
  {
    name: "calanque de Sormiou",
    location: "France",
    theme: "extreme",
    activity: "climbing",
    topography: "seaside",
  },
  {
    name: "lofoten islands",
    location: "Norway",
    theme: "Extreme",
    activity: "hiking",
    topography: "islands",
  },
  {
    name: "lac d'esparron",
    location: "France",
    theme: "Love",
    activity: "dating",
    topography: "lake",
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
