import { ObjectId, Types } from "mongoose";

export type TReels = {
  title: string;
  description: string;
  videoUrl: string;
  videoSource: string;
  category: string;
  tags: string[];
  createdBy: Types.ObjectId;
  likes?: number;
  likedBy?: ObjectId[];
  createdAt?: Date;
  updatedAt?: Date;
};
