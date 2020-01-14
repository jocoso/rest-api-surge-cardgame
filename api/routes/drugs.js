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

// Handle PATCH request to /drugs/{drugId}
router.patch("/:drugId", (req, res, next) => {
  res.status(200).json({
    message: "Handle PATCH request to /drugs/{drugId}"
  });
});

// Handle POST request to /drugs
router.post("/", (req, res, next) => {
  res.status(201).json({
    message: "Handle POST request to /drugs"
  });
});

// Handle DELETE request to /drugs/{drugId}
router.delete("/:drugId", (req, res, next) => {
  res.status(200).json({
    message: "Handle DELETE request to /drugs/{drugId}"
  });
});

module.exports = router;
