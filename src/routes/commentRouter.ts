import express, { Application } from "express";
import CommentController from "../controllers/comment Controller";

export const commentRouter = (app: Application): void => {
  const router = express.Router();
  const commentController = new CommentController();

  router.post("/", (req, res) => commentController.createComment(req, res));
  router.get("/:blogId", (req, res) => commentController.getAllCommentByIdBlog(req, res));

  app.use("/comments", router);
};
