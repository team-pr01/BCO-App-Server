import { ObjectId } from "mongoose";

export type TReels = {
  title: string;
  description: string;
  videoUrl: string;
  category: string;
  tags: string[];
  likes?: number;
  likedBy?: ObjectId[];
  createdAt?: Date;
  updatedAt?: Date;
};
