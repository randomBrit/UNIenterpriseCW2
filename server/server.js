const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

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