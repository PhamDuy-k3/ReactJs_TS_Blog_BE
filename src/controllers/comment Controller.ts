import { Request, Response } from "express";
import Comment from "../models/comment.model";

export default class CommentController {
  // Method to create a new comment
  async createComment(req: Request, res: Response): Promise<void> {
    try {
      const data = req.body;

      const comment = await Comment.create(data);

      res.json({
        data: comment,
        status_code: 200,
        errors: [],
      });
    } catch (error: any) {
      res.status(500).json({
        message: "Error creating comment",
        error: error.message,
      });
    }
  }

  // Method to fetch comments by blogId
  async getAllCommentByIdBlog(req: Request, res: Response): Promise<void> {
    try {
      const { blogId } = req.params;
      const conditions: any = {};

      if (blogId) {
        conditions.blogId = blogId;
      }

      const comments = await Comment.find(conditions).exec();
      res.json({
        data: comments,
        status_code: 200,
        errors: [],
      });
    } catch (error: any) {
      res.status(500).json({
        message: "Error fetching comments",
        error: error.message,
      });
    }
  }
}
