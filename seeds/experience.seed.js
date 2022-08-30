const mongoose = require("mongoose");
const Experience = require("../models/experience.model");

const experiences = [
  {
    name: "Gorge du Verdon",
    location: "France",
    theme: "Extreme",
    activity: "kayaking",
    description: "c'était trop rapide wouhou!!",
    picture:
      "https://www.startpage.com/av/proxy-image?piurl=https%3A%2F%2Fcdn.radiofrance.fr%2Fs3%2Fcruiser-production%2F2020%2F06%2F11734b54-41b4-4f10-bb96-2f452f138ceb%2F870x489_vue_aiguines_depuis_gorges.jpg&sp=1661521861Tc664f02d99d1447897713c74969bcaeacf0858bd4907c952d0b0a3864b450916",
  },
  {
    name: "Askja",
    location: "Iceland",
    theme: "Extreme",
    activity: "hikking",
    description: "de la neige à perte de vue et un ours polaire",
    picture:
      "https://www.startpage.com/av/proxy-image?piurl=https%3A%2F%2Fi.natgeofe.com%2Fn%2F86226a60-5559-4b7e-8b74-c1869ed4238f%2FIceland-mount-Kirkjufell-aurora_16x9.jpg&sp=1661521914Tdc2f356911088f1b7728c22222217cfa5a5cab2563243caaaf3472ea51647b8c",
  },
  {
    name: "calanque de Sormiou",
    location: "France",
    theme: "chill",
    activity: "dating",
    description: "tranquille et silencieux",
    picture:
      "https://www.startpage.com/av/proxy-image?piurl=https%3A%2F%2Fencrypted-tbn0.gstatic.com%2Fimages%3Fq%3Dtbn%3AANd9GcTBQ4qYWDz3vA8vNptKyXh5fnDarNZiA1C-_id-u0C4M7Wa7uE%26s&sp=1661521941Tf35e32d516748a581102e76ba226d031f4a67c4b629ecf5a7e8a4438c910a7cb",
  },
  {
    name: "lofoten islands",
    location: "Norway",
    theme: "chill",
    activity: "fishing",
    description: "j'ai peché un enorme poisson ",
    picture:
      "https://www.startpage.com/av/proxy-image?piurl=https%3A%2F%2Fmedia.timeout.com%2Fimages%2F105237855%2Fimage.jpg&sp=1661521963Ta6ab61f8167f9a1fd08640957a635c58f3fc81238659d963439dee1b9a757f68",
  },
  {
    name: "lac d'esparron",
    location: "France",
    theme: "chill",
    activity: "walking",
    description: "peaceful and beautiful",
    picture:
      "https://www.startpage.com/av/proxy-image?piurl=https%3A%2F%2Fencrypted-tbn0.gstatic.com%2Fimages%3Fq%3Dtbn%3AANd9GcRK-HIsEcj02Nv7hqGy05EpovdTKnd-6r3dYCHY2bPN27aOcIE%26s&sp=1661522039T0cdf044a605d83a728c0e239db07bf193626f5b7008fb0ea1bf33c1bb18adbce",
  },
];

async function dbLaunch() {
  const db = require("../db/index");
  await Experience.deleteMany();
  const createExperience = await Experience.create(experiences);
  console.log("created experiences", createExperience);
  mongoose.disconnect();
}

dbLaunch();
