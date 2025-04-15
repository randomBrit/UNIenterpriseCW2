import React from "react";
import { Card, Button } from "react-bootstrap";

function StoryCard({ story }) {
  return (
    <Card>
      <Card.Body>
        <Card.Title>{story.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {story.genre} by {story.author}
        </Card.Subtitle>
        <Card.Text>{story.content}</Card.Text>
        <div>⭐ {story.rating} / 5</div>
        <Button variant="primary" className="mt-2">Rate Story</Button>
      </Card.Body>
    </Card>
  );
}

export default StoryCard;
