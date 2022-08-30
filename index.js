require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const router = require("./routes/AuthRoutes");
const eventsRouter = require("./routes/EventsRoute");
const companyRouter = require("./routes/CompanyAuthRoute");
const bidRouter = require("./routes/BidEventRoute");

//Middleware
app.use(cors());
app.use(express.json());

//Routes
app.use("/api/auth", router);
app.use("/api/events", eventsRouter);
app.use("/api/auth/company", companyRouter);
app.use("/api/bid-event", bidRouter);

mongoose
  .connect(
    "mongodb+srv://planetbase:Planetbase123@cluster0.532ph90.mongodb.net/planetbase?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    app.listen(process.env.PORT || 7000, () => {
      console.log(`Server connected at port ${process.env.PORT || 7000}`);
    });
  })
  .catch((err) => {
    console.error(err);
  });
