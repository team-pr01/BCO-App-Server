import { Schema, model } from "mongoose";
import { TContent } from "./content.interface";

const ContentSchema = new Schema<TContent>(
  {
    videoUrl: {
      type: String,
      required: false,
      default: "",
    },
    imageUrl: {
      type: String,
      required: false,
      default: "",
    },
  },
  { timestamps: true }
);

const Content = model<TContent>("Content", ContentSchema);
export default Content;
