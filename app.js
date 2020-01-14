const express = require("express");
const app = express();

// Card Routes
const charactersRoutes = require("./api/routes/characters");
const techsRoutes = require("./api/routes/techs");
const placesRoutes = require("./api/routes/places");
const drugsRoutes = require("./api/routes/drugs");
const chancesRoutes = require("./api/routes/chances");

app.use("/characters", charactersRoutes);
app.use("/techs", techsRoutes);
app.use("/places", placesRoutes);
app.use("/drugs", drugsRoutes);
app.use("/chances", chancesRoutes);

module.exports = app;
