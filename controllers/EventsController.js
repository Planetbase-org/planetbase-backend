const EventsModel = require("../models/EventsModel");
const OrganizerModel = require("../models/OrganizerModel");

//Create an event for the organizer
exports.createEvent = async (req, res) => {
  const id = req.params.id;
  const organizerId = await OrganizerModel.findOne({ _id: id });
  const {
    eventTitle,
    eventType,
    eventOrganizer,
    eventTags,
    numberOfGuests,
    eventLocation,
    sponsorshipPackage,
    scheduledDate,
  } = req.body;
  try {
    const events = await EventsModel.findOneAndUpdate(
      { organizerId },
      {
        $push: {
          events: {
            eventTitle,
            eventType,
            eventOrganizer,
            eventTags,
            numberOfGuests,
            eventLocation,
            sponsorshipPackage,
            scheduledDate,
          },
        },
      }
    );
    res.status(201).json({
      success: true,
      message: events,
    });
  } catch (err) {
    res.json({
      success: false,
      message: err,
    });
  }
};

//Get all events
exports.getEvents = async (req, res) => {
  const events = await EventsModel.find({}).sort({ createdAt: -1 });
  res.json({ events });
};

//Get organizers events
exports.getOrganizerEvents = async (req, res) => {
  const id = req.params.id;
  const organizerId = await OrganizerModel.findOne({ _id: id });
  // try {
  const events = await EventsModel.find({ organizerId });
  res.json({ events });
  // } catch (err) {
  //   res.json({ err });
  // }
};

//PUT update an event
// exports.updateEvent = async (req, res) => {
//   const id = req.params.id;
//   const eventsId = req.params.eventsId
//   const organizerId = await OrganizerModel.findByOne({ _id: id });
//   const {
//     eventTitle,
//     eventType,
//     eventOrganizer,
//     eventTags,
//     numberOfGuests,
//     eventLocation,
//     scheduledDate,
//   } = req.body;
//   try {
//     const events = await EventsModel.findOneAndUpdate(
//       { organizerId },
//       {
//         $set: {
//           events: {
//             eventTitle,
//             eventType,
//             eventOrganizer,
//             eventTags,
//             numberOfGuests,
//             eventLocation,
//             sponsorshipPackage,
//             scheduledDate,
//           },
//         }, { arrayFilters: [{ "outer._id": eventsId }] }
//       }
//     );
//   } catch (err) {}
// };
