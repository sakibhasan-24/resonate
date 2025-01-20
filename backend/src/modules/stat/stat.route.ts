import { Router } from "express";
import { statController } from "./stat.controller";
import { protectRoute, verifyAdmin } from "../../middleware/auth.middleware";

const router = Router();
router.get("/stat", protectRoute, verifyAdmin, statController.getAllStat);
export const statRoute = router;
