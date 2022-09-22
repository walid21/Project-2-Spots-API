const router = require("express").Router();
const mongoose = require("mongoose");

//=========================ROUTES=========================//
const User = require("../models/User.model");

//=========================PASSWORD ENCRYPTION=========================//
const bcrypt = require("bcrypt");
const jsonWebToken = require("jsonwebtoken");
const { isAuthenticated } = require("../middleware/middlewares");
const saltRounds = 10;

router.post("/signup", (req, res) => {
  const { username, password } = req.body;

  if (!username) {
    return res
      .status(400)
      .json({ errorMessage: "Please provide your username." });
  }

  if (password.length < 8) {
    return res.status(400).json({
      errorMessage: "Your password needs to be at least 8 characters long.",
    });
  }

  // Search the database for a user with the username submitted in the form
  User.findOne({ username }).then((found) => {
    // If the user is found, send the message username is taken
    if (found) {
      return res.status(400).json({ errorMessage: "Username already taken." });
    }

    // if user is not found, create a new user - start with hashing the password
    return bcrypt
      .genSalt(saltRounds)
      .then((salt) => bcrypt.hash(password, salt))
      .then((hashedPassword) => {
        // Create a user and save it in the database
        return User.create({
          username,
          password: hashedPassword,
        });
      })
      .then((user) => {
        res.status(201).json(user);
      })
      .catch((error) => {
        if (error.code === 11000) {
          return res.status(400).json({
            errorMessage: `username need to be unique. The username you chose is already in use.`,
          });
        }
        if (error instanceof mongoose.Error.ValidationError) {
          return res.status(400).json({ errorMessage: error.message });
        }
      });
  });
});

router.post("/login", (req, res, next) => {
  const { username, password } = req.body;

  if (!username) {
    return res
      .status(400)
      .json({ errorMessage: "Please provide your username." });
  }

  // Here we use the same logic as above
  // - either length based parameters or we check the strength of a password
  if (password.length < 8) {
    return res.status(400).json({
      errorMessage: "Your password needs to be at least 8 characters long.",
    });
  }

  // Search the database for a user with the username submitted in the form
  User.findOne({ username })
    .then((user) => {
      // If the user isn't found, send the message that user provided wrong credentials
      if (!user) {
        console.log(password);
        console.log(user.password);
        return res.status(400).json({ errorMessage: "Wrong credentials" });
      }

      // If user is found based on the username, check if the in putted password matches the one saved in the database
      bcrypt.compare(password, user.password).then((isSamePassword) => {
        if (!isSamePassword) {
          return res.status(400).json({ errorMessage: "Wrong credentials" });
        }
        // req.session.user = user._id; // ! better and safer but in this case we saving the entire user object
        // Should create a token
        // Renvoyer ce token a l'utilisateur
        const payload = { username };
        const token = jsonWebToken.sign(payload, process.env.TOKEN_SECRET, {
          algorithm: "HS256",
          expiresIn: "24h",
        });

        res.status(200).json(token);
      });
    })

    .catch((err) => {
      // in this case we are sending the error handling to the error handling middleware that is defined in the error handling file
      // you can just as easily run the res.status that is commented out below
      next(err);
      // return res.status(500).render("login", { errorMessage: err.message });
    });
});

router.get("/login", isAuthenticated, (req, res, next) =>
  res.status(200).json(req.user)
);

module.exports = router;
