const { response } = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/users");
const { generateJWT } = require("../helpers/jwt");

const createUser = async (req, res = response) => {
  try {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).send({
        ok: false,
        msg: "User already exists",
      });
    }

    user = new User({ name, email, password });

    // Encrypt password
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    await user.save();

    // Generate JWT

    const token = await generateJWT(user.id, user.name);

    res.status(201).send({
      ok: true,
      uid: user.id,
      name: user.name,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      ok: false,
      msg: "Please contact the administrator",
    });
  }
};

const loginUser = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).send({
        ok: false,
        msg: "Credentials are incorrect",
      });
    }

    // Confirm passwords

    const validPassword = bcrypt.compareSync(password, user.password);

    if (!validPassword) {
      return res.status(400).send({
        ok: false,
        msg: "Credentials are incorrect",
      });
    }

    // Generate JWT
    const token = await generateJWT(user.id, user.name);

    res.status(200).send({
      ok: true,
      uid: user.id,
      name: user.name,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      ok: false,
      msg: "Please contact the administrator",
    });
  }
};

const renewToken = async (req, res = response) => {
  const { uid, name } = req;

  // Generate a new JWT and return it in the response

  const token = await generateJWT(uid, name);

  res.send({
    ok: true,
    uid,
    name,
    token,
  });
};

module.exports = {
  createUser,
  loginUser,
  renewToken,
};
