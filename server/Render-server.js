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

// Routes
let storyRoutes;
try {
  storyRoutes = await import('./routes/storyRoutes.js');
  app.use('/api/stories', storyRoutes.default);
} catch (err) {
  console.error('❌ Failed to load story routes:', err);
}

// Base route
app.get('/', (req, res) => res.send('API is running'));

// Static file serving
const buildPath = path.join(__dirname, '../client/build');
console.log('🔍 React build path:', buildPath);
console.log('📦 Build exists?', fs.existsSync(buildPath));

if (process.env.NODE_ENV === 'production' && fs.existsSync(buildPath)) {
  app.use(express.static(buildPath));
  app.get('/*', (req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'));
  });
} else {
  console.warn('⚠️ No React build found or not in production');
}

// Log all registered routes
try {
  app._router.stack
    .filter(r => r.route)
    .forEach(r => {
      console.log('📍 Route:', r.route.path);
    });
} catch (err) {
  console.error('❌ Error listing routes:', err);
}

// Start the server
try {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
} catch (err) {
  console.error('❌ Error starting server:', err);
}