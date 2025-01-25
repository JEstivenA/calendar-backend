const { response } = require("express");
const jwt = require("jsonwebtoken");

const validateJWT = (req, res = response, next) => {
  // get JWT from header
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).send({
      ok: false,
      msg: "There is no token in the request",
    });
  }

  try {
    const { uid, name } = jwt.verify(token, process.env.SECRET_JWT_SEED);
    req.uid = uid;
    req.name = name;
  } catch (error) {
    res.status(401).send({
      ok: false,
      msg: "Invalid token",
    });
  }

  next();
};

module.exports = {
  validateJWT,
};
