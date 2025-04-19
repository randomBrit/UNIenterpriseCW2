import express from 'express';
const router = express.Router();


// TEMP in-memory store for now
const stories = [
  {
    "title": "Whispers in the Fog",
    "author": "Clara Wren",
    "genre": "Mystery",
    "content": "The fog rolled in thicker than ever, hiding more than just the streetlights.",
    "rating": 4.2
  },
  {
    "title": "Starlit Covenant",
    "author": "Jonas Kade",
    "genre": "Science Fiction",
    "content": "In the year 3120, humanity's final hope lay dormant beneath Europa’s icy crust.",
    "rating": 3.8
  },
  {
    "title": "Beneath Crimson Leaves",
    "author": "Evelyn Hart",
    "genre": "Romance",
    "content": "Autumn had always been her favorite, but this year, the leaves fell with a promise.",
    "rating": 4.6
  },
  {
    "title": "The Hollow Pact",
    "author": "D.M. Corvin",
    "genre": "Fantasy",
    "content": "He made the deal with blood, never expecting the shadows to whisper back.",
    "rating": 4.0
  },
  {
    "title": "Last Exit to Eden",
    "author": "Sierra Vale",
    "genre": "Dystopian",
    "content": "She wasn’t supposed to remember the before-times, but the dreams said otherwise.",
    "rating": 3.5
  }
];

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

export default router;