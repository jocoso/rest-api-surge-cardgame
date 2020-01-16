const Pool = require("pg").Pool;

const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: "surgeapi",
  password: process.env.PG_PWD,
  port: process.env.PG_PORT
});
