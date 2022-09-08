const express = require("express");
const { createPayment } = require("../controllers/PaymentController");
const paymentRouter = express.Router();

paymentRouter.post("/:id", createPayment);
module.exports = paymentRouter;
