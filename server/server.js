const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connect
//mongoose.connect(process.env.MONGO_URI, {
//  useNewUrlParser: true,
//  useUnifiedTopology: true,
//}).then(() => console.log("Connected to MongoDB"))
//  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use('/api/stories', require('./routes/stories'));

app.get('/', (req, res) => res.send('API is running'));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});