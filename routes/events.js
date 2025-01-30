/*
 * This file is responsible for handling the CRUD operations for events.
    
    Event Route /api/events  
 */

//Crud operations for events
const express = require("express");

const { check } = require("express-validator");

const {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} = require("../controllers/events");
const { validateJWT } = require("../middlewares/validate-jwt");
const { validateFields } = require("../middlewares/field-validators");
const { isDate } = require("../helpers/isDate");

const router = express.Router();

//Validate JWT
router.use(validateJWT);

//Get all events
router.get("/", getEvents);

//Create a new event
router.post(
  "/",
  [
    check("title", "The title is required").not().isEmpty(),
    check("start", "The start date is required").custom(isDate),
    check("end", "The end date is required").custom(isDate),
    validateFields,
  ],
  createEvent
);

//Update an event
router.put(
  "/:id",
  [
    check("title", "The title is required").not().isEmpty(),
    check("start", "The start date is required").custom(isDate),
    check("end", "The end date is required").custom(isDate),
    validateFields,
  ],
  updateEvent
);

//Delete an event
router.delete("/:id", deleteEvent);

module.exports = router;
