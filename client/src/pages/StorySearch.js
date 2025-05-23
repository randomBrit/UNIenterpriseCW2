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

        const params = new URLSearchParams(window.location.search);
        const genre = params.get("genre") || "All";
        const minimum_rating = parseFloat(params.get("minimum_rating")) || 0;
        const sortBy = params.get("sortBy") || "story";

        const filtered = filterAndSortStories(data, genre, minimum_rating, sortBy);
        setResults(filtered);
      } catch (err) {
        console.error('Failed to fetch stories:', err);
      }
    };

    fetchStories();
  }, [window.location.search]);

  const genres = ["All", ...new Set(allStories.map(story => story.genre))];

  const filterAndSortStories = (stories, genre, minRating, sortBy) => {
    const safeMinRating = isNaN(minRating) ? 0 : minRating;

    let filtered = stories.filter(story => {
      const avgRating = story.rating?.average || 0;
      return (genre === "All" || story.genre === genre) && avgRating >= safeMinRating;
    });

    if (sortBy === "author") {
      const authorRatings = {};
      const authorCounts = {};

      stories.forEach(story => {
        const avg = story.rating?.average || 0;
        if (!authorRatings[story.authorId]) {
          authorRatings[story.authorId] = 0;
          authorCounts[story.authorId] = 0;
        }
        authorRatings[story.authorId] += avg;
        authorCounts[story.authorId] += 1;
      });

      const authorAverages = {};
      Object.keys(authorRatings).forEach(id => {
        authorAverages[id] = authorRatings[id] / authorCounts[id];
      });

      filtered.sort((a, b) => {
        const aAvg = authorAverages[a.authorId] || 0;
        const bAvg = authorAverages[b.authorId] || 0;
        return bAvg - aAvg;
      });
    } else {
      filtered.sort((a, b) => (b.rating?.average || 0) - (a.rating?.average || 0));
    }

    return filtered;
  };

  const handleSearch = (searchCriteria) => {
    const { genre, minimum_rating, sortBy } = searchCriteria;
    const filtered = filterAndSortStories(allStories, genre, minimum_rating, sortBy);
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