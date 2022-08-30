const express = require("express");
const { signup, login } = require("../controllers/CompanyAuthController");
const companyRouter = express.Router();

companyRouter.post("/signup", signup);
companyRouter.post("/login", login);
module.exports = companyRouter;
