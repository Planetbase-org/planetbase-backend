const OrganizerModel = require("../models/OrganizerModel");
const jwt = require("jsonwebtoken");
// const EventsModel = require("../models/EventsModel");

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
      message: organizer,
      token,
    });
  } catch (err) {
    res.status(401).json({
      success: false,
      message: err.message,
    });
  }
};
