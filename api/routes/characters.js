const express = require("express");
const Character = require("../models/character");
const mongoose = require("mongoose");

const router = express.Router();

// Handle GET requests to /characters
router.get("/", (req, res, next) => {
  Character.find()
    .exec()
    .then(docs => {
      console.log(docs);
      res.status(200).json(docs);
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
    .exec()
    .then(doc => {
      // Check for the possibility of an empty document
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
 * name: Name of the character being created (Required)
 * imgUrl: Image displayable on the card (Required)
 * quote: A small quote which will work of a description of the character personality (Required)
 * factionId: The ID of the faction the character belongs to (Required)
 * story: A small story about how the character came to be (Default: "")
 * info: Card information and stats regarding the character (see CharacterInfo)
 */

/**
 * !To not forget:
 * The creation of new CharacterInfo will require to submit the following attributes:
 * swp: Attack points (Required)
 * shp: Defense points (Required)
 * effectName: Name of the effect the character possess (default: "" | Will return "" if effectDesc is empty)
 * effectDesc: Description of the effect the character possess (default: "" | Will return "" if effectName is empty)
 */
router.post("/", (req, res, next) => {
  const character = new Character({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    imgUrl: req.body.imgUrl,
    quote: req.body.quote,
    factionId: req.body.factionId,
    story: req.body.story,
    infoId: "3"
  });

  character
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Handling POST requests to /characters",
        createdCharacter: result
      });
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
      console.log(result);
      res.status(200).json(result);
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
  Character.remove({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

module.exports = router;
