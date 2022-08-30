const express = require("express");
const {
  createEvent,
  getEvents,
  getOrganizerEvents,
  editEvent,
  deleteEvent,
  imageUpload,
} = require("../controllers/EventsController");
const { requireAuth } = require("../middleware/RequireAuth");
const { upload } = require("../helpers/FileHelper");
const eventsRouter = express.Router();

//GET all events
eventsRouter.get("/all-events", getEvents);
//Authorize user before creating events
eventsRouter.use(requireAuth);
//POST events
eventsRouter.post("/create-event", createEvent);
//GET organizer events
eventsRouter.get("/organizer-events", getOrganizerEvents);
//PUT edit an event
eventsRouter.put("/edit-event/:id", editEvent);
//DELETE delete an event
eventsRouter.delete("/delete-event/:id", deleteEvent);
//Test POST upload an image
eventsRouter.post("/upload-image", upload.single("eventImage"), imageUpload);

module.exports = eventsRouter;
