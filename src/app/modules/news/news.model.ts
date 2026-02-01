import { Schema, Types, model } from "mongoose";
import { TNews, TNewsTranslation } from "./news.interface";

const NewsTranslationSchema = new Schema<TNewsTranslation>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    tags: { type: [String], default: [] },
    category: { type: String, required: true },
  },
  { _id: false }
);

const NewsSchema = new Schema<TNews>(
  {
    imageUrl: { type: String, required: true },
    translations: {
      type: Map,
      of: NewsTranslationSchema,
      required: true,
    },
    likes: { type: Number, default: 0, required: false },
    likedBy: [{ type: Types.ObjectId, ref: "User" }],
    views: { type: Number, default: 0, required: false },
    viewedBy: [{ type: Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

const News = model<TNews>("News", NewsSchema);
export default News;
