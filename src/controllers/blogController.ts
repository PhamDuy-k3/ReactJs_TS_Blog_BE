// BlogController.ts
import { Request, Response } from "express";
import Blog from "../models/blog.model"; 

export default class BlogController {
  // Hàm tạo blog mới
  async createBlog(req: Request, res: Response): Promise<void> {
    try {
      const data = req.body;
      const file = req.file;

      if (file) {
        data.image = file.filename; 
      }

      const blog = await Blog.create(data);

      res.json({
        data: blog,
        status_code: 200,
        errors: [],
      });
    } catch (error: any) {
      res.status(500).json({
        message: "Error creating blog",
        error: error.message,
      });
    }
  }

  // Hàm lấy danh sách tất cả các blog
  async getAllBlogs(req: Request, res: Response): Promise<void> {
    try {
      const { author, title, category } = req.query;
      const conditions: any = {}; 

      if (author) {
        conditions.author = author;
      }
      
      if (title) {
        conditions.title = new RegExp(`${title}`, "i");
      }
      if (category) {
        conditions.category = category
      }

      const blogs = await Blog.find(conditions).exec();
      res.json({
        data: blogs,
        status_code: 200,
        errors: [],
      });
    } catch (error: any) {
      res.status(500).json({
        message: "Error fetching blogs",
        error: error.message,
      });
    }
  }

  // Hàm lấy blog theo ID
  async getBlogById(req: Request, res: Response): Promise<void> {
    try {
      const { blogId } = req.params;
      const blog = await Blog.findById(blogId).exec();
     
      if (!blog) {
        res.status(404).json({
          message: "Blog not found",
          status_code: 404,
          errors: [],
        });
        return;
      }

      res.json({
        data: blog,
        status_code: 200,
        errors: [],
      });
    } catch (error: any) {
      res.status(500).json({
        message: "Error fetching blog",
        error: error.message,
      });
    }
  }

  // Hàm tăng số lượt xem
  async incrementViews(req: Request, res: Response): Promise<void> {
    try {
      const { blogId } = req.params;
      const blog = await Blog.findById(blogId).exec();

      if (!blog) {
        res.status(404).json({
          message: "Blog not found",
          status_code: 404,
          errors: [],
        });
        return;
      }

      blog.views += 1;
      await blog.save();

      res.json({
        message: "Views incremented successfully",
        status_code: 200,
      });
    } catch (error: any) {
      res.status(500).json({
        message: "Error incrementing views",
        error: error.message,
      });
    }
  }
}
