const EventsModel = require("../models/EventsModel");
const OrganizerModel = require("../models/OrganizerModel");
// const multer = require("multer");

// const storage = multer.diskStorage({
//   destination: (req, file, callback) => {
//     callback(null, "uploads");
//   },
//   filename: (req, file, callback) => {
//     console.log(file);
//     callback(null, file.originalname);
//   },
// });
// const upload = multer({ storage });

//Create an event for the organizer
exports.createEvent = async (req, res) => {
  //Get organizer id and assign to events
  const organizerId = req.organizer._id;
  const {
    eventTitle,
    eventType,
    eventOrganizer,
    eventTags,
    numberOfGuests,
    eventLocation,
    sponsorshipPackage,
    price,
    scheduledDate,
    eventImage,
  } = req.body;
  try {
    //Create an event
    const events = await EventsModel.create({
      organizerId,
      eventTitle,
      eventType,
      eventOrganizer,
      eventTags,
      numberOfGuests,
      eventLocation,
      sponsorshipPackage,
      price,
      scheduledDate,
      eventImage,
    });
    res.status(201).json({
      success: true,
      events,
    });
    console.log(req.file);
  } catch (error) {
    res.status(401).json({ error });
  }
};

//Get all events
exports.getEvents = async (req, res) => {
  const events = await EventsModel.find({}).sort({ createdAt: -1 });
  res.json({ events });
};

//Get organizers events
exports.getOrganizerEvents = async (req, res) => {
  const id = req.organizer._id;
  try {
    const events = await EventsModel.find({ organizerId: id }).sort({
      createdAt: -1,
    });
    res.status(201).json({ success: true, events });
  } catch (error) {
    res.status(401).json({ error });
  }
};

//Edit an event
exports.editEvent = async (req, res) => {
  const id = req.params.id;
  const {
    eventTitle,
    eventType,
    eventOrganizer,
    eventTags,
    numberOfGuests,
    eventLocation,
    sponsorshipPackage,
    price,
    scheduledDate,
    eventImage,
  } = req.body;
  try {
    await EventsModel.findByIdAndUpdate(
      { _id: id },
      {
        eventTitle,
        eventType,
        eventOrganizer,
        eventTags,
        numberOfGuests,
        eventLocation,
        sponsorshipPackage,
        price,
        scheduledDate,
        eventImage,
      }
    );
    res.status(201).json({
      success: true,
      message: "Event Edited successfully",
    });
  } catch (error) {
    res.status(401).json({ error });
  }
};

//Delete an event
exports.deleteEvent = async (req, res) => {
  const id = req.params.id;
  try {
    await EventsModel.findByIdAndDelete({ _id: id });
    res.status(201).json({
      success: true,
      message: `Event ${id} deleted successfully`,
    });
  } catch (error) {
    res.status(401).json({
      error,
    });
  }
};

//Upload an image
exports.imageUpload = async (req, res) => {
  try {
    const file = {
      filename: req.file.originalname,
      filepath: req.file.path,
      filetype: req.file.mimetype,
      filesize: fileSizeFormatter(req.file.size, 2),
    };
    console.log(file);
    res.status(201).json({ message: "File upload successfull" });
  } catch (error) {
    res.status(400).json({ error });
  }
};

const fileSizeFormatter = (bytes, decimal) => {
  if (bytes === 0) {
    return "0 Bytes";
  }
  const dm = decimal || 2;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PE", "EB"];
  const index = Math.floor(Math.log(bytes) / Math.log(1000));
  return (
    parseFloat((bytes / Math.pow(1000, index)).toFixed(dm)) + "-" + sizes[index]
  );
};
