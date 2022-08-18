const mongoose = require("mongoose");
const EventSchema = new mongoose.Schema(
  {
    organizerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organizer",
    },
    events: [
      {
        eventTitle: {
          type: String,
          default: "",
        },
        eventType: {
          type: String,
          default: "",
        },
        eventOrganizer: {
          type: String,
          default: "",
        },
        eventTags: {
          type: Array,
          default: "",
        },
        numberOfGuests: {
          type: String,
          default: "",
        },
        eventLocation: {
          type: String,
          default: "",
        },
        sponsorshipPackage: {
          type: String,
          default: "",
        },
        scheduledDate: {
          type: String,
          default: "",
        },
      },
      { timestamps: true },
    ],
  },
  { timestamps: true }
);

const EventsModel = mongoose.model("Events", EventSchema);
module.exports = EventsModel;
