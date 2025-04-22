import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Log incoming requests
app.use((req, res, next) => {
  console.log(`🕵️ Incoming request: ${req.method} ${req.url}`);
  next();
});

// Load routes
try {
  const storyRoutes = await import('./routes/storyRoutes.js');
  app.use('/api/stories', storyRoutes.default);
  console.log('✅ Story routes loaded');
} catch (err) {
  console.error('❌ Failed to load story routes:', err);
}

// Base route
try {
  app.get('/', (req, res) => res.send('API is running'));
} catch (err) {
  console.error('❌ Error setting base route:', err);
}

// Static file serving
try {
  const buildPath = path.join(__dirname, '../client/build');
  console.log('🔍 React build path:', buildPath);
  console.log('📦 Build exists?', fs.existsSync(buildPath));

  if (process.env.NODE_ENV === 'production' && fs.existsSync(buildPath)) {
    app.use(express.static(buildPath));
    app.get(/^\/(?!api).*/, (req, res) => {
      res.sendFile(path.join(buildPath, 'index.html'));
    });
    console.log('✅ React frontend served statically');
  } else {
    console.warn('⚠️ Not serving React build - missing or not in production');
  }
} catch (err) {
  console.error('❌ Error serving static React files:', err);
}

console.log('Express version:', require('express/package.json').version);
console.log('path-to-regexp version:', require('path-to-regexp/package.json').version);

// Start server
try {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port${PORT}`);
  });
} catch (err) {
  console.error('❌ Error starting server:', err);
}