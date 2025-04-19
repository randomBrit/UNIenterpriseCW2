import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Alert } from 'react-bootstrap';
import StoryCard from '../components/StoryCard';
import SearchPanel from '../components/SearchPanel';
import { useNavigate, Link } from 'react-router-dom';

//ui response 

function Home({ user }) {
  const [displayedStory, setDisplayedStory] = useState(null); 
  const isLoggedIn = !!user;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const res = await fetch('/api/stories');
        const stories = await res.json();

        const visibleStories = isLoggedIn
          ? stories
          : stories.filter(story => story.isPublic);

        if (visibleStories.length > 0) {
          const index = Math.floor(Math.random() * visibleStories.length);
          setDisplayedStory(visibleStories[index]);
        }
      } catch (err) {
        console.error('Failed to fetch stories:', err);
      }
    };

    fetchStories();
  }, [isLoggedIn]);

  const handleSearch = (criteria) => {
    const params = new URLSearchParams({
      genre: criteria.genre,
      minimum_rating: criteria.minimum_rating,
    }).toString();
    navigate(`/browse?${params}`);
  };

  return (
    <Container className="my-5">
      <h1 className="text-center mb-4">Microfiction Library</h1>
      <Row>
        <Col md={8} className="mb-4">
          {displayedStory ? (
            <StoryCard story={displayedStory} />
          ) : (
            <p>Loading featured story...</p>
          )}
        </Col>
        <Col md={4}>
          <SearchPanel
            genres={['All', 'Fable', 'Spooky', 'Misc']}
            onSearch={handleSearch}
          />
          <Button variant="primary" className="mt-3 w-100" onClick={handleFakeSubmit}>
            Submit a Microfiction
          </Button>
          {showSubmitPrompt && (
          <Alert variant="info" className="mt-2">
              Ready to share your own story?{' '}
              <Link to="/submit" style={{ textDecoration: 'underline', fontWeight: 'bold' }}>
                Click here to post as a guest!
              </Link>
            </Alert>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default Home;