const express = require("express");
const { pool } = require("../../config");

const router = express.Router();

// Handle GET requests to /characters
router.get("/", (req, res, next) => {
  pool.query("SELECT * FROM characters", (err, results) => {
    if (err) res.status(500).json({ error: err });
    res.status(200).json(results.rows);
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
router.post("/", (req, res, next) => {
  const { name } = req.body;

  pool.query("INSERT INTO characters(name) VALUES ($1)", [name]),
    err => {
      if (err) return res.status(500).json({ error: err });
    };

  res.status(201).json({ status: "Success", message: "Character added" });
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
