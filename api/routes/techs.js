const express = require("express");

const router = express.Router();

// Handle GET request to /tech
router.get("/", (req, res, next) => {
  res.status(200).json({
    message: "Handle GET request to /tech"
  });
});

// Handle GET request to /tech/{techId}
router.get("/:techId", (req, res, next) => {
  res.status(200).json({
    message: "Handle GET request to /tech/{techId}"
  });
});

// Handle GET request to /tech/{techId}/info
router.get("/:techId/info", (req, res, next) => {
  res.status(200).json({
    message: "Handle GET request to /tech/{techId}/info"
  });
});

module.exports = router;
