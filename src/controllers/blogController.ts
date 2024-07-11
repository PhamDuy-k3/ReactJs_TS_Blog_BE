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
      const { author, title, category ,approvalStatus} = req.query;
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
      if (approvalStatus) {
        conditions.approvalStatus = approvalStatus
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
  async blogApproval(req: Request, res: Response): Promise<void> {
    try {
      const { blogId } = req.params;
      const { approvalStatus, approvedBy, approvedAt } = req.body;
      if (!blogId) {
        res.status(400).json({
          message: "Blog ID is required",
          status_code: 400,
          errors: ["Blog ID is required"],
        });
        return;
      }
      
      const blog = await Blog.findById(blogId).exec();
      
      if (!blog) {
        res.status(404).json({
          message: "Blog not found",
          status_code: 404,
          errors: [],
        });
        return;
      }
      
      if (blog.approvalStatus === "approved") {
        res.status(400).json({
          message: "Blog is already approved",
          status_code: 400,
          errors: [],
        });
        return;
      }
      
      blog.approvalStatus = approvalStatus;
      blog.approvedBy = approvedBy;
      blog.approvedAt =approvedAt; 
      await blog.save();

      res.json({
        message: "Blog approved successfully",
        status_code: 200,
      });
      
    } catch (error: any) {
      res.status(500).json({
        message: "Error approving blog",
        error: error.message,
      });
    }
  }
  async delete(req: Request, res: Response): Promise<void> {
    try {
      const { blogId } = req.params;
      const result = await Blog.findByIdAndDelete(blogId);

      res.json({
        status_code: 200,
        data: result,
      });
    } catch (error:any) {
      res.status(500).json({
        message: "Error delete blog",
        error: error.message,
      });
    }
  }
  
  async updateBlog(req: Request, res: Response): Promise<void> {
    try {
      const data = req.body;
      console.log(data)
      const file = req.file;
      if (file) {
        data.image = file.filename;
      }
      
      const { blogId } = req.params;
     
      const blog = await Blog.findById(blogId);
      
      if (!blog) {
        throw new Error("blog ko tồn tại");
      }
      if (blog.title === data.title) {
        delete data.title;
      }
      const blogUpdate = await Blog.findByIdAndUpdate(
        blogId,
        data,
        {
          new: true,
        }
      );
      res.json({
        data: blogUpdate,
        status_code: 200,
      });
    } catch (error:any) {
      res.json({
        error: {
          message: error.message,
        },
      });
    }
  }
}
