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
    const findEvent = await Event.findById(id);

    if (!findEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    if (findEvent.user.toString() !== req.uid) {
      return res
        .status(401)
        .json({ message: "You don't have permission to edit this event" });
    }

    const newEvent = {
      ...req.body,
      user: req.uid,
    };

    const eventUpdated = await Event.findByIdAndUpdate(id, newEvent, {
      new: true,
    });

    res.status(200).json({ ok: true, message: "updateEvent", eventUpdated });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteEvent = async (req, res = response) => {
  const { id } = req.params;

  try {
    const findEvent = await Event.findById(id);

    if (!findEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    if (findEvent.user.toString() !== req.uid) {
      return res
        .status(401)
        .json({ message: "You don't have permission to delete this event" });
    }

    await Event.findByIdAndDelete(id);

    res.status(200).json({ ok: true });
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
