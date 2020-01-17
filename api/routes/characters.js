const express = require("express");
const { pool } = require("../../config");

const router = express.Router();

// Handle GET requests to /characters
router.get("/", (req, res, next) => {
  pool.query("SELECT * FROM characters", (err, results) => {
    if (err) res.status(500).json({ error: err });

    res.status(200).json({
      count: results.rows.length,
      characters: results.rows
    });
  });
});

// Handle GET requests to /characters/{characterId}
router.get("/:characterId", (req, res, next) => {
  const id = req.params.characterId;

  const query = {
    // give the query a unique name
    name: "fetch-character",
    text: "SELECT * FROM characters WHERE id = $1",
    values: [id]
  };

  pool.query(query, (err, response) => {
    if (err) return res.status(500).json({ error: err });

    // If character exists
    if (response.rowCount) {
      res.status(200).json(response.rows);
    } else {
      return res.status(404).json({ message: "Character not found" });
    }
  });
});

// Handle POST request to /characters
router.post("/", (req, res, next) => {
  // Security Measure
  // TODO: Convert into middleware
  if (!req.header("apiKey") || req.header("apiKey") !== process.env.API_KEY) {
    return res.status(401).json({ status: "error", message: "Unauthorized." });
  }

  const { name } = req.body;
  // ...
  // Heavy lifting
  const query = {
    text: "INSERT INTO characters(name) VALUES($1)",
    values: [name]
  };

  // promise
  pool
    .query(query)
    .then(response => {
      console.log(response.rows[0]);
      res.status(201).json({
        message: "Character created sucessfully",
        data: response.rows[0]
      });
    })
    .catch(err => {
      console.error(err.stack);
      res.status(500).json({
        error: err
      });
    });
});

// Handle PATCH requests to /characters/{characterId}
router.patch("/:characterId", (req, res, next) => {
  let query = "update characters set ";
  const values = [];
  const prop = req.body;

  for (let i = 0; i < prop.length; i++) {
    query += prop[i].propName + "=$" + (i + 1);

    query += i < prop.length - 1 ? "," : " ";

    values[i] = prop[i].value;
  }

  query += "where id=$" + (prop.length + 1);
  values[prop.length] = req.params.characterId;

  console.log(query);

  pool
    .query(query, values)
    .then(response => {
      res.status(200).json({ message: "Character updated sucessfully" });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

// Handle DELETE requests to /characters/{characterId}
router.delete("/:characterId", (req, res, next) => {
  const id = parseInt(req.params.characterId);

  pool
    .query("delete from characters where id = $1", [id])
    .then(result => {
      res.status(200).json({
        status: "success"
      });
    })
    .catch(function(err) {
      return res.status(500).json(err);
    });
});

module.exports = router;
