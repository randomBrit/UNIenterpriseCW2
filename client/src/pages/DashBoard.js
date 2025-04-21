import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button, Card, Container } from 'react-bootstrap';

export default function Dashboard() {
  const { currentUser } = useAuth();
  const [userStories, setUserStories] = useState([]);
  const [authorAverage, setAuthorAverage] = useState(null);
  const [editingStoryId, setEditingStoryId] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedContent, setEditedContent] = useState('');
  const [editedGenre, setEditedGenre] = useState('');

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

  const handleUpdate = async (id) => {
    try {
      const res = await fetch(`/api/stories/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: editedTitle,
          content: editedContent,
          genre: editedGenre,
        }),
      });
  
      if (!res.ok) {
        console.error('Failed to update story:', await res.text());
        return;
      }
  
      const updatedStories = userStories.map((story) =>
        story.id === id
          ? { ...story, title: editedTitle, content: editedContent, genre: editedGenre }
          : story
      );
  
      setUserStories(updatedStories);
      setEditingStoryId(null);
    } catch (err) {
      console.error('Error updating story:', err);
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
              {/* MAJOR REWORK ZONE######################################################*/}
              {editingStoryId === story.id ? (
  <form
    onSubmit={(e) => {
      e.preventDefault();
      handleUpdate(story.id);
    }}
  >
    <input
      type="text"
      className="form-control mb-2"
      value={editedTitle}
      onChange={(e) => setEditedTitle(e.target.value)}
      placeholder="Title"
    />
    <textarea
      className="form-control mb-2"
      value={editedContent}
      onChange={(e) => setEditedContent(e.target.value)}
      placeholder="Content"
    />
    <input
      type="text"
      className="form-control mb-2"
      value={editedGenre}
      onChange={(e) => setEditedGenre(e.target.value)}
      placeholder="Genre"
    />
    <Button type="submit" variant="success" size="sm" className="me-2">
      Save
    </Button>
    <Button
      variant="secondary"
      size="sm"
      onClick={() => setEditingStoryId(null)}
    >
      Cancel
    </Button>
  </form>
) : (
  <>
    <Card.Text>{story.content}</Card.Text>
    <Button
      variant="outline-primary"
      size="sm"
      className="me-2"
      onClick={() => {
        setEditingStoryId(story.id);
        setEditedTitle(story.title);
        setEditedContent(story.content);
        setEditedGenre(story.genre);
      }}
    >
      Edit
    </Button>
    <Button
      variant="outline-danger"
      size="sm"
      onClick={() => handleDelete(story.id)}
    >
      Delete
    </Button>
  </>
)}
{/* MAJOR REWORK ZONE*/}
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