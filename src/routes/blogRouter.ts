import express, { Application } from "express";
import { uploadImage } from "../multer/uploadImage";
import BlogController from "../controllers/blogController";

export const blogRouter = (app: Application): void => {
  const router = express.Router();
  const blogController = new BlogController();

  router.post("/", uploadImage.single("image"), (req, res) => blogController.createBlog(req, res));
  router.get("/", (req, res) => blogController.getAllBlogs(req, res));
  router.get("/:blogId", (req, res) => blogController.getBlogById(req, res));
  router.put('/:blogId/increment-views',(req, res) =>  blogController.incrementViews(req, res));
  app.use("/blogs", router);
};
