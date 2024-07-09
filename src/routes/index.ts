import { Application } from "express";
import { blogRouter } from "./blogRouter";
import { commentRouter } from "./commentRouter";

export const router = (app:Application) => {
    blogRouter(app);
    commentRouter(app);
};
  