const express = require("express");
const router = express.Router();
const { signUp, login } = require("../controllers/authController");
const passport = require("passport");
const jwt = require("jsonwebtoken");

// Sign Up Route
router.route("/signUp").post(signUp);

// Login Route
router.route("/login").post(login);

// Route for Google login/signup
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Google OAuth callback route
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    const user = req.user;
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token });
  }
);

// Logout route
router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

module.exports = router;
