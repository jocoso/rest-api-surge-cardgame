const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false })); // BodyParser will only support simple bodies
app.use(bodyParser.json());
app.use((req, res, next) => {
  // TODO: Change "*" section to game webpage url after creation
  // TODO: Move middleware to its own folder
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, PATCH, DELETE");
    return res.status(200).json({});
  }
  next();
});

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

mongoose.connect(
  "mongodb+srv://jocoso:" +
    process.env.MONGO_ATLAS_PWD +
    "@surge-buvmk.mongodb.net/test?retryWrites=true&w=majority",
  { useMongoClient: true }
);

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
