import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import StoryCard from '../components/StoryCard';
import SearchPanel from '../components/SearchPanel';

function Home({ user }) {
  const [displayedStory, setDisplayedStory] = useState(null); 
  const isLoggedIn = !!user;

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
    alert("Search Request:\n" + JSON.stringify({ search: criteria }, null, 2));
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
        </Col>
      </Row>
    </Container>
  );
}

export default Home;