import mongoose from "mongoose";

export const connectDB = () => {
    mongoose.connect(
        'mongodb://127.0.0.1:27017/blog',{}
    ).then(
        () => {
            console.log('Mongodb connected');
        }
    )
}