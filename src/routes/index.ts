import { Application } from "express";
import { blogRouter } from "./blogRouter";
import { commentRouter } from "./commentRouter";
import { shareRouter } from "./shareRouter";

export const router = (app:Application) => {
    blogRouter(app);
    commentRouter(app);
    shareRouter(app);
};
  