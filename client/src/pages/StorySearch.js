import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import StoryCard from "../components/StoryCard";
import SearchPanel from "../components/SearchPanel";
import { useAuth } from "../contexts/AuthContext";
import { useLocation } from "react-router-dom";

function StorySearch() {
  const [results, setResults] = useState([]);
  const [allStories, setAllStories] = useState([]);
  const { user } = useAuth();
  const location = useLocation();

  
useEffect(() => {
  const fetchStories = async () => {
    const isLoggedIn = !!user;

    const url = isLoggedIn
      ? '/api/stories'
      : '/api/stories?publicOnly=true';

    const res = await fetch(url);
    const data = await res.json();
    setAllStories(data);

    // Run search logic here if there are URL params
    const params = new URLSearchParams(location.search);
    const genre = params.get("genre") || "All";
    const minimum_rating = parseFloat(params.get("minimum_rating")) || 0;

    const filtered = data.filter(story => {
      return (
        (genre === "All" || story.genre === genre) &&
        const storyRating = typeof story.rating === 'number'
          ? story.rating
          : story.rating?.average ?? 0;

        storyRating >= minimum_rating
      );
    });

    setResults(filtered);
  };

  fetchStories();
}, [user, location.search]);

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