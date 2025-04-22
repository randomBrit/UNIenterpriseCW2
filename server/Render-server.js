import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

//i had these for a reason right?
import mongoose from 'mongoose';
import fs from 'fs';
import admin from 'firebase-admin';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

//
app.use((req, res, next) => {
  console.log(`🕵️ Incoming request: ${req.method} ${req.url}`);
  next();
});

// Routes
import storyRoutes from './routes/storyRoutes.js';
app.use('/api/stories', storyRoutes);

app.get('/', (req, res) => res.send('API is running'));

// Serve React static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));

  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});