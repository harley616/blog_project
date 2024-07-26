import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";

import { router as postsRouter } from "./posts";
import { router as loginRouter } from "./login";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan("tiny"));
app.use(express.json());

app.use("/posts", postsRouter);
app.use("/login", loginRouter);

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
