import React, { useEffect, useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';

function Submit() {
  const { currentUser } = useAuth();
  const [story, setStory] = useState({
    title: '',
    author: '',
    genre: '',
    content: '',
    isPublic: true,
  });

  useEffect(() => {
    // Wait for reCAPTCHA script to load and render widget
    const interval = setInterval(() => {
      if (window.grecaptcha && window.grecaptcha.render) {
        window.grecaptcha.render('recaptcha-container', {
          sitekey: '6LcmrR4rAAAAAMxswwJslCbob4m8qqOPHdPGo7vJ',
        });
        clearInterval(interval);
      }
    }, 500);
    return () => clearInterval(interval); // cleanup
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStory((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const recaptchaToken = window.grecaptcha?.getResponse();
    if (!recaptchaToken) {
      alert('Please complete the CAPTCHA.');
      return;
    }

    const submittedStory = {
      ...story,
      authorId: currentUser?.uid,
      'g-recaptcha-response': recaptchaToken,
    };

    try {
      const res = await fetch('/api/stories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submittedStory),
      });

      const text = await res.text();
      let data;

      try {
        data = JSON.parse(text);
      } catch (jsonErr) {
        console.error('Invalid JSON response:', text);
        throw new Error('Server returned invalid JSON');
      }

      if (res.ok) {
        alert('Story submitted successfully!');
        console.log('New Story:', data.story);
        setStory({ title: '', author: '', genre: '', content: '', isPublic: true });
        window.grecaptcha.reset(); // reset widget for future submissions
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
        <Form.Check 
          type="checkbox"
          label="Make this story public"
          checked={story.isPublic}
          onChange={(e) =>
            setStory(prev => ({ ...prev, isPublic: e.target.checked }))
          }
        />
        {/* reCAPTCHA goes here */}
        <div id="recaptcha-container" className="my-3"></div>
        <Button variant="primary" type="submit" className="mt-3">
          Submit Story
        </Button>
      </Form>
    </Container>
  );
}

export default Submit;