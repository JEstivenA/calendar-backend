const { response } = require("express");

const createUser = async (req, res = response) => {
  const { name, email, password } = req.body;

  res.send({
    msg: "New User",
    name,
    email,
    password,
  });
};

const loginUser = async (req, res = response) => {
  const { email, password } = req.body;

  res.send({
    msg: "Login User",
    email,
    password,
  });
};

const renewToken = async (req, res = response) => {
  res.send("Hello World");
};

module.exports = {
  createUser,
  loginUser,
  renewToken,
};
