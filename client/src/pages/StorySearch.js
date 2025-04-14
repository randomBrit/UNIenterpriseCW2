import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import StoryCard from "../components/StoryCard";
import SearchPanel from "../components/SearchPanel";

const mockStories = [
  {
    title: "The Last Leaf",
    author: "Anonymous",
    genre: "Fable",
    content: "In a town painted grey by winter, one final leaf clung to the branch...",
    rating: 4.5
  },
  {
    title: "Haunted Signal",
    author: "SpookySue",
    genre: "Spooky",
    content: "Every midnight, the old radio clicked on by itself...",
    rating: 3.8
  },
  {
    title: "Moral Machine",
    author: "TechieTom",
    genre: "Misc",
    content: "The AI paused. Who would it choose to save?",
    rating: 4.2
  }
];

function StorySearch() {
  const [results, setResults] = useState(mockStories);



  const handleSearch = (searchCriteria) => {
    const minRating = parseFloat(searchCriteria.rating);
    const filtered = mockStories.filter(story => {
      return (
        (searchCriteria.genre === "All" || story.genre === searchCriteria.genre) &&
        story.rating >= minRating
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
            genres={["All", "Fable", "Spooky", "Misc"]}
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