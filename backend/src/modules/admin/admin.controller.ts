import { Request, Response } from "express";
import Song from "../song/song.model";

const createSong = async (req: Request, res: Response) => {
  //must upload imageUrl and audioFileUrl
  if (!req.files || !req.files.imageUrl || !req.files.audioFileUrl) {
    return res
      .status(400)
      .json({ message: "Image and audio file are required" });
  }
  const { title, artist, durations, albumID } = req.body;
  const audioFile = req.files.audioFile;
  const imageFile = req.files.imageFile;
  const audioUrl = `dssdbdjb`;
  const imageUrl = `eheh`;

  const newSong = new Song({
    title,
    artist,
    durations,
    albumID: albumID || null,
    audioUrl,
    imageUrl,
  });
};
