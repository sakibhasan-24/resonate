import mongoose from "mongoose";

export interface TSong {
  title: string;
  artist: string;
  imageUrl: string;
  duration: number;
  audioUrl: string;
  durations: number;
  albumID?: mongoose.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}
