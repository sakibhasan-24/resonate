import mongoose from "mongoose";

export interface TSong {
  title: string;
  artist: string;
  imageUrl: string;

  audioUrl: string;
  durations: number;
  albumID?: mongoose.Types.ObjectId | null;
}
