import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import StoryCard from '../components/StoryCard';
import SearchPanel from '../components/SearchPanel';

function Home() {
  const [displayedStory, setDisplayedStory] = useState(null); // <- step 1

  useEffect(() => {
    const fetchRandomStory = async () => {
      try {
        const res = await fetch('/api/stories');
        const stories = await res.json();

        const publicStories = stories.filter(s => s.isPublic !== false);
        const randomIndex = Math.floor(Math.random() * publicStories.length);
        setDisplayedStory(publicStories[randomIndex]); // <- step 3
      } catch (err) {
        console.error('Error fetching stories:', err);
      }
    };

    fetchRandomStory(); // <- step 2
  }, []); // empty array = only run once when component mounts

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