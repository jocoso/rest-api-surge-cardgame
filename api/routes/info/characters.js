const express = require("express");
const apiKeyValidation = require("../../middleware/apiKeyValidation");
const charactersController = require("../../controllers/info/characters");

const router = express.Router();

// Handle GET requests to /characters
router.get(
  "/",
  apiKeyValidation,
  charactersController.characters_get_all_characters
);

// Handle GET requests to /characters/{characterId}
router.get(
  "/:characterId",
  apiKeyValidation,
  charactersController.characters_get_character
);

// Handle POST request to /characters
router.post(
  "/",
  apiKeyValidation,
  charactersController.characters_create_character
);

// Handle PATCH requests to /characters/{characterId}
router.patch(
  "/:characterId",
  apiKeyValidation,
  charactersController.characters_update_character
);

// Handle DELETE requests to /characters/{characterId}
router.delete(
  "/:characterId",
  apiKeyValidation,
  charactersController.characters_delete_character
);

module.exports = router;
