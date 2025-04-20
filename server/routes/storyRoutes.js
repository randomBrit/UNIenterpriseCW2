import express from 'express';
const router = express.Router();
import mockStories from '../mockData.js';


// TEMP in-memory store for now
const stories = mockStories
  

router.post('/', (req, res) => {
  const { title, author, genre, content, authorId, isPublic = true } = req.body;

  if (!title || !content || !authorId) {
    return res.status(400).json({ message: 'Missing required fields.' });
  }

  const newStory = {
    id: stories.length + 1 + '',
    title,
    author,
    genre,
    content,
    authorId,
    isPublic, 
    rating: 0.0,
  };

  console.log('New story received:', newStory);//test feature
  stories.push(newStory);

  res.status(201).json({ message: 'Story submitted!', story: newStory });
});

router.get('/', (req, res) => {
  const { authorId } = req.query;

  if (authorId) {
    const userStories = stories.filter(s => s.authorId === authorId);
    return res.json(userStories);
  }

  res.json(stories);
});

// DELETE story by ID
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const index = stories.findIndex(story => story.id === id);

  if (index === -1) {
    return res.status(404).json({ message: 'Story not found' });
  }

  const deleted = stories.splice(index, 1)[0];
  res.json({ message: 'Story deleted', story: deleted });
});

router.post('/:id/rate', (req, res) => {
  const { id } = req.params;
  const { rater, rating } = req.body;

  if (!rater || typeof rating !== "number" || rating < 0 || rating > 5) {
    return res.status(400).json({ error: "Invalid input" });
  }

  const story = stories.find((s) => s.id === id);
  if (!story) return res.status(404).json({ error: "Story not found" });

  // Initialize rating array if missing
  if (!story.rating || !Array.isArray(story.rating.entries)) {
    story.rating = { entries: [] };
  }

  const existingIndex = story.rating.entries.findIndex((entry) => entry.rater === rater);
  if (existingIndex >= 0) {
    story.rating.entries[existingIndex].rating = rating;
  } else {
    story.rating.entries.push({ rater, rating });
  }

  story.rating.entries.push({ rater, rating });

  const sum = story.rating.entries.reduce((acc, cur) => acc + cur.rating, 0);
  const average = sum / story.rating.entries.length;

  story.rating.average = parseFloat(average.toFixed(1));

  return res.json({ rating: story.rating });
});

export default router;