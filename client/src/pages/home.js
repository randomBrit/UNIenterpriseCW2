import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import StoryCard from '../components/StoryCard';

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
  }
];

function Home() {
  return (
    <Container className="my-5">
      <h1 className="text-center mb-4">Microfiction Library</h1>
      <Row>
        {mockStories.map((story, index) => (
          <Col md={6} key={index} className="mb-4">
            <StoryCard story={story} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Home;