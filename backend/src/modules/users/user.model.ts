import mongoose, { Model, Schema } from "mongoose";
import { TUser } from "./user.interface";

const UserSchema: Schema = new Schema<TUser>(
  {
    fullName: { type: String, required: true },
    imageUrl: { type: String, required: true },
    clerkID: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
  }
);

const User: Model<TUser> = mongoose.model<TUser>("User", UserSchema);

export default User;
