const validation = async (req, res, next) => {
  const { username, email, password } = req.body;
  const regexPassword = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const regexUsername = /^[a-zA-Z0-9]([._-](?![._-])|[a-zA-Z0-9]){3,18}[a-zA-Z0-9]$/;

  //// Validation Password
  if (!password) {
    res.status(500).json({
      errorMessage: "Password needed.",
    });
  }

  if (!regexPassword.test(password)) {
    res.status(500).json({
      errorMessage: "Password needs to have at least 6 characters and must contain at least one number, one lowercase and one uppercase letter.",
    });
    return;
  }

  /////// Validation email
  if (!email) {
    res.status(500).json({
      errorMessage: "email needed.",
    });
  }

  if (!regexEmail.test(email)) {
    res.status(500).json({
      errorMessage: "Invalid email.",
    });
    return;
  }

  /////// Validation username
  if (!username) {
    res.status(500).json({
      errorMessage: "username needed.",
    });
  }
  if (!regexUsername.test(username)) {
    res.status(500).json({
      errorMessage: "Invalid username.",
    });
    return;
  }
  next();
};

module.exports = validation;
