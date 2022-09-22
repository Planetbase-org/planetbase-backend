const OrganizerModel = require("../models/OrganizerModel");
const jwt = require("jsonwebtoken");
// const EventsModel = require("../models/EventsModel");
const crypto = require("crypto");
const sendEmail = require("../util/SendMail");
const sgMail = require("@sendgrid/mail");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "4d" });
};

exports.signup = async (req, res) => {
  const { firstname, lastname, email, password, productUpdates } = req.body;
  try {
    const organizer = await OrganizerModel.signup(
      firstname,
      lastname,
      email,
      password,
      productUpdates
    );
    //Create token
    const token = createToken(organizer._id);
    res.status(201).json({
      success: true,
      message: organizer,
      token,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const organizer = await OrganizerModel.login(email, password);
    const token = createToken(organizer._id);
    res.status(201).json({
      success: true,
      organizer,
      token,
    });
  } catch (err) {
    res.status(401).json({
      success: false,
      message: err.message,
    });
  }
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const organizer = await OrganizerModel.findOne({ email });
    if (!organizer) {
      throw Error("User does not exist");
    }
    const resetToken = organizer.getResetPassToken();
    await organizer.save();

    const resetUrl = `https://www.planetbase.io/resetPassword/${resetToken}`;
    const message = `
      <h3>Reset Password</h3>
      <p>Please click on the link below to reset your password</p>
      <a href="${resetUrl}" clicktracking="off">${resetUrl}</a>
    `;

    //Send email to client
    try {
      await sendEmail({
        to: organizer.email,
        subject: "Password reset",
        text: message,
      });
      res.status(200).json({
        success: true,
        data: "Email sent",
      });
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save();

      throw Error("Email could not be sent");
    }
  } catch (error) {
    res.status(401).json({
      error: error.message,
    });
  }
};

//Reset Password
exports.resetPassword = async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.resetToken)
    .digest("hex");

  try {
    const organizer = await OrganizerModel.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!organizer) {
      throw Error(
        "Invalid reset token",
        res.status(400).json({
          error: "Invalid reset token",
        })
      );
    }
    organizer.password = req.body.password;
    organizer.resetPasswordToken = undefined;
    organizer.resetPasswordExpire = undefined;

    await organizer.save();
    res.status(201).json({
      success: true,
      data: "Password has been reset",
    });
  } catch (error) {
    next(error);
  }
};

exports.emailTest = async (req, res) => {
  console.log("Email");
};
