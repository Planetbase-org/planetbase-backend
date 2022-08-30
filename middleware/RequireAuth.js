const jwt = require("jsonwebtoken");
const OrganizerModel = require("../models/OrganizerModel");

exports.requireAuth = async (req, res, next) => {
  //Verify authentication
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }
  const token = authorization.split(" ")[1];
  try {
    const { _id } = jwt.verify(token, process.env.JWT_SECRET);
    req.organizer = await OrganizerModel.findOne({ _id }).select("_id");
    next();
  } catch (error) {
    res.status(401).json({ error });
  }
};
