const mongodb = require("mongodb");

const MongoClient = mongodb.MongoClient;

let database;

async function initDatabase() {
  // "mongodb+srv://Prateek:<>@cluster0.143rbfs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  let mongodbUrl = "mongodb://127.0.0.1:27017";
  if (process.env.MONGODB_URL) {
    mongodbUrl = process.env.MONGODB_URL;
  }

  const client = await MongoClient.connect(mongodbUrl);
  database = client.db("deployment");
}

function getDb() {
  if (!database) {
    throw new Error("No database connected!");
  }

  return database;
}

module.exports = {
  initDatabase: initDatabase,
  getDb: getDb,
};
