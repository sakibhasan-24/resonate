import mongoose, { Model } from "mongoose";
import { TSong } from "./song.interface";

const songSchema = new mongoose.Schema<TSong>(
  {
    title: { type: String, required: true },
    artist: { type: String, required: true },
    imageUrl: { type: String, required: true },
    duration: { type: Number, required: true },
    audioUrl: { type: String, required: true },
    //   rating: { type: Number, required: true, min: 1, max: 5 },
    durations: { type: Number, required: true },
    albumID: { type: mongoose.Schema.Types.ObjectId, ref: "Album" },
  },
  {
    timestamps: true,
  }
);

const Song: Model<TSong> = mongoose.model<TSong>("Song", songSchema);

export default Song;
