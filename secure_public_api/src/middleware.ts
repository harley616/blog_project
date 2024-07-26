import express from "express";
import jwt from "jsonwebtoken";
import { Secret } from "jsonwebtoken";

export const authenticateJWT = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET as Secret);
      req.body.user = decoded;
    } catch (err) {
      console.log(err);
      return res.sendStatus(403);
    }
  } else {
    return res.sendStatus(403);
  }
  next();
};
