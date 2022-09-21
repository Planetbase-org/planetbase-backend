const mongoose = require("mongoose");
const BidSchema = new mongoose.Schema({
  bidFrom: {
    type: String,
    required: true,
  },
  bidTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Organizer",
  },
  email: {
    type: String,
    required: true,
  },
  bidDate: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    match: [
      /([0-9\s\-]{7,})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/,
      "Please enter a correct format for your phone number",
    ],
  },
  bidAmount: {
    type: Number,
    required: true,
  },
  bidDesc: {
    type: String,
    required: true,
  },
});

const BidModel = mongoose.model("Bids", BidSchema);
module.exports = BidModel;
