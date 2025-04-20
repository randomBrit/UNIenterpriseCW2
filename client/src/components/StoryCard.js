import React, { useState } from "react";
import { Card } from "react-bootstrap";
import { getOrCreateSessionId } from "../utils/session";
import { useAuth } from "../contexts/AuthContext";

function StoryCard({ story }) {

  console.log("story.rating on mount", story.rating);//added this as a debug, fixed the problem so it stays

  const [hoveredStar, setHoveredStar] = useState(0);
  const [selectedStar, setSelectedStar] = useState(null);
  const [localRatings, setLocalRatings] = useState(
    Array.isArray(story.rating?.entries) ? story.rating.entries : []
  );

  const { user } = useAuth();
  
  const averageRating =
    localRatings.length > 0
      ? (
          localRatings.reduce((sum, r) => sum + r.rating, 0) /
          localRatings.length
        ).toFixed(1)
      : "Not rated";

      const handleRate = async (rating) => {
        const raterId = user?.uid || getOrCreateSessionId();
        const newRating = { rater: raterId, rating };
      
        try {
          const res = await fetch(`/api/stories/${story.id}/rate`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newRating),
          });
      
          if (!res.ok) {
            const { error } = await res.json();
            throw new Error(error || "Failed to submit rating");
          }
      
          const updated = await res.json();
          setLocalRatings(updated.rating.entries);
          setSelectedStar(rating);
        } catch (err) {
          console.error("Error submitting rating:", err);
        }
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