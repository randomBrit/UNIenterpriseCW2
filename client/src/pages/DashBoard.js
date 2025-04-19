import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button, Card, Container } from 'react-bootstrap';

export default function Dashboard() {
  const { currentUser } = useAuth();
  const [userStories, setUserStories] = useState([]);

  useEffect(() => {
    const fetchUserStories = async () => {
      if (!currentUser?.uid) return;
      try {
        const res = await fetch(`/api/stories?authorId=${currentUser.uid}`);
        const data = await res.json();
        setUserStories(data);
      } catch (err) {
        console.error('Failed to fetch stories:', err);
      }
    };

    fetchUserStories();
  }, [currentUser]);

  const handleDelete = async (id) => {
    try {
      await fetch(`/api/stories/${id}`, { method: 'DELETE' });
      setStories(prev => prev.filter(story => story.id !== id));
    } catch (err) {
      console.error('Failed to delete story:', err);
    }
  };

  return (
    <Container className="my-4">
      <h2>Your Stories</h2>
      {userStories.length === 0 ? (
        <p>You haven't submitted any stories yet.</p>
      ) : (
        userStories.map(story => (
          <Card key={story.id} className="mb-3">
            <Card.Body>
              <Card.Title>{story.title}</Card.Title>
              <Card.Text>{story.content}</Card.Text>
              <Button variant="outline-primary" size="sm" className="me-2">Edit</Button>
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