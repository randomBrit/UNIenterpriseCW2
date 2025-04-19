import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import StoryCard from "../components/StoryCard";
import SearchPanel from "../components/SearchPanel";
import { useAuth } from "../context/AuthContext";

function StorySearch() {
  const [results, setResults] = useState([]);
  const [allStories, setAllStories] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchStories = async () => {
      const isLoggedIn = !!user;
    
      const url = isLoggedIn
        ? '/api/stories'
        : '/api/stories?publicOnly=true';
    
      const res = await fetch(url);
      const data = await res.json();
      setResults(data);
      setAllStories(data);
    };

    fetchStories();
  }, []);

  const genres = ["All", ...new Set(allStories.map(story => story.genre))];

  const handleSearch = (searchCriteria) => {
    const minRating = parseFloat(searchCriteria.minimum_rating);
    const safeMinRating = isNaN(minRating) ? 0 : minRating;

    const filtered = allStories.filter(story => {
      return (
        (searchCriteria.genre === "All" || story.genre === searchCriteria.genre) &&
        story.rating >= safeMinRating
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