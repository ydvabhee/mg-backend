import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/database';
import winston from 'winston';
// Import routes
import {themeRouter} from './routes/theme.route';
import { contentRouter } from './routes/content.route';
import { gameRouter } from './routes/game.route';
import { getLogger } from './utills/logger';
import path from 'path';
const logger = getLogger()
dotenv.config();  


export const app = express();
const port = process.env.PORT || 5000;

const origin = process.env.ORIGIN || [];

app.use(cors({
  origin: origin
}))

// Serve static files from the React app build directory
app.use(express.static(path.join(__dirname, '..', '..', 'client', 'dist'))); // Correct path for React build
 
  

// implement winston logger for requests
app.use((req, res, next) => {
  logger.info(`Received request ${req.method} ${req.url} from ${req.ip}`);
  next();
});
 
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

export const server = app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api/v1/theme', themeRouter);
app.use('/api/v1/content', contentRouter);
app.use('/api/v1/game', gameRouter);