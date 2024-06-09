const mongodb = require("mongodb");

const MongoClient = mongodb.MongoClient;

let database;

async function connect() {
  const client = await MongoClient.connect("mongodb://127.0.0.1:27017");
  database = await client.db("online-shop");
}

function getDb() {
  if (!database) {
    throw new Error("Database could not be found");
  }

  return database;
}

module.exports = {
  connect,
  getDb,
};
