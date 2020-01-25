const express = require("express");
const apiKeyValidation = require("../middleware/apiKeyValidation");
const placesCardController = require("../controllers/card/places");
const placesInfoController = require("../controllers/info/places");

const router = express.Router();

// Handle GET requests to /characters
router.get("/card", placesCardController.places_get_all_places);

router.get(
  "/info",
  apiKeyValidation,
  placesInfoController.places_get_all_places
);

// Handle GET requests to /characters/{characterId}
router.get("/card/:placesId", placesCardController.places_get_place);

router.get(
  "/info/:placesId",
  apiKeyValidation,
  placesInfoController.places_get_place
);

module.exports = router;
