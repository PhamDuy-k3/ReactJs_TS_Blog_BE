import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors'; 
import { connectDB } from './config/database/mongodb';
import { router } from './routes';

const app = express();
const port = process.env.PORT || 5050;

connectDB();


app.use(cors()); 
app.use(express.json());

router(app);
app.use(express.static("storage/blog"));

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
