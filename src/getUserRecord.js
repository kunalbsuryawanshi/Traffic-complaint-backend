import { MongoClient } from "mongodb";
import express from "express";
import cors from "cors";
const app = express();
app.use(cors());

async function getUserRecord(req, res){
    const url = "mongodb://127.0.0.1:27017";
    const client = new MongoClient(url);

    const db = client.db("project");
    const table = db.collection("login");

    let list = await table.find().toArray();
    await client.close();
    res.json(list);
}

app.get("/getUserRecord", getUserRecord);

app.listen(4000);