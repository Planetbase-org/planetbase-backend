const express = require("express");
const { createBid, get_bids } = require("../controllers/BidController");
const bidRouter = express.Router();

//Create a bid
bidRouter.post("/create-bid/:id", createBid);
bidRouter.get("/get-bids/:id", get_bids);
module.exports = bidRouter;
