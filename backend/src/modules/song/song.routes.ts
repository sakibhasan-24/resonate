import { Router } from "express";
import { protectRoute, verifyAdmin } from "../../middleware/auth.middleware";
import { songsController } from "./song.controller";

const router = Router();

router.get(
  "/getAllSongs",
  protectRoute,
  verifyAdmin,
  songsController.getAllSongs
);
router.get("/featured", songsController.featuredSong);
router.get("/made-for-you", songsController.madeForYouSong);
router.get("/trending", songsController.trendingSong);

export const songsRoutes = router;
