import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;


// Middleware
app.use(cors());
app.use(express.json());


// Routes
import storyRoutes from './routes/storyRoutes.js';
app.use('/api/stories', storyRoutes);

app.get('/', (req, res) => res.send('API is running'));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});