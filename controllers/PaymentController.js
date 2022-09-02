const axios = require("axios");

exports.createPayment = async (req, res) => {
  const { email } = req.body;
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.SECRET_KEY}`,
    },
  };
  try {
    axios
      .post(
        "https://api.paystack.co/transaction/initialize",
        {
          email,
          amount: 200000,
        },
        config
      )
      .then((response) => {
        // console.log(response.data);
        const data = response.data;
        res.status(201).json({
          data,
        });
      })
      .catch((err) => {
        res.status(401).json({ err });
      });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};
