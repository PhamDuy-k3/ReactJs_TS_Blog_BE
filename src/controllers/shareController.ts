import SharePost from "../models/share.model";
import { Request, Response } from "express";

export default class ShareController {
    async create(req: Request, res: Response): Promise<void> {
      try {
        const data = req.body;
  
        const sharePost = await SharePost.create(data);
  
        res.json({
          data: sharePost,
          status_code: 200,
          errors: [],
        });
      } catch (error: any) {
        res.status(500).json({
          message: "Error creating sharePost",
          error: error.message,
        });
      }
    }
    async index(req: Request, res: Response):Promise<void> {
        try {
            const { userId } = req.params;
            const sharedPosts = await SharePost.find( ).populate('postId');
            res.json({
                data: sharedPosts,
                status_code: 200,
                errors: [],
            });
        } catch (error:any) {
            res.status(500).json({
                message: "Error fetching sharePosts",
                error: error.message,
              });
        }
        
    }
}  