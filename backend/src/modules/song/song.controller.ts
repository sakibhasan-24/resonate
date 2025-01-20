import { NextFunction, Request, Response } from "express";
import Song from "./song.model";

const getAllSongs = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const songs = await Song.find({});
    res.status(200).json({ songs, success: true });
  } catch (error) {
    next(error);
  }
};

const featuredSong = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const songs = await Song.aggregate([
      {
        $sample: {
          size: 6,
        },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          artist: 1,
          imageUrl: 1,
          duration: 1,
        },
      },
    ]);

    res.status(200).json({ songs, success: true });
  } catch (error) {
    next(error);
  }
};

const madeForYouSong = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const songs = await Song.aggregate([
      {
        $sample: {
          size: 4,
        },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          artist: 1,
          imageUrl: 1,
          duration: 1,
        },
      },
    ]);

    res.status(200).json({ songs, success: true });
  } catch (error) {
    next(error);
  }
};

const trendingSong = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const songs = await Song.aggregate([
      {
        $sample: {
          size: 6,
        },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          artist: 1,
          imageUrl: 1,
          duration: 1,
        },
      },
    ]);

    res.status(200).json({ songs, success: true });
  } catch (error) {
    next(error);
  }
};

export const songsController = {
  getAllSongs,
  featuredSong,
  madeForYouSong,
  trendingSong,
};
