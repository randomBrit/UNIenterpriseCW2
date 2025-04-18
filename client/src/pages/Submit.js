import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';

function Submit() {
  const { currentUser } = useAuth();
  const [story, setStory] = useState({
    title: '',
    author: '',
    genre: '',
    content: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStory((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const submittedStory = {
      ...story,
      authorId: currentUser?.uid,
    };
  
    try {
      const res = await fetch('/api/stories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submittedStory),
      });
  
      const text = await res.text(); // get raw response first
      let data;
  
      try {
        data = JSON.parse(text); // attempt to parse manually
      } catch (jsonErr) {
        console.error('Invalid JSON response:', text);
        throw new Error('Server returned invalid JSON');
      }
  
      if (res.ok) {
        alert('Story submitted successfully!');
        console.log('New Story:', data.story);
        setStory({ title: '', author: '', genre: '', content: '' });
      } else {
        console.error('Backend error:', data.message || text);
        alert(`Submission failed: ${data.message || text}`);
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert('An unexpected error occurred.');
    }
  };

  return (
    <Container className="my-5">
      <h1 className="text-center mb-4">Submit a Microfiction Story</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={story.title}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formAuthor">
          <Form.Label>Author (Pseudonym)</Form.Label>
          <Form.Control
            type="text"
            name="author"
            value={story.author}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formGenre">
          <Form.Label>Genre</Form.Label>
          <Form.Control
            type="text"
            name="genre"
            value={story.genre}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formContent">
          <Form.Label>Content</Form.Label>
          <Form.Control
            as="textarea"
            name="content"
            value={story.content}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-3">
          Submit Story
        </Button>
      </Form>
    </Container>
  );
}

export default Submit;