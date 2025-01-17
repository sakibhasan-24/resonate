import mongoose, { Schema } from "mongoose";
import { TAlbum } from "./album.interface";

const alblumSchema = new Schema<TAlbum>(
  {
    title: { type: String, required: true },
    artist: { type: String, required: true },
    imageUrl: {
      type: String,
      required: true,
    },
    releaseYear: {
      type: Number,
      required: true,
    },
    songs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Song",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<TAlbum>("Album", alblumSchema);
