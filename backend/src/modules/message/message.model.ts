import mongoose, { Schema } from "mongoose";
import { TMessage } from "./message.interface";

const messageSchema = new Schema<TMessage>(
  {
    senderID: {
      type: String,
      required: true,
    },
    receiverID: {
      type: String,
      required: true,
    },
    messageContent: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<TMessage>("Message", messageSchema);
