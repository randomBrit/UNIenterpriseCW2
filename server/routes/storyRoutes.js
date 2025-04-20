import express from 'express';
const router = express.Router();
import mockStories from '../mockData.js';

// TEMP in-memory store
const stories = mockStories;

// You'll need to use node-fetch with import syntax
import fetch from 'node-fetch';

router.post('/', async (req, res) => {
  const { title, author, genre, content, authorId, isPublic = true } = req.body;
  const recaptchaToken = req.body['g-recaptcha-response'] || req.body.recaptchaToken;

  // Basic validation
  if (!title || !content) {
    return res.status(400).json({ message: 'Missing required fields.' });
  }

  // Validate reCAPTCHA token
  if (!recaptchaToken) {
    return res.status(400).json({ message: 'No reCAPTCHA token provided.' });
  }

  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${recaptchaToken}`;

  try {
    const response = await fetch(verifyUrl, { method: 'POST' });
    const data = await response.json();

    if (!data.success) {
      return res.status(403).json({ message: 'reCAPTCHA verification failed.' });
    }
  } catch (err) {
    console.error('reCAPTCHA error:', err);
    return res.status(500).json({ message: 'Internal error during CAPTCHA check.' });
  }

  const newStory = {
    id: (stories.length + 1).toString(),
    title,
    author,
    genre,
    content,
    authorId: authorId || 'guest',
    isPublic,
    rating: { entries: [], average: 0.0 },
  };

  console.log('New story received:', newStory);
  stories.push(newStory);

  return res.status(201).json({ message: 'Story submitted!', story: newStory });
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

// Rating logic
router.post('/:id/rate', (req, res) => {
  const { id } = req.params;
  const { rater, rating } = req.body;

  if (!rater || typeof rating !== 'number' || rating < 0 || rating > 5) {
    return res.status(400).json({ error: 'Invalid input' });
  }

  const story = stories.find(s => s.id === id);
  if (!story) return res.status(404).json({ error: 'Story not found' });

  if (!story.rating || !Array.isArray(story.rating.entries)) {
    story.rating = { entries: [] };
  }

  const existingIndex = story.rating.entries.findIndex(entry => entry.rater === rater);
  if (existingIndex >= 0) {
    story.rating.entries[existingIndex].rating = rating;
  } else {
    story.rating.entries.push({ rater, rating });
  }

  const sum = story.rating.entries.reduce((acc, cur) => acc + cur.rating, 0);
  const average = sum / story.rating.entries.length;
  story.rating.average = parseFloat(average.toFixed(1));

  return res.json({ rating: story.rating });
});

export default router;