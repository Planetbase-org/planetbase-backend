const axios = require("axios");
const { v4: uuidv4 } = require("uuid");

exports.createPayment = async (req, res) => {
  const config = {
    headers: {
      Authorization: `Bearer ${process.env.FLW_SECRET_KEY}`,
    },
  };
  const body = {
    tx_ref: uuidv4(),
    amount: "200",
    currency: "NGN",
    redirect_url: "https://www.planetbase.io",
    customer: {
      email: "danieloloruntoba681@gmail.com",
      phonenumber: "09077234932",
      name: "Daniel Toba",
    },
  };
  const url = "https://api.flutterwave.com/v3/payments";
  try {
    const data = axios
      .post(url, body, config)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
    res.status(201).json({ data });
  } catch (err) {
    console.error(err);
    res.status(401).json({ err });
  }
};
