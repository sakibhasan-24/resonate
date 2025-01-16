// console.log("Hello(Hey Wait stil more work to go) world!");

import express from "express";
import dotenv from "dotenv";
import { userRoutes } from "./modules/users/user.routes";
import { connectDb } from "./dbConnection/db";
dotenv.config();
const app = express();
const port = process.env.PORT;

app.use("/api/v1/users", userRoutes);
app.listen(port, () => {
  console.log(`Server running ons local port ${port}`);
  connectDb();
});

// // "dev": "ts-node src/index.ts",
