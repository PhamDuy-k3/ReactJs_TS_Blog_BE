import mongoose, { Document, Schema } from 'mongoose';

interface ISharePost extends Document {
  nameUser: string;
  postId: mongoose.Schema.Types.ObjectId;
  sharedAt: Date;
  message: string;
}

const sharePostSchema: Schema<ISharePost> = new mongoose.Schema({
  nameUser: {
    type: String,
    required: true
  },
  postId: {
    type: Schema.Types.ObjectId,
    ref:'Blog',
    required: true
  },
  sharedAt: {
    type: Date,
    default: Date.now
  },
  message: {
    type: String,
    default: ''
  }
});

const SharePost = mongoose.model<ISharePost>('SharePost', sharePostSchema,"sharePosts");
export default SharePost;
