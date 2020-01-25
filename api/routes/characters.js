const express = require("express");
const apiKeyValidation = require("../middleware/apiKeyValidation");
const charactersCardController = require("../controllers/card/characters");
const charactersInfoController = require("../controllers/info/characters");

const router = express.Router();

// Handle GET requests to /characters
router.get("/card", charactersCardController.characters_get_all_characters);

router.get(
  "/info",
  apiKeyValidation,
  charactersInfoController.characters_get_all_characters
);

// Handle GET requests to /characters/{characterId}
router.get(
  "/card/:characterId",
  charactersCardController.characters_get_character
);

router.get(
  "/info/:characterId",
  apiKeyValidation,
  charactersInfoController.characters_get_character
);

module.exports = router;
