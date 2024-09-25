import express, { Application } from "express";
import ShareController from "../controllers/shareController";

export const shareRouter = (app: Application): void => {
  const router = express.Router();
  const shareController = new ShareController();

  router.post("/", (req, res) => shareController.create(req, res));
  router.get("/", (req, res) => shareController.index(req, res));
  app.use("/shares", router);
};
