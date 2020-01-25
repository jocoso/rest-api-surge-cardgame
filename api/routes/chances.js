const express = require("express");

const router = express.Router();

// Handle GET request to /chances
router.get("/", (req, res, next) => {
  res.status(200).json({
    message: "Handle GET request to /chances"
  });
});

// Handle GET request to /chances/{chanceId}
router.get("/:chanceId", (req, res, next) => {
  res.status(200).json({
    message: "Handle GET request to /chances/{chanceId}"
  });
});

// Handle GET request to /chances/{chanceId}/info
router.get("/:chanceId/info", (req, res, next) => {
  res.status(200).json({
    message: "Handle GET request to /chances/{chanceId}/info"
  });
});

module.exports = router;
