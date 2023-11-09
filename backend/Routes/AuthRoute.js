const { userSignup, userLogin } = require("../Controllers/userController");
const { userVerification } = require("../Middlewares/AuthMiddleware");
const router = require("express").Router();

// User registration route
router.post("/signup", userSignup);

// User login route
router.post('/login', userLogin);

// User verification middleware
router.post("/", userVerification, (req, res) => {
  // After user verification, determine the isAdmin status based on the user's email
  // Here, we check if the email ends with "@mcc.gov.in" to identify an admin
  const { email } = req.user;

  // Modify the email format check to match your requirements
  const isAdmin = email && email.endsWith("@mcc.kar.in");

  res.json({ isAdmin, status: true, decodeToken: req.user });
});

module.exports = router;
