import { NextFunction, Request, Response } from "express";
import Album from "./album.model";

const getAllAlbum = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const albums = await Album.find({});
    res.status(200).json({ success: true, albums });
  } catch (error) {
    next(error);
  }
};

const getAlbumById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const album = await Album.findById(req.params.id);
    if (!album) {
      res.status(404).json({ message: "Album not found" });
    }
    res.status(200).json({ success: true, album });
  } catch (error) {
    next(error);
  }
};

export const albumCntroller = {
  getAllAlbum,
  getAlbumById,
};
