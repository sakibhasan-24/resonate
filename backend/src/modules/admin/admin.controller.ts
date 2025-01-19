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

export const adminController = {
  createSong,
};
