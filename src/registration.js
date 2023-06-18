import { MongoClient } from "mongodb";
import express from "express";
import cors from "cors";
const app = express();
app.use(cors());

async function userRegistrationInfo(req, res) {
  const url = "mongodb://127.0.0.1:27017";
  const client = new MongoClient(url);

  const db = client.db("project");
  const table = db.collection("registration");

  let input = {
    name: req.query.name || "none",
    phoneNumber: req.query.phoneNumber || "none",
    email: req.query.email || "none",
    vehicalNumber: req.query.vehicalNumber || "none",
    location: req.query.location || "none",
    issue: req.query.issue || "none",
    describedIssue: req.query.describedIssue || "none",
  };

  await table.insertOne(input);
  await client.close();

  res.json({ Registration: "Successful" });
}

//  http://localhost:4000/userRegistrationInfo
app.get("/userRegistrationInfo", userRegistrationInfo);

app.listen(4000);
