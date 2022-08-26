const Spot = require("../models/Spot.model");
const mongoose = require("mongoose");
const db = require("../db/index");
const Experience = require("../models/experience.model");
const experiences = [
  {
    name: "Une experience unique!",
    theme: "Extreme",
    activity: "kayaking",
    description: "c'était trop rapide wouhou!!",
  },
  {
    name: "Brr il fait froid",
    theme: "Extreme",
    activity: "hikking",
    description: "de la neige à perte de vue et un ours polaire",
  },
  {
    name: "posé au calme",
    theme: "chill",
    activity: "dating",
    description: "tranquille et silencieux",
  },
  {
    name: "Une zone de pêche folle",
    theme: "chill",
    activity: "fishing",
    description: "j'ai peché un enorme poisson ",
  },
  {
    name: "Une experience unique!",
    theme: "Extreme",
    activity: "kayaking",
    description: "c'était trop rapide wouhou!!",
  },
];

async function dbLaunch() {
  const db = require("../db/index");
  await Experience.deleteMany();
  const spots = await Spot.find();
  experiences.forEach((experience) => {
    experience.spotId = spots[Math.floor(Math.random() * spots.length)]._id;
  });
  const createExperience = await Experience.create(experiences);
  console.log("created experiences", createExperience);
  mongoose.disconnect();
}

dbLaunch();
