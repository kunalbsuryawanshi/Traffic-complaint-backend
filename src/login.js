import { MongoClient } from "mongodb";
import express from "express";
import cors from "cors";
const app = express();
app.use(cors());

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

//  http://localhost:4000/userLogin
app.get("/userLogin", userLogin);

app.listen(4000);
