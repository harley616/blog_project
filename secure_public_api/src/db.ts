import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.URI;
const client = uri ? new MongoClient(uri) : null;

export const getDb = async () => {
  if (!client) {
    throw new Error("MongoDB client not connected");
  }
  return client.db("files");
};
