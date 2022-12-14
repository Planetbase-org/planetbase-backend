const mongoose = require("mongoose");
const EventSchema = new mongoose.Schema(
  {
    organizerId: {
      type: String,
      requied: true,
    },
    eventTitle: {
      type: String,
      required: true,
    },
    eventType: {
      type: String,
      required: true,
    },
    eventOrganizer: {
      type: String,
      required: true,
    },
    eventTags: {
      type: Array,
    },
    numberOfGuests: {
      type: String,
    },
    eventLocation: {
      type: String,
      required: true,
    },
    sponsorshipPackage: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    eventDesc: {
      type: String,
    },
    scheduledDate: {
      type: String,
      required: true,
    },
    eventImage: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const EventsModel = mongoose.model("Events", EventSchema);
module.exports = EventsModel;
