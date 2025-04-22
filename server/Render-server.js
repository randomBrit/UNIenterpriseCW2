import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import admin from 'firebase-admin';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// 🔐 Decode & write service account
if (process.env.FIREBASE_KEY_BASE64) {
  const decodedKey = Buffer.from(process.env.FIREBASE_KEY_BASE64, 'base64').toString('utf-8');
  const serviceAccountPath = path.resolve('./serviceAccountKey.json');
  fs.writeFileSync(serviceAccountPath, decodedKey);
  console.log('✅ Firebase key decoded and written to', serviceAccountPath);

  // 🔥 Initialize Firebase
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccountPath),
  });

  console.log('✅ Firebase Admin initialized');
} else {
  console.warn('⚠️ FIREBASE_KEY_BASE64 not set — Firebase may fail.');
}

// Middleware
app.use(cors());
app.use(express.json());

// Routes
import storyRoutes from './routes/storyRoutes.js';
app.use('/api/stories', storyRoutes);

app.get('/', (req, res) => res.send('API is running'));

// Serve React static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});