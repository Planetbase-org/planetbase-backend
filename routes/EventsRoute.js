const express = require("express");
const { createEvent, getEvents } = require("../controllers/EventsController");
const eventsRouter = express.Router();

//POST events
eventsRouter.post("/create-event/:id", createEvent);
//GET all events
eventsRouter.get("/allevents", getEvents);

module.exports = eventsRouter;
