const { response } = require("express");
const Event = require("../models/events");

const getEvents = async (req, res = response) => {
  try {
    const events = await Event.find().populate("user", "name");

    res.status(200).json({ ok: true, events });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createEvent = async (req, res = response) => {
  const event = new Event(req.body);

  try {
    event.user = req.uid;

    const eventoGuardado = await event.save();

    res.status(200).json({ ok: true, eventoGuardado });
  } catch (error) {
    res.status(500).json({ message: "Comunicate whit TI. " });
  }
};

const updateEvent = async (req, res = response) => {
  const { id } = req.params;

  try {
    res.status(200).json({ id, message: "updateEvent" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteEvent = async (req, res = response) => {
  const { id } = req.params;

  try {
    res.status(200).json({ id, message: "deleteEvent" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
};
