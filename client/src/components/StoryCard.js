import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";

function StoryCard({ story }) {
  
  console.log("story.rating on mount", story.rating);

  const [hoveredStar, setHoveredStar] = useState(0);
  const [selectedStar, setSelectedStar] = useState(null);
  const [localRatings, setLocalRatings] = useState(
    Array.isArray(story.rating?.entries) ? story.rating.entries : []
  );
  
  const averageRating =
    localRatings.length > 0
      ? (
          localRatings.reduce((sum, r) => sum + r.rating, 0) /
          localRatings.length
        ).toFixed(1)
      : "Not rated";

  const handleRate = (rating) => {
    // Simulate rater ID
    const newRating = { rater: "guest_" + Date.now(), rating };
    const updatedRatings = [...localRatings, newRating];
    setLocalRatings(updatedRatings);
    setSelectedStar(rating);

    // Replace this with API POST call later
    console.log("Rated story:", story.title, "with", rating);
  };

  const renderStars = () => {
    const maxStars = 5;
    return [...Array(maxStars)].map((_, i) => {
      const starValue = i + 1;
      const isFilled =
        hoveredStar >= starValue || (!hoveredStar && selectedStar >= starValue);

      return (
        <span
          key={starValue}
          style={{
            cursor: "pointer",
            color: isFilled ? "gold" : "gray",
            fontSize: "1.5rem",
          }}
          onMouseEnter={() => setHoveredStar(starValue)}
          onMouseLeave={() => setHoveredStar(0)}
          onClick={() => handleRate(starValue)}
        >
          ★
        </span>
      );
    });
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>{story.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {story.genre} by {story.author}
        </Card.Subtitle>
        <Card.Text>{story.content}</Card.Text>

        <div className="mb-2">
          <strong>Average Rating:</strong> ⭐ {averageRating}
        </div>

        <div>
          <strong>Rate this story:</strong> {renderStars()}
        </div>
      </Card.Body>
    </Card>
  );
}

export default StoryCard;