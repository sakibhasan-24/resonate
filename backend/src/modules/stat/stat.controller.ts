import { NextFunction, Response } from "express";
import Song from "../song/song.model";
import User from "../users/user.model";
import Album from "../album/album.model";

const getAllStat = async (req: any, res: Response, next: NextFunction) => {
  try {
    const [totalSongs, totalUsers, totalAlbums, artist] = await Promise.all([
      Song.countDocuments(),
      User.countDocuments(),
      Album.countDocuments(),
      Song.aggregate([
        {
          $unionWith: {
            coll: "albums",
            pipeline: [],
          },
        },
        {
          $group: {
            _id: "$artist",
          },
        },
        {
          $count: "count",
        },
      ]),
    ]);
    res.status(200).json({
      totalSongs,
      totalUsers,
      totalAlbums,
      artist: artist[0]?.count || 0,
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

export const statController = {
  getAllStat,
};
