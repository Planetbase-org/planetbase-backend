const CompanyModel = require("../models/CompanyModel");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "4d" });
};

exports.signup = async (req, res) => {
  const { companyName, companyEmail, companyPhone, companyAddress, password } =
    req.body;
  try {
    const company = await CompanyModel.signup(
      companyName,
      companyEmail,
      companyPhone,
      companyAddress,
      password
    );
    const token = createToken(company._id);
    res.status(201).json({
      success: true,
      company,
      token,
    });
  } catch (error) {
    res.status(401).json({ error });
  }
};

exports.login = async (req, res) => {
  const { companyEmail, password } = req.body;
  try {
    const company = await CompanyModel.login(companyEmail, password);
    const token = createToken(company._id);
    res.status(201).json({
      success: true,
      company,
      token,
    });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};
