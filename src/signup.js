import { MongoClient } from "mongodb";
import express from "express";
import cors from "cors";
const app = express();
app.use(cors());

async function userSignupInfo(req, res) {
  try {
    const url = "mongodb://127.0.0.1:27017";
    const client = new MongoClient(url);

    const db = client.db("project");
    const table = db.collection("signup");

    let input = {
      username: req.query.username || "none",
      email: req.query.email || "none",
      createPassword: req.query.createPassword || "none",
      confirmPassword: req.query.confirmPassword || "none",
    };

    await table.insertOne(input);
    await client.close();

    res.json({ Signup: "Successful" });
  } catch (err) {
    res.status(500).send(err.message);
  }
}

async function userLogin(req, res) {
  try {
    const url = "mongodb://127.0.0.1:27017";
    const client = new MongoClient(url);

    const db = client.db("project");
    const table = db.collection("signup");

    let query = {
      username: req.query.username,
      email: req.query.email,
      createPassword: req.query.createPassword,
      confirmPassword: req.query.confirmPassword,
    };
    let userRef = await table.findOne(query);

    await client.close();

    if (userRef == null) {
      let errorMessage = `Invalid Username or Password !`;
      throw new Error(errorMessage);
    }

    res.json(userRef);
  } catch (err) { 
    res.status(500).send(err.message);
  }
}

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

async function getUserRecord(req, res){
  const url = "mongodb://127.0.0.1:27017";
  const client = new MongoClient(url);

  const db = client.db("project");
  const table = db.collection("signup");

  let list = await table.find().toArray();
  await client.close();
  res.json(list);
}

async function getRegistrationRecord(req, res){
  const url = "mongodb://127.0.0.1:27017";
  const client = new MongoClient(url);

  const db = client.db("project");
  const table = db.collection("registration");

  let list = await table.find().toArray();
  await client.close();
  res.json(list);
}

async function editRegistrationRecord(req, res){
  const url = "mongodb://127.0.0.1:27017";
  const client = new MongoClient(url);

  const db = client.db("project");
  const table = db.collection("registration");

  let list = await table.findOneAndUpdate();
  await client.close();
  res.json(list);
}

//  http://localhost:4000/getRegistrationRecord
app.get("/getRegistrationRecord", getRegistrationRecord);

//  http://localhost:4000/getUserRecord
app.get("/getUserRecord", getUserRecord);

//  http://localhost:4000/userRegistrationInfo
app.get("/userRegistrationInfo", userRegistrationInfo);

//  http://localhost:4000/userLogin
app.get("/userLogin", userLogin);


//  http://localhost:4000/userSignupInfo
app.get("/userSignupInfo", userSignupInfo);

app.listen(4000);
