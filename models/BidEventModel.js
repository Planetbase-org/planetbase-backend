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
