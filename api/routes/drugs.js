const express = require("express");
const apiKeyValidation = require("../middleware/apiKeyValidation");
const drugsCardController = require("../controllers/card/drugs");
const drugsInfoController = require("../controllers/info/drugs");

const router = express.Router();

// Handle GET requests to /characters
router.get("/card", drugsCardController.drugs_get_all_drugs);

router.get("/info", apiKeyValidation, drugsInfoController.drugs_get_all_drugs);

// Handle GET requests to /characters/{characterId}
router.get("/card/:drugId", drugsCardController.drugs_get_drug);

router.get(
  "/info/:drugId",
  apiKeyValidation,
  drugsInfoController.drugs_get_drug
);

module.exports = router;
