const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const compression = require("compression");
const rateLimit = require("express-rate-limit");
const { body, check } = require("express-validator");
const cors = require("cors");

// Security
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // one minute
  max: 5 // 5 requests
});

// Middleware
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false })); // BodyParser will only support simple bodies
app.use(bodyParser.json());
app.use(cors());
app.use(compress());
app.use(helmet());
app.use(limiter);
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
