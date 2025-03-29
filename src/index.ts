import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/database';

// Import routes
import {themeRouter} from './routes/theme.route';
import { contentRouter } from './routes/content.route';
dotenv.config();  


const app = express();
const port = 3000;

const mongoURI = process.env.MONGO_URI;

if (!mongoURI) {
  console.error('MONGO_URI is not defined in the environment variables');
  process.exit(1); // Exit if no MongoDB URI is provided
}

// Connect to MongoDB
connectDB(mongoURI);


app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api/v1/theme', themeRouter);
app.use('/api/v1/content', contentRouter);