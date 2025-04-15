import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button, Card, Container } from 'react-bootstrap';

const mockStories = [
  { id: '1', title: 'First Story', content: 'Lorem ipsum...', authorId: '123' },
  { id: '2', title: 'Another Tale', content: 'Dolor sit amet...', authorId: '456' },
];

export default function Dashboard() {
  const { currentUser } = useAuth();

  const userStories = mockStories.filter(
    story => story.authorId === currentUser?.uid
  );

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
              <Button variant="outline-danger" size="sm">Delete</Button>
            </Card.Body>
          </Card>
        ))
      )}
    </Container>
  );
} 