const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");
const ExpressError = require("../expressError");


function authenticateJWT(request, response, next) {
  try {
    const payload = jwt.verify(request.headers.authorization, SECRET_KEY);
    request.user = payload;
    return next();
  } catch (error) {
    return next()
  };
};

function ensureLogin( request, response, next) {
  if ( !request.user ) {
    const error = new ExpressError("Unauthorized", 401);
    return next(error);
  } else {
    return next();
  };
}

module.exports = { authenticateJWT, ensureLogin };