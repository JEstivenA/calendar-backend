/*
    This file is used to create a route for the application.
    Routes of Users /Auth 
    host + /api/auth
*/

const express = require("express");
const router = express.Router();
const { createUser, loginUser, renewToken } = require("../controllers/auth");

/**
 * @route   POST /api/auth/new
 * @desc    Create a new user in the database
 * @access  Public
 *
 */
router.post("/new", createUser);

/**
 * @route   POST /api/auth/
 * @desc    Login a user
 * @access  Public
 *
 */
router.post("/", loginUser);

/**
 * @route  POST /api/auth/renew
 * @desc   Renew a token
 * @access Private
 *
 */
router.get("/renew", renewToken);

module.exports = router;
