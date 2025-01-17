import { ObjectId } from "mongoose";

export interface TAlbum {
  title: string;
  artist: string;
  imageUrl: string;
  releaseYear: number;
  songs: ObjectId[]; // Array of ObjectId references to "Song"
  createdAt?: Date;
  updatedAt?: Date;
}
