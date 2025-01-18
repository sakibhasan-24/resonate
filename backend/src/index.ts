// console.log("Hello(Hey Wait stil more work to go) world!");

import express from "express";
import dotenv from "dotenv";
import { userRoutes } from "./modules/users/user.routes";
import { clerkMiddleware } from "@clerk/express";
import { connectDb } from "./dbConnection/db";
import fileUpload from "express-fileupload";
import path from "path";
import { adminRoute } from "./modules/admin/admin.routes";
dotenv.config();
const app = express();
app.use(express.json());

app.use(clerkMiddleware());

const __dirname = path.resolve();
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: path.join(__dirname, "temp"),
    createParentPath: true,
    limits: { fileSize: 50 * 1024 * 1024 },
  })
);
const port = process.env.PORT;

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/admin", adminRoute);
app.listen(port, () => {
  console.log(`Server running ons local port ${port}`);
  connectDb();
});

// // "dev": "ts-node src/index.ts",
