import express from "express";
import jwt from "jsonwebtoken";
import { Secret } from "jsonwebtoken";

const router = express.Router();

router.post("/", (req, res) => {
  const { username, password } = req.body;
  if (username === process.env.USERNAME && password === process.env.PASSWORD) {
    const token = jwt.sign({ username }, process.env.JWT_SECRET as Secret, {
      expiresIn: "1h",
    });
    res.json({ token });
  } else {
    res.sendStatus(400);
  }
});

export { router };
