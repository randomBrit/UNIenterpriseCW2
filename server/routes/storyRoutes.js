import express from 'express';
const router = express.Router();


// TEMP in-memory store for now
const stories = [];

router.post('/', (req, res) => {
  const { title, author, genre, content, authorId } = req.body;

  if (!title || !content || !authorId) {
    return res.status(400).json({ message: 'Missing required fields.' });
  }

  const newStory = {
    id: stories.length + 1 + '', // basic string ID
    title,
    author,
    genre,
    content,
    authorId
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

export default router;