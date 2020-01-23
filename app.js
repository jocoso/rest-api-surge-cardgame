const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const compression = require("compression");
const rateLimit = require("express-rate-limit");
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
app.use(compression());
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
const charactersCardRoutes = require("./api/routes/card/characters");
const techsCardRoutes = require("./api/routes/card/techs");
const placesCardRoutes = require("./api/routes/card/places");
const drugsCardRoutes = require("./api/routes/card/drugs");
const chancesCardRoutes = require("./api/routes/card/chances");

// Request Routes
app.use("/card/characters", charactersCardRoutes);
app.use("/card/techs", techsCardRoutes);
app.use("/card/places", placesCardRoutes);
app.use("/card/drugs", drugsCardRoutes);
app.use("/card/chances", chancesCardRoutes);

// Info Routes
const charactersInfoRoutes = require("./api/routes/info/characters");
const techsInfoRoutes = require("./api/routes/info/techs");
const placesInfoRoutes = require("./api/routes/info/places");
const drugsInfoRoutes = require("./api/routes/info/drugs");
const chancesInfoRoutes = require("./api/routes/info/chances");

app.use("/info/characters", charactersInfoRoutes);
app.use("/info/techs", techsInfoRoutes);
app.use("/info/places", placesInfoRoutes);
app.use("/info/drugs", drugsInfoRoutes);
app.use("/info/chances", chancesInfoRoutes);

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
