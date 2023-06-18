import { MongoClient } from "mongodb";
import express from "express";
import cors from "cors";
const app = express();
app.use(cors());

async function getRegistrationRecord(req, res){
    const url = "mongodb://127.0.0.1:27017";
    const client = new MongoClient(url);

    const db = client.db("project");
    const table = db.collection("registration");

    let list = await table.find().toArray();
    await client.close();
    res.json(list);
}

app.get("/getRegistrationRecord", getRegistrationRecord);

app.listen(4000);