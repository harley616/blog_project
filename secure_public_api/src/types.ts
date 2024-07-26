import { ObjectId } from "mongodb";

export type BlogPost = {
  _id: ObjectId;
  title: string;
  body: string;
  date: number;
};
