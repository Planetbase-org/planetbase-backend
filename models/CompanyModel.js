const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const CompanySchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
  },
  companyEmail: {
    type: String,
    required: true,
    unique: true,
    match: [
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide a valid email",
    ],
  },
  companyPhone: {
    type: String,
    required: true,
    match: [
      /([0-9\s\-]{7,})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/,
      "Please enter a correct format for your phone number",
    ],
  },
  companyAddress: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
});

CompanySchema.statics.signup = async function (
  companyName,
  companyEmail,
  companyPhone,
  companyAddress,
  password
) {
  if (!companyEmail || !password) {
    throw Error("Invalid email or password");
  }
  if (
    !validator.isEmail(companyEmail) &&
    !validator.isStrongPassword(password)
  ) {
    throw Error("Email and password are not valid");
  }
  if (!validator.isEmail(companyEmail)) {
    throw Error("Invalid Email");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error(
      "Password is not strong enough! Password has to be at least 8 characters, must contain 1 uppercase, 1 lowercase and 1 symbol"
    );
  }
  const exists = await this.findOne({ companyEmail });
  if (exists) {
    throw Error("Email already in use");
  }
  //Salt password
  const salt = await bcrypt.genSalt(10);
  //Hash Password
  const hash = await bcrypt.hash(password, salt);
  //Save company details after hashing
  const companyDetails = await this.create({
    companyName,
    companyEmail,
    companyPhone,
    companyAddress,
    password: hash,
  });
  return companyDetails;
};
//Login
CompanySchema.statics.login = async function (companyEmail, password) {
  if (!companyEmail || !password) {
    throw Error("Invalid email or password. All fields must be filled");
  }
  const company = await this.findOne({ companyEmail });
  if (!company) {
    throw Error("Incorrect email!");
  }
  //Match passwords
  const match = await bcrypt.compare(password, company.password);
  if (!match) {
    throw Error("Incorrect password!");
  }
  return company;
};

const CompanyModel = mongoose.model("Company", CompanySchema);
module.exports = CompanyModel;
