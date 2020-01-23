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

// Handle PATCH request to /places/{placeId}
router.patch("/:placeId", (req, res, next) => {
  res.status(200).json({
    message: "Handle PATCH request to /places/{placeId}"
  });
});

// Handle POST request to /places
router.post("/", (req, res, next) => {
  res.status(201).json({
    message: "Handle POST request to /places"
  });
});

// Handle DELETE request to /places/{placeId}
router.delete("/:placeId", (req, res, next) => {
  res.status(200).json({
    message: "Handle DELETE request to /places/{placeId}"
  });
});

module.exports = router;
