"use strict";
// console.log("Hello(Hey Wait stil more work to go) world!");
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const user_routes_1 = require("./modules/users/user.routes");
// import { connectDb } from "./dbConnection/db";
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use("/api/v1/users", user_routes_1.userRoutes);
app.listen(port, () => {
    console.log(`Server running ons local port ${port}`);
    //   connectDb();
});
// // "dev": "ts-node src/index.ts",
