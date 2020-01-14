const express = require("express");
const app = express();
const morgan = require("morgan");

app.use(morgan("dev"));

// Card Routes
const charactersRoutes = require("./api/routes/characters");
const techsRoutes = require("./api/routes/techs");
const placesRoutes = require("./api/routes/places");
const drugsRoutes = require("./api/routes/drugs");
const chancesRoutes = require("./api/routes/chances");

// Request Routes
app.use("/characters", charactersRoutes);
app.use("/techs", techsRoutes);
app.use("/places", placesRoutes);
app.use("/drugs", drugsRoutes);
app.use("/chances", chancesRoutes);

// Error Handling
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;
