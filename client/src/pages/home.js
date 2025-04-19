import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import StoryCard from '../components/StoryCard';
import SearchPanel from '../components/SearchPanel';

function Home() {
  const [displayedStory, setDisplayedStory] = useState(null); 

  useEffect(() => {
    const getRandomPublicStory = (stories, isLoggedIn) => {
      const visible = isLoggedIn
        ? stories
        : stories.filter(story => story.isPublic);
    
      const index = Math.floor(Math.random() * visible.length);
      return visible[index];
    };

    getRandomPublicStory(); 
  }, []);

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