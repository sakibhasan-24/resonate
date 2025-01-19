import express, { Router } from "express";
import { protectRoute, verifyAdmin } from "../../middleware/auth.middleware";
import { adminController } from "./admin.controller";

const router = Router();

router.post(
  "/create-song",
  protectRoute,
  verifyAdmin,
  adminController.createSong
);

export const adminRoute = router;
