const express = require("express");

const router = express.Router();

// Handle GET request to /drugs
router.get("/", (req, res, next) => {
  res.status(200).json({
    message: "Handle GET request to /drugs"
  });
});

// Handle GET request to /drugs/{drugId}
router.get("/:drugId", (req, res, next) => {
  res.status(200).json({
    message: "Handle GET request to /drugs/{drugId}"
  });
});

// Handle GET request to /drugs/{drugId}/info
router.get("/:drugId/info", (req, res, next) => {
  res.status(200).json({
    message: "Handle GET request to /drugs/{drugId}/info"
  });
});

module.exports = router;
