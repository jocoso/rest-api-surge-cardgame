const express = require("express");

const router = express.Router();

// Handle GET requests to /characters
router.get("/", (req, res, next) => {
  res.status(200).json({
    message: "Handling GET requests to /characters"
  });
});

// Handle GET requests to /characters/{characterId}
router.get("/:characterId", (req, res, next) => {
  const id = req.params.characterId;

  if (id === "special") {
    res.status(200).json({
      message: "You have discovered the special ID",
      id: id
    });
  } else {
    res.status(200).json({
      message: "You passed an ID"
    });
  }
});

// Handle GET request to /characters/{characterId}/info
router.get("/:characterId/info", (req, res, next) => {
  res.status(200).json({
    message: "info will all be here"
  });
});

// Handle POST request to /characters

/**
 * The creation of a new character will require the following information:
 * name: Name of the character being created (Required)
 * imgUrl: Image displayable on the card (Required)
 * quote: A small quote which will work of a description of the character personality (Required)
 * factionId: The ID of the faction the character belongs to (Required)
 * story: A small story about how the character came to be (Default: "")
 * info: Card information and stats regarding the character (see CharacterInfo)
 */

/**
 * !To not forget:
 * The creation of new CharacterInfo will require to submit the following attributes:
 * swp: Attack points (Required)
 * shp: Defense points (Required)
 * effectName: Name of the effect the character possess (default: "" | Will return "" if effectDesc is empty)
 * effectDesc: Description of the effect the character possess (default: "" | Will return "" if effectName is empty)
 */
router.post("/", (req, res, next) => {
  const character = {
    name: req.body.name,
    imgUrl: req.body.imgUrl,
    quote: req.body.quote,
    factionId: req.body.factionId,
    story: req.body.story,
    info: req.body.info
  };
  res.status(201).json({
    message: "Handling POST requests to /characters",
    createdCharacter: character
  });
});

// Handle PATCH requests to /characters/{characterId}
router.patch("/:characterId", (req, res, next) => {
  res.status(200).json({
    message: "Updated Character!"
  });
});

// Handle DELETE requests to /characters/{characterId}
router.delete("/:characterId", (req, res, next) => {
  res.status(200).json({
    message: "Deleted Character!"
  });
});

module.exports = router;
