// console.log("Hello(Hey Wait stil more work to go) world!");

import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { userRoutes } from "./modules/users/user.routes";
import { clerkMiddleware } from "@clerk/express";
import { connectDb } from "./dbConnection/db";
import fileUpload from "express-fileupload";
import path from "path";
import { adminRoute } from "./modules/admin/admin.routes";
import { albumRoutes } from "./modules/album/album.routes";
import { authRoutes } from "./modules/auth/auth.routes";
dotenv.config();
const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());

app.use(clerkMiddleware());

// const __dirname = path.resolve();
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: path.join(__dirname, "temp"),
    createParentPath: true,
    limits: { fileSize: 50 * 1024 * 1024 },
  })
);
const port = process.env.PORT;
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/admin", adminRoute);
app.use("/api/v1/album", albumRoutes);
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (process.env.NODE_TYPE === "production") {
    res.status(500).send("Something went wrong, please try again later");
  }
  console.error(err.message);
  res.status(500).json({
    message: "Server Error",
    success: false,
    error: err.message,
  });
});
app.listen(port, () => {
  console.log(`Server running ons local port ${port}`);
  connectDb();
});

// // "dev": "ts-node src/index.ts",
