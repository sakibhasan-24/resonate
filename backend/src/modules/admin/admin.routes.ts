import express, { Router } from "express";
import { protectRoute, verifyAdmin } from "../../middleware/auth.middleware";
import { adminController } from "./admin.controller";

const router = Router();

router.get("/check", protectRoute, verifyAdmin, adminController.check);
router.post(
  "/create-song",
  protectRoute,
  verifyAdmin,
  adminController.createSong
);

router.delete(
  "/song/:id",
  protectRoute,
  verifyAdmin,
  adminController.deleteSong
);

router.post(
  "/create-album",
  protectRoute,
  verifyAdmin,
  adminController.createAlbum
);
router.delete(
  "/album/:id",
  protectRoute,
  verifyAdmin,
  adminController.deleteAlbum
);

export const adminRoute = router;
