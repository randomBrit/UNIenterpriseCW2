import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button, Card, Container } from 'react-bootstrap';

export default function Dashboard() {
  const { currentUser } = useAuth();
  const [userStories, setUserStories] = useState([]);
  const [authorAverage, setAuthorAverage] = useState(null);

  useEffect(() => {
    const fetchUserStories = async () => {
      if (!currentUser?.uid) return;
      try {
        const res = await fetch(`/api/stories?authorId=${currentUser.uid}`);
        const data = await res.json();
        setUserStories(data);

        // Compute author average rating
        const ratedStories = data.filter(story => story.rating?.entries?.length > 0);
        if (ratedStories.length > 0) {
          const totalAvg = ratedStories.reduce((sum, story) => sum + story.rating.average, 0);
          setAuthorAverage((totalAvg / ratedStories.length).toFixed(1));
        } else {
          setAuthorAverage('No ratings yet');
        }
      } catch (err) {
        console.error('Failed to fetch stories:', err);
      }
    };

    fetchUserStories();
  }, [currentUser]);

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/stories/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setUserStories(prev => prev.filter(story => story.id !== id));
      } else {
        console.error("Delete failed:", await res.text());
      }
    } catch (err) {
      console.error("Error deleting story:", err);
    }
  };

  return (
    <Container className="my-4">
      <h2>Your Stories</h2>
      {authorAverage !== null && (
        <p><strong>Your Author Rating:</strong> {authorAverage}</p>
      )}
      {userStories.length === 0 ? (
        <p>You haven't submitted any stories yet.</p>
      ) : (
        userStories.map(story => (
          <Card key={story.id} className="mb-3">
            <Card.Body>
              <Card.Title>{story.title}</Card.Title>
              <Card.Text>{story.content}</Card.Text>
              <p>
                <strong>Average Rating:</strong> ⭐ {story.rating?.average ?? 'Not rated'}<br />
                <strong>Ratings Count:</strong> {story.rating?.entries?.length ?? 0}
              </p>
              <Button variant="outline-primary" size="sm" className="me-2">
                Edit
              </Button>
              <Button
                variant="outline-danger"
                size="sm"
                onClick={() => handleDelete(story.id)}
              >
                Delete
              </Button>
            </Card.Body>
          </Card>
        ))
      )}
    </Container>
  );
}