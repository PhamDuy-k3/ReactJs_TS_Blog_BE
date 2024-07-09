import mongoose, { Document, Schema } from "mongoose";

interface IComment extends Document {
  blogId: mongoose.Schema.Types.ObjectId;
  author: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

const commentSchema: Schema<IComment> = new Schema(
  {
    blogId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog',
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: { getters: true },
  }
);

commentSchema.methods.getSummary = function () {
  return {
    author: this.author,
    content: this.content,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
  };
};

const Comment = mongoose.model<IComment>("Comment", commentSchema, "comments");
export default Comment;
