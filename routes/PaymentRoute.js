const express = require("express");
const { createPayment } = require("../controllers/PaymentController");
const paymentRouter = express.Router();

paymentRouter.post("/", createPayment);
module.exports = paymentRouter;
