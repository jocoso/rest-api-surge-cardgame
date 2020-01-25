const express = require("express");

const router = express.Router();

// Handle GET request to /places
router.get("/", (req, res, next) => {
  res.status(200).json({
    message: "Handle GET request to /places"
  });
});

// Handle GET request to /places/{placeId}
router.get("/:placeId", (req, res, next) => {
  res.status(200).json({
    message: "Handle GET request to /places/{placeId}"
  });
});

// Handle GET request to /places/{placeId}/info
router.get("/:placeId/info", (req, res, next) => {
  res.status(200).json({
    message: "Handle GET request to /places/{placeId}/info"
  });
});

module.exports = router;
