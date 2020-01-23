const utilities = require("../../utilities");
const { pool } = require("../../config");

exports.characters_get_all_characters = (req, res, next) => {
  const command = [
    "SELECT ",
    "c.id, ",
    "c.name AS character_name, ",
    "w.type AS weapon_type, ",
    "f.name AS faction_name ",
    "FROM characters c, weapon_types w, factions f ",
    "WHERE c.weapon_type_id = w.id AND c.faction_id = f.id ",
    "ORDER BY c.id"
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
};

exports.characters_get_character = (req, res, next) => {
  const id = req.params.characterId;
  const q_text = [
    "SELECT ",
    "c.id, ",
    "c.name AS character_name, ",
    "c.img_url, ",
    "w.type AS weapon_type, ",
    "c.quote, ",
    "f.name AS faction_name, ",
    "c.story, ",
    "c.stats ",
    "FROM characters c, weapon_types w, factions f ",
    "WHERE c.id = $1 AND (c.weapon_type_id = w.id AND c.faction_id = f.id)"
  ];

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
      const query = response.rows[0];
      const responseQuery = {
        id: query.id,
        name: query.character_name,
        imgUrl: query.img_url,
        weaponType: query.weapon_type,
        quote: query.quote,
        factionName: query.faction_name,
        story: query.story,
        stats: query.stats,
        request: {
          type: "GET",
          message: "Get weapon id's and faction id's.",
          url:
            "https://node-rest-surge-cards.herokuapp.com/characters/" + query.id
        }
      };
      res.status(200).json(responseQuery);
    } else {
      return res.status(404).json({ message: "Character not found" });
    }
  });
};

/**
 * name: String (req)
 * weapon_type_id: id (req)(ref: WeaponType)
 * img_url: String (req)
 * quote: String (req)
 * faction_id: id (req) (ref: Faction)
 * story: String (def: "")
 * stats: {
 *      swp: Number (req)
 *      shp: Number (req)
 *      effectName: String (def: "")
 *      effectDesc: String (def: "")
 * }
 */

exports.characters_create_character = (req, res, next) => {
  // Security Measure
  const {
    name,
    weapon_type_id,
    img_url,
    quote,
    faction_id,
    story,
    stats
  } = req.body;

  // validating  stats
  let statsAreValid = utilities.verifyObjectValidity(stats, {
    swp: "number",
    shp: "number",
    effectDesc: "string",
    effectName: "string"
  });

  if (!statsAreValid) {
    return res.status(400).json({
      message: "The stats request was formatted incorrectly",
      help:
        "Format the stats in the following way {swp: NUMBER, shp: NUMBER, effectName: STRING, effectDesc: STRING}"
    });
  }
  // ...
  // Heavy lifting
  const query = {
    text:
      "INSERT INTO characters( name, weapon_type_id, img_url, quote, faction_id, story, stats ) VALUES($1, $2, $3, $4, $5, $6, $7)",
    values: [name, weapon_type_id, img_url, quote, faction_id, story, stats]
  };

  // promise
  pool
    .query(query)
    .then(response => {
      console.log(response);
      res.status(201).json({
        message: "Character created sucessfully",
        request: {
          type: "DELETE",
          message: "There is always the delete button",
          url: "https://node-rest-surge-cards.herokuapp.com/characters/{id}"
        }
      });
    })
    .catch(err => {
      console.error(err.stack);
      res.status(500).json({
        error: err
      });
    });
};

exports.characters_update_character = (req, res, next) => {
  let query = "update characters set ";
  const values = [];
  const prop = req.body;

  for (let i = 0; i < prop.length; i++) {
    if (prop[i].propName === "stats") {
      const stats = prop[i].value;
      // validating  stats
      let statsAreValid =
        Object.keys(stats).length === 4 &&
        "swp" in stats &&
        "shp" in stats &&
        "effectDesc" in stats &&
        "effectName" in stats;

      statsAreValid =
        statsAreValid &&
        typeof stats.swp === "number" &&
        typeof stats.shp === "number" &&
        typeof stats.effectDesc === "string" &&
        typeof stats.effectName === "string";

      if (!statsAreValid) {
        return res.status(400).json({
          message: "The stats request was formatted incorrectly",
          help:
            "Format the stats in the following way {swp: NUMBER, shp: NUMBER, effectName: STRING, effectDesc: STRING}"
        });
      }
    }

    query += prop[i].propName + "=$" + (i + 1);

    // if is not the last input put a comma after
    query += i < prop.length - 1 ? "," : " ";

    values[i] = prop[i].value;
  }

  query += "where id=$" + (prop.length + 1);
  values[prop.length] = req.params.characterId;

  pool
    .query(query, values)
    .then(response => {
      res.status(200).json({ message: "Character updated sucessfully" });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

exports.characters_delete_character = (req, res, next) => {
  const id = parseInt(req.params.characterId);

  pool
    .query("delete from characters where id = $1", [id])
    .then(result => {
      res.status(200).json({
        status: "Character was deleted.",
        request: {
          type: "POST",
          message: "You can also create a new character.",
          url: "https://node-rest-surge-cards.herokuapp.com/characters/",
          help: {
            name: "STRING (req)",
            weapon_type_id:
              "id (req)(ref: 'https://node-rest-surge-cards.herokuapp.com/info/characters/weaponType')",
            img_url: "STRING (req)",
            quote: "STRING (req)",
            faction_id:
              "id (req) (ref: 'https://node-rest-surge-cards.herokuapp.com/info/characters/factions')",
            story: 'STRING (def: "")',
            stats: {
              swp: "NUMBER (req)",
              shp: "NUMBER (req)",
              effectName: 'STRING (def: "")',
              effectDesc: 'STRING (def: "")'
            }
          }
        }
      });
    })
    .catch(function(err) {
      return res.status(500).json(err);
    });
};
