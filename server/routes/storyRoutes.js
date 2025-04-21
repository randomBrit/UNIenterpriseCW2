// server/routes/storyRoutes.js
import express from 'express';
import fetch from 'node-fetch';
import db from '../firebaseadmin.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const { title, author, genre, content, authorId, isPublic = true } = req.body;
  const recaptchaToken = req.body['g-recaptcha-response'] || req.body.recaptchaToken;

  if (!title || !content) {
    return res.status(400).json({ message: 'Missing required fields.' });
  }

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

  try {
    const newStory = {
      title,
      author,
      genre,
      content,
      authorId: authorId || 'guest',
      isPublic,
      createdAt: new Date(),
      rating: { entries: [], average: 0.0 },
    };

    const docRef = await db.collection('stories').add(newStory);
    return res.status(201).json({ message: 'Story submitted!', id: docRef.id });
  } catch (err) {
    console.error('Error saving story:', err);
    return res.status(500).json({ message: 'Error saving story to Firestore.' });
  }
});

router.get('/', async (req, res) => {
  const { authorId } = req.query;

  try {
    let query = db.collection('stories');
    if (authorId) {
      query = query.where('authorId', '==', authorId);
    } else {
      query = query.where('isPublic', '==', true);
    }

    const snapshot = await query.get();
    const stories = snapshot.docs.map(doc => {
      const data = doc.data();
      //fallback structure in case rating is missing
      if (!data.rating || !Array.isArray(data.rating.entries)) {
        data.rating = { entries: [], average: 0.0 };
      }
      return { id: doc.id, ...data };
    });

    res.json(stories);
  } catch (err) {
    console.error('Error fetching stories:', err);
    res.status(500).json({ message: 'Failed to fetch stories' });
  }
});

router.post('/:id/rate', async (req, res) => {
  const { id } = req.params;
  const { rater, rating } = req.body;

  if (!rater || typeof rating !== 'number' || rating < 0 || rating > 5) {
    return res.status(400).json({ error: 'Invalid input' });
  }

  try {
    const storyRef = db.collection('stories').doc(id);
    const doc = await storyRef.get();

    if (!doc.exists) return res.status(404).json({ error: 'Story not found' });

    const story = doc.data();
    const entries = story.rating?.entries || [];

    const existing = entries.findIndex(entry => entry.rater === rater);
    if (existing !== -1) {
      entries[existing].rating = rating;
    } else {
      entries.push({ rater, rating });
    }

    const avg = entries.reduce((sum, e) => sum + e.rating, 0) / entries.length;
    const updatedRating = {
      entries,
      average: parseFloat(avg.toFixed(1)),
    };

    await storyRef.update({ rating: updatedRating });

    res.json({ rating: updatedRating });
  } catch (err) {
    console.error('Error rating story:', err);
    res.status(500).json({ error: 'Failed to update rating' });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const docRef = db.collection('stories').doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
      return res.status(404).json({ message: 'Story not found' });
    }

    await docRef.delete();
    res.json({ message: 'Story deleted successfully' });
  } catch (err) {
    console.error('Error deleting story:', err);
    res.status(500).json({ message: 'Failed to delete story' });
  }
});

router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, content, genre, isPublic } = req.body;

  try {
    const storyRef = db.collection('stories').doc(id);
    const doc = await storyRef.get();

    if (!doc.exists) {
      return res.status(404).json({ message: 'Story not found' });
    }

    const updates = {};
    if (title !== undefined) updates.title = title;
    if (content !== undefined) updates.content = content;
    if (genre !== undefined) updates.genre = genre;
    if (isPublic !== undefined) updates.isPublic = isPublic;

    await storyRef.update(updates);
    res.json({ message: 'Story updated successfully' });
  } catch (err) {
    console.error('Error updating story:', err);
    res.status(500).json({ message: 'Failed to update story' });
  }
});

export default router;