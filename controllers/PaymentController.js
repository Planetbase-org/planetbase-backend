const axios = require("axios");
const { v4: uuidv4 } = require("uuid");
const BidModel = require("../models/BidEventModel");

exports.createPayment = async (req, res) => {
  const id = req.params.id;
  const bid = await BidModel.findById({ _id: id });
  console.log(bid.bidAmount);
  const config = {
    headers: {
      Authorization: `Bearer ${process.env.FLW_SECRET_KEY}`,
    },
  };
  const body = {
    tx_ref: uuidv4(),
    amount: bid.bidAmount,
    currency: "NGN",
    redirect_url: "https://www.planetbase.io/success",
    customer: {
      email: bid.email,
      phonenumber: bid.phoneNumber,
      name: bid.bidFrom,
    },
  };
  const url = "https://api.flutterwave.com/v3/payments";
  try {
    axios
      .post(url, body, config)
      .then((response) => {
        const data = response.data;
        res.status(201).json({ data });
      })
      .catch((err) => {
        res.status(401).json({ err });
      });
  } catch (err) {
    res.status(401).json({ err });
  }
};
