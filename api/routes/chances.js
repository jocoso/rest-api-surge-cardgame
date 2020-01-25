const express = require("express");
const apiKeyValidation = require("../middleware/apiKeyValidation");
const chancesCardController = require("../controllers/card/chances");
const chancesInfoController = require("../controllers/info/chances");

const router = express.Router();

// Handle GET requests to /characters
router.get("/card", chancesCardController.chances_get_all_chances);

router.get(
  "/info",
  apiKeyValidation,
  chancesInfoController.chances_get_all_chances
);

// Handle GET requests to /characters/{characterId}
router.get("/card/:chanceId", chancesCardController.chances_get_chance);

router.get(
  "/info/:chanceId",
  apiKeyValidation,
  chancesInfoController.chances_get_chance
);

module.exports = router;
