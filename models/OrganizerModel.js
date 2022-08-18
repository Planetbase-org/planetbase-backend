const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");
const OrganizerSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide a valid email",
    ],
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  productUpdates: {
    type: String,
  },
});

//Signup Method
OrganizerSchema.statics.signup = async function (
  firstname,
  lastname,
  email,
  password,
  productUpdates
) {
  //Validation
  if (!email || !password) {
    throw Error("Invalid Email or Password! All fields must be filled");
  }
  if (!validator.isEmail(email) && !validator.isStrongPassword(password)) {
    throw Error("Email and password are not valid.");
  }
  if (!validator.isEmail(email)) {
    throw Error("Invalid Email");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error(
      "Password is not strong enough! Password has to be at least 8 characters, must contain 1 uppercase, 1 lowercase and 1 symbol"
    );
  }
  const exists = await this.findOne({ email });
  if (exists) {
    throw Error("Email already in use!");
  }

  //Salt Password
  const salt = await bcrypt.genSalt(10);
  //Hash Password
  const hash = await bcrypt.hash(password, salt);
  //Save Organizer after hashing
  const organizer = await this.create({
    firstname,
    lastname,
    email,
    password: hash,
    productUpdates,
  });
  return organizer;
};

//Static login method
OrganizerSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("Invalid email or password. All fields must be filled");
  }
  const organizer = await this.findOne({ email });
  if (!organizer) {
    throw Error("Incorrect email!");
  }
  //Match passwords
  const match = await bcrypt.compare(password, organizer.password);
  if (!match) {
    throw Error("Incorrect password!");
  }
  return organizer;
};

const OrganizerModel = mongoose.model("Organizer", OrganizerSchema);
module.exports = OrganizerModel;
