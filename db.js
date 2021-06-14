const { DB_URI } = require("./config")
const { Client } = require("pg");

let db = new Client({
  connectionString: DB_URI
});

db.connect();

module.exports = db;