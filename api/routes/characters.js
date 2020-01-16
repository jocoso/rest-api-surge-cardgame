const express = require("express");
const Character = require("../models/character");
const mongoose = require("mongoose");

const router = express.Router();

// Handle GET requests to /characters
router.get("/", (req, res, next) => {
  Character.find()
    .select("_id name imgUrl quote factionId story stats")
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        characters: docs.map(doc => {
          return {
            _id: doc._id,
            name: doc.name,
            weaponTypeId: doc.weaponTypeId,
            imgUrl: doc.imgUrl,
            quote: doc.quote,
            factionId: doc.factionId,
            story: doc.story,
            stats: doc.stats,
            request: {
              type: "GET",
              description: "More information about " + doc.name,
              url: "http://localhost:3000/characters/" + doc._id
            }
          };
        })
      };
      res.status(200).json(response);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

// Handle GET requests to /characters/{characterId}
router.get("/:characterId", (req, res, next) => {
  const id = req.params.characterId;
  Character.findById(id)
    .select("_id name weaponTypeId imgUrl quote factionId story stats")
    .exec()
    .then(doc => {
      // Check out for the possibility of an empty document
      if (doc) {
        console.log(doc);
        res.status(200).json(doc);
      } else {
        res
          .status(404)
          .json({ message: "No valid entry found for provided ID" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

// Handle POST request to /characters

/**
 * The creation of a new character will require the following information:
 * name: Name of the character being created (STRING) (Required)
 * weaponTypeId: Id of the weapon type being used (ID) (Ref: "Weapon") (Required)
 * imgUrl: Image displayable on the card (STRING)(Required)
 * quote: A small quote which will work of a description of the character personality (STRING) (Required)
 * factionId: The ID of the faction the character belongs to (ID) (Ref: "Faction") (Required)
 * story: A small story about how the character came to be (STRING) (Default: "")
 * stats: Card information and stats regarding the character (see below)
 */

/**
 * !To not forget:
 * Stats require the following items
 * swp: Attack points (NUMBER) (Required)
 * shp: Defense points (NUMBER) (Required)
 * effectName: Name of the effect the character possess (STRING) (default: "" | Will return "" if effectDesc is empty)
 * effectDesc: Description of the effect the character possess (STRING) (default: "" | Will return "" if effectName is empty)
 */
router.post("/", (req, res, next) => {
  const character = new Character({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    weaponTypeId: req.body.weaponTypeId,
    imgUrl: req.body.imgUrl,
    quote: req.body.quote,
    factionId: req.body.factionId,
    story: req.body.story,
    stats: req.body.stats
  });

  character
    .save()
    .then(result => {
      res.status(201).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

// Handle PATCH requests to /characters/{characterId}
router.patch("/:characterId", (req, res, next) => {
  const id = req.params.characterId;

  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }

  Character.update({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Product updated",

        request: {
          type: "GET",
          description: "More information about updated character",
          url: "http://localhost:3000/characters/" + id
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

// Handle DELETE requests to /characters/{characterId}
router.delete("/:characterId", (req, res, next) => {
  const id = req.params.characterId;
  Character.deleteOne({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Product deleted",
        request: {
          type: "POST",
          description: "You can also create a new character",
          url: "http://localhost:3000/characters",
          data: {
            name: "STRING (required)",
            weaponTypeId: "ID (ref: Weapon) (required)",
            imgUrl: "STRING (required)",
            quote: "STRING (required)",
            faction: "ID (ref: Faction) (required)",
            story: 'String (optional) (default: "")',
            stats: {
              swp: "NUMBER (required)",
              shp: "NUMBER (Required)",
              effectName: 'STRING (default: ""',
              effectDesc: 'STRING (default: ""'
            }
          }
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

module.exports = router;
