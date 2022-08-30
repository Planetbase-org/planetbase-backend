const BidModel = require("../models/BidEventModel");
const OrganizerModel = require("../models/OrganizerModel");

exports.createBid = async (req, res) => {
  const { bidFrom, email, bidDate, bidAmount, bidDesc } = req.body;
  const id = req.params.id;
  const organizerId = await OrganizerModel.findOne({ _id: id });
  try {
    const create_bid = await BidModel.create({
      bidFrom,
      bidTo: organizerId,
      email,
      bidDate,
      bidAmount,
      bidDesc,
    });
    res.status(201).json({
      success: true,
      create_bid,
    });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

exports.get_bids = async (req, res) => {
  const id = req.params.id;
  try {
    const bids = await BidModel.find({ bidTo: id });
    res.status(201).json({
      success: true,
      bids,
    });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};
