const express = require('express');
const router = express.Router();
const Story = require('../models/Story');

// GET all public stories
router.get('/', async (req, res) => {
  const stories = await Story.find({ isPublic: true }).sort({ createdAt: -1 });
  res.json(stories);
});

// GET stories by authorId
router.get('/user/:authorId', async (req, res) => {
  const stories = await Story.find({ authorId: req.params.authorId });
  res.json(stories);
});

// POST new story
router.post('/', async (req, res) => {
  const newStory = new Story(req.body);
  await newStory.save();
  res.status(201).json(newStory);
});

// DELETE a story
router.delete('/:id', async (req, res) => {
  await Story.findByIdAndDelete(req.params.id);
  res.json({ message: "Story deleted" });
});

module.exports = router;