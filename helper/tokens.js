const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");

// Return signed JWT from user data

function createToken(user) {
  let payload = {
    username: user.username,
    firstName: user.first_name,
    lastName: user.last_name,
    email: user.email,
  };
  return jwt.sign(payload, SECRET_KEY);
};


module.exports = {createToken};