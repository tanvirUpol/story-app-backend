import express, { json } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import { notFound,errorHandler } from './middleware/errorMidleware.js';
import connectDB from './config/db.js';
const port = process.env.PORT || 5000;
import userRoutes from './routes/userRoutes.js';
import storyRoutes from './routes/storyRoutes.js';

connectDB()

const app = express();
app.use(json());
app.use(cors()); // Enable CORS for all routes
app.use(express.urlencoded({extended: true}));


app.use((req,res,next)=>{
  console.log(req.path,req.method);
  next()
})


// User routes
app.use(userRoutes);

// Story routes
app.use(storyRoutes);

app.use(notFound)
app.use(errorHandler)


// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
