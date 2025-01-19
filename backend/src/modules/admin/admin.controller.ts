import { NextFunction, Request, Response } from "express";
import Song from "../song/song.model";
import Album from "../album/album.model";
import cloudinary from "../../cloudinary/cloudinary";

const uploadToCloud = async (file: any) => {
  try {
    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      resource_type: "auto",
    });
    return result.secure_url;
  } catch (error) {
    console.log(error, "from cloudinary");
    throw new Error("Failed to upload to cloudinary");
  }
};
const createSong = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    if (!req.files || !req.files.imageUrl || !req.files.audioFileUrl) {
      return res
        .status(400)
        .json({ message: "Image and audio file are required" });
    }

    const { title, artist, durations, albumID } = req.body;

    if (!title || !artist || !durations) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const audioFile = req.files.audioFile;
    const imageFile = req.files.imageFile;
    const audioUrl = await uploadToCloud(audioFile);
    const imageUrl = await uploadToCloud(imageFile);

    // Create new song document
    const newSong = new Song({
      title,
      artist,
      durations,
      albumID: albumID || null,
      audioUrl,
      imageUrl,
    });

    await newSong.save();

    // Update album if albumID is provided
    if (albumID) {
      await Album.findByIdAndUpdate(albumID, {
        $push: { songs: newSong._id },
      });
    }

    // Respond with success
    return res.status(201).json({
      message: "Song created successfully",
      song: newSong,
      success: true,
    });
  } catch (error: any) {
    // Handle errors
    console.error("Error creating song:", error);
    // return res.status(500).json({
    //   message: "An error occurred while creating the song",
    //   error: error.message,
    // });
    next(error);
  }
};

const deleteSong = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const song = await Song.findById(id);
    if (!song) {
      res.status(404).json({ message: "Song not found" });
    }

    //  song is stay in albumId
    if (song?.albumID) {
      await Album.findByIdAndUpdate(song?.albumID, {
        $pull: { songs: id },
      });
    }
    // Delete song
    await Song.findByIdAndDelete(id);
    res
      .status(200)
      .json({ message: "Song deleted successfully", success: true });
  } catch (error: any) {
    next(error);
  }
};

const createAlbum = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, artist, releaseYear } = req.body;
    const imageFile = req.files;
    const imageUrl = await uploadToCloud(imageFile);
    const newAlbum = new Album({ title, artist, releaseYear, imageUrl });
    await newAlbum.save();
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const deleteAlbum = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const album = await Album.findById(id);
    if (!album) {
      res.status(404).json({ message: "Album not found" });
    }
    await Song.deleteMany({ albumID: id });
    await Album.findByIdAndDelete(id);
  } catch (error) {
    next(error);
  }
};
export const adminController = {
  createSong,
  deleteSong,
  createAlbum,
  deleteAlbum,
};
