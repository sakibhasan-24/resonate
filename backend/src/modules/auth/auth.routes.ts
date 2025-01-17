import express, { Router } from "express";
import { authController } from "./auth.controller";

const router = Router();

router.post("/signup", authController.systemSignUp);

export const authRoutes = router;
