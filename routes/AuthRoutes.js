const express = require("express");
const {
  signup,
  login,
  forgotPassword,
  resetPassword,
  emailTest,
} = require("../controllers/AuthController");
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/forgotPassword", forgotPassword);
router.put("/resetPassword/:resetToken", resetPassword);
router.post("/sendEmail", emailTest);

module.exports = router;
