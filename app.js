const express = require('express');
const cors = require("cors");
const ExpressError = require("./expressError");
const morgan = require("morgan");
const userRoutes = require("./userRoutes");
const { authenticateJWT } = require("./middleware/middleware");

const app = express();

// Parse request bodies for JSON
app.use(cors());
app.use(express.json());
app.use(express.urlencoded( {extended: true} ));
app.use(morgan("dev"));


app.use( authenticateJWT );
app.use("/users", userRoutes);
app.get("/favicon.ico",(req, res)=> res.sendStatus(204));



// 404 error
app.use((request, response, next) => {
  const error = new ExpressError("Page Not Found", 404);
  next(error);
});

// error handler
app.use((error, request, response, next) => {
  const status = error.status || 500;
  const message = error.message;

  return response.status(error.status).json({
    error: {message, status}
  });
});

module.exports = app;