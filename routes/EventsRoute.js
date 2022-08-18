const express = require("express");
const {
  createEvent,
  getEvents,
  getOrganizerEvents,
} = require("../controllers/EventsController");
const eventsRouter = express.Router();

//POST events
eventsRouter.post("/create-event/:id", createEvent);
//GET all events
eventsRouter.get("/allevents", getEvents);
//GET organizer events
eventsRouter.get("/organizer-events/:id", getOrganizerEvents);

module.exports = eventsRouter;
