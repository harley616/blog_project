import express from "express";
import { authenticateJWT } from "./middleware";
import { getDb } from "./db";
import { BlogPost } from "./types";
import { ObjectId } from "mongodb";

const router = express.Router();

router.get("/", async (req, res) => {
  const db = await getDb();
  const collection = db.collection("blog_entries");
  const posts = await collection.find().toArray();
  return res.json(posts);
});

router.use(authenticateJWT); // Protect all routes below this line

router.post("/", async (req, res) => {
  const db = await getDb();
  const post: BlogPost = {
    _id: new ObjectId(),
    title: req.body.title,
    body: req.body.body,
    date: Date.now(),
  };

  const collection = db.collection("blog_entries");
  const result = await collection.insertOne(post);
  return res.json(result);
});

export { router };
