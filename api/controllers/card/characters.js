const utilities = require("../../../utilities");
const { pool } = require("../../../config");

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
              card: {
                type: "GET",
                message: "Access general information of this card",
                url: process.env.API_DEV + "/characters/card/" + query.id
              },
              info: {
                type: "GET",
                message: "Access more detailed information of this card",
                url: process.env.API_DEV + "/characters/info/" + query.id
              }
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
  console.log("hi");
  const id = req.params.characterId;
  console.log(id);
  const q_text = [
    "SELECT ",
    "c.id, ",
    "c.name AS character_name, ",
    "c.img_url, ",
    "w.type AS weapon_type, ",
    "c.quote, ",
    "f.name AS faction_name, ",
    "f.thumbnail_url AS faction_thumbnail, ",
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
        faction: {
          name: query.faction_name,
          thumbnail: query.faction_thumbnail
        },
        stats: query.stats
      };
      res.status(200).json(responseQuery);
    } else {
      return res.status(404).json({ message: "Character not found" });
    }
  });
};
