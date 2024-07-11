import mongoose, { Document, Schema } from "mongoose";

// Định nghĩa interface cho document Blog
interface IBlog extends Document {
  title: string;
  content: string;
  author: string;
  tags: string[];
  image: string;
  category: string;
  status: string;
  views: number;
  createdAt: Date;
  updatedAt: Date;
  comments: mongoose.Schema.Types.ObjectId[];
  approvalStatus: string; // Trạng thái phê duyệt
  approvedBy?: mongoose.Schema.Types.ObjectId; // Người phê duyệt
  approvedAt?: Date; // Thời gian phê duyệt
}

// Tạo schema Blog với các thuộc tính mới
const blogSchema: Schema<IBlog> = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    image: {
      type: String,
      get: function (image: string) {
        return "http://localhost:5050/" + image;
      },
    },
    category: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['draft', 'published', 'archived'],
      default: 'draft',
    },
    views: {
      type: Number,
      default: 0,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
    comments: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment'
    }],
    approvalStatus: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
    approvedBy: {
      type: String,
    },
    approvedAt: {
      type: Date,
    },
  },
  {
    toJSON: { getters: true },
  }
);

blogSchema.methods.getSummary = function () {
  return {
    title: this.title,
    author: this.author,
    createdAt: this.createdAt,
    category: this.category,
    status: this.status,
    views: this.views,
    comments: this.comments,
    approvalStatus: this.approvalStatus,
    approvedBy: this.approvedBy,
    approvedAt: this.approvedAt,
  };
};

const Blog = mongoose.model<IBlog>("Blog", blogSchema, "blogs");
export default Blog;
