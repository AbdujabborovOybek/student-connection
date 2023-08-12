const { MongoClient, ServerApiVersion } = require("mongodb");
const username = process.env.USERNAME_MD;
const password = process.env.PASSWORD_MD;
const uri = `mongodb+srv://${username}:${password}@chat.6g2rjpt.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

(async () => {
  try {
    await client.connect();
    console.log("MongoDB connected");
  } catch (error) {
    console.log(error);
  }
})();

const db = client.db("chat");

module.exports = db;
