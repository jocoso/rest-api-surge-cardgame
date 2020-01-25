const express = require("express");
const apiKeyValidation = require("../middleware/apiKeyValidation");
const techsCardController = require("../controllers/card/techs");
const techsInfoController = require("../controllers/info/techs");

const router = express.Router();

// Handle GET requests to /characters
router.get("/card", techsCardController.techs_get_all_techs);

router.get("/info", apiKeyValidation, techsInfoController.techs_get_all_techs);

// Handle GET requests to /characters/{characterId}
router.get("/card/:techId", techsCardController.techs_get_tech);

router.get(
  "/info/:techId",
  apiKeyValidation,
  techsInfoController.techs_get_tech
);

module.exports = router;
