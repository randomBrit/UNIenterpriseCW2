import db from '../firebaseadmin.js';
import mockStories from '../mockData.js';

const seedStories = async () => {
  try {
    const batch = db.batch();

    mockStories.forEach((story) => {
      const ref = db.collection('stories').doc();
      batch.set(ref, {
        ...story,
        createdAt: new Date(),
        rating: story.rating || { entries: [], average: 0.0 },
        isPublic: story.isPublic ?? true,
      });
    });

    await batch.commit();
    console.log(`✅ Seeded ${mockStories.length} mock stories into Firestore.`);
    process.exit(0);
  } catch (err) {
    console.error('❌ Failed to seed mock data:', err);
    process.exit(1);
  }
};

seedStories();