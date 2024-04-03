const express = require("express");
const { MongoClient } = require("mongodb");
const bodyparser = require("body-parser");
const cors=require('cors');
require("dotenv").config();

// Connection URL
const url = process.env.MONGO_URI;
const client = new MongoClient(url);
console.log(url);

// Database Name
const dbName = "passwordmanager";

const app = express();
const port = 3000;
app.use(bodyparser.json());
app.use(cors());
//get all the passwords
app.get("/", async (req, res) => {
  const db = client.db(dbName);
  const collection = db.collection("passwords");
  const findResult = await collection.find({}).toArray();
  res.json(findResult);
});

//save a password
app.post("/", async (req, res) => {
  const db = client.db(dbName);
  const password = req.body;
  const collection = db.collection("passwords");
  const findResult = await collection.insertOne(password);
  res.send({ success: true });
});

app.delete("/", async (req, res) => {
  const db = client.db(dbName);
  const password = req.body;
  const collection = db.collection("passwords");
  const findResult = await collection.deleteOne(password);
  res.send({ success: true ,result:findResult});
});

app.listen(port, async () => {
  await client.connect();
  console.log(`Running on port:${port}`);
  console.log("Connected successfully to server");
});
