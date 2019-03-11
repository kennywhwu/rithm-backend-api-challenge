/** Database client for api-challenge. */

const { Client } = require("pg");
const DB_URI = "postgresql:///api_challenge";

const client = new Client({
  connectionString: DB_URI,
});

client.connect();

module.exports = client;
