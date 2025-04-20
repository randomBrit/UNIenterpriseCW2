import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import StoryCard from "../components/StoryCard";
import SearchPanel from "../components/SearchPanel";

function StorySearch() {
  const [results, setResults] = useState([]);
  const [allStories, setAllStories] = useState([]);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const res = await fetch('/api/stories');
        const data = await res.json();
        setAllStories(data);
  
        // Apply filters from URL params
        const params = new URLSearchParams(window.location.search);
        const genre = params.get("genre") || "All";
        const minimum_rating = parseFloat(params.get("minimum_rating")) || 0;
  
        const filtered = data.filter(story => {
          const avgRating = story.rating?.average || 0;
          return (
            (genre === "All" || story.genre === genre) &&
            avgRating >= minimum_rating
          );
        });
  
        setResults(filtered);
      } catch (err) {
        console.error('Failed to fetch stories:', err);
      }
    };
  
    fetchStories();
  }, [window.location.search]);

  const genres = ["All", ...new Set(allStories.map(story => story.genre))];

  const handleSearch = (searchCriteria) => {
    const minRating = parseFloat(searchCriteria.minimum_rating);
    const safeMinRating = isNaN(minRating) ? 0 : minRating;

    const filtered = allStories.filter(story => {
      const avgRating = story.rating?.average || 0;
      return (
        (searchCriteria.genre === "All" || story.genre === searchCriteria.genre) &&
        avgRating >= safeMinRating
      );
    });

    setResults(filtered);
  };

  return (
    <Container className="my-5">
      <h1 className="text-center mb-4">Browse Microfiction</h1>
      <Row>
        <Col md={4}>
          <SearchPanel
            genres={genres}
            onSearch={handleSearch}
          />
        </Col>
        <Col md={8}>
          <Row>
            {results.map((story, index) => (
              <Col md={12} key={index} className="mb-4">
                <StoryCard story={story} />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default StorySearch;