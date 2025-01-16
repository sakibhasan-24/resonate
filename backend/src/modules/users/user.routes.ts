import { Request, Response, Router } from "express";

const router = Router();
router.get("/", (req: Request, res: Response) => {
  res.send("Welcome to my USER API");
});

export const userRoutes = router;
