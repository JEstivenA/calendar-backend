/*
    This file is used to create a route for the application.
    Routes of Users /Auth 
    host + /api/auth
*/

const express = require("express");
const { check } = require("express-validator");

const { validateFields } = require("../middlewares/field-validators");

const router = express.Router();
const { createUser, loginUser, renewToken } = require("../controllers/auth");

/**
 * @route   POST /api/auth/new
 * @desc    Create a new user in the database
 * @access  Public
 *
 */
router.post(
  "/new",
  [
    check("name", "The name is required").not().isEmpty(),
    check("email", "The email is required").isEmail(),
    check("password", "The password is required").isLength({ min: 6 }),
    validateFields,
  ],
  createUser
);

/**
 * @route   POST /api/auth/
 * @desc    Login a user
 * @access  Public
 *
 */
router.post(
  "/",
  [
    check("email", "The email is required").isEmail(),
    check("password", "The password is required").isLength({ min: 6 }),
    validateFields,
  ],
  loginUser
);

/**
 * @route  POST /api/auth/renew
 * @desc   Renew a token
 * @access Private
 *
 */
router.get("/renew", renewToken);

module.exports = router;
