const express = require("express");
const { pool } = require("../../config");

const router = express.Router();

// Handle GET requests to /characters
router.get("/", (req, res, next) => {
  const command = [
    "SELECT ",
    "c.id, ",
    "c.name AS character_name, ",
    "w.type AS weapon_type, ",
    "f.name AS faction_name ",
    "FROM characters c, weapon_types w, factions f ",
    "WHERE c.weapon_type_id = w.id AND c.faction_id = f.id"
  ];

  pool.query(command.join(""), (err, results) => {
    if (err) return res.status(500).json({ error: err });

    if (results) {
      res.status(200).json({
        count: results.rows.length,
        characters: results.rows.map(query => {
          return {
            id: query.id,
            name: query.character_name,
            weaponType: query.weapon_type,
            faction: query.faction_name,
            request: {
              type: "GET",
              message: "Get more information about this character.",
              url:
                "https://node-rest-surge-cards.herokuapp.com/characters/" +
                query.id
            }
          };
        })
      });
    } else {
      res
        .status(500)
        .json({ message: "Results couldn't be processed as requested." });
    }
  });
});

// Handle GET requests to /characters/{characterId}
router.get("/:characterId", (req, res, next) => {
  const id = req.params.characterId;
  const q_text = [
    "SELECT ",
    "c.id, ",
    "c.name AS character_name, ",
    "c.weapon_type_id, ",
    "w.type AS weapon_type, ",
    "c.quote, ",
    "c.faction_id, ",
    "f.name AS faction_name, ",
    "c.story ",
    "FROM characters c, weapon_types w, factions f ",
    "WHERE c.id = $1 AND (c.weapon_type_id = w.id AND c.faction_id = f.id)"
  ];
  console.log(q_text.join(""));
  const query = {
    // give the query a unique name
    name: "fetch-character",
    text: q_text.join(""),
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

/**
 * name: String (req)
 * weaponTypeId: id (req)(ref: WeaponType)
 * img: BLOB (req)
 * quote: String (req)
 * factionID: id (req) (ref: Faction)
 * story: String (def: "")
 * stats: {
 *      swp: Number (req)
 *      shp: Number (req)
 *      effectName: String (def: "")
 *      effectDesc: String (def: "")
 * }
 */

// Handle POST request to /characters
router.post("/", (req, res, next) => {
  // Security Measure
  // TODO: Convert into middleware
  if (!req.header("apiKey") || req.header("apiKey") !== process.env.API_KEY) {
    return res.status(401).json({ status: "error", message: "Unauthorized." });
  }

  const { name, weaponType, quote, faction, story } = req.body;
  // ...
  // Heavy lifting
  const query = {
    text:
      "INSERT INTO characters( name, weaponType, quote, faction, story ) VALUES($1, $2, $3, $4, $5)",
    values: [name, weaponType, quote, faction, story]
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
