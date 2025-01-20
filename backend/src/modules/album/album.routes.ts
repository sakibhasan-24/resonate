import express, { Router } from "express";
import { albumCntroller } from "./album.controller";

const router = Router();

router.get("/", albumCntroller.getAllAlbum);

router.get("/:albumId", albumCntroller.getAlbumById);

export const albumRoutes = router;
