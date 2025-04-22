import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
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
try {
  import('./routes/storyRoutes.js')
    .then(storyRoutes => {
      app.use('/api/stories', storyRoutes.default);
    })
    .catch(err => {
      console.error('❌ Failed to load story routes:', err);
    });
} catch (err) {
  console.error('❌ Error setting up routes:', err);
}

// Base route
try {
  app.get('/', (req, res) => res.send('API is running'));
} catch (err) {
  console.error('❌ Error setting root route:', err);
}

// Static file serving for production
if (process.env.NODE_ENV === 'production') {
  try {
    app.use(express.static(path.join(__dirname, '../client/build')));
    app.get('/*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
    });
  } catch (err) {
    console.error('❌ Error serving static React files:', err);
  }
}

// Log registered routes
try {
  app._router.stack
    .filter(r => r.route)
    .forEach(r => {
      console.log('📍 Route:', r.route.path);
    });
} catch (err) {
  console.error('❌ Error listing routes:', err);
}

// Start server
try {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
} catch (err) {
  console.error('❌ Error starting server:', err);
}