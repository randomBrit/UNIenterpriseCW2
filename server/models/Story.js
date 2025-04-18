const mongoose = require('mongoose');

const StorySchema = new mongoose.Schema({
  title: String,
  author: String,
  genre: String,
  content: String,
  rating: { type: Number, default: 0 },
  isPublic: { type: Boolean, default: true },
  authorId: String, // Firebase UID
}, { timestamps: true });

export default Story;