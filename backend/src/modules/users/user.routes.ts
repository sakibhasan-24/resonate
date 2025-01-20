import { Request, Response, Router } from "express";
import { userController } from "./user.constroller";
import { protectRoute } from "../../middleware/auth.middleware";

const router = Router();
router.get("/getAllUsers", protectRoute, userController.getAllUsers);
export const userRoutes = router;
