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

const publicStories = mockStories.filter(story => story.isPublic !== false); // assume public unless false
const displayedStory = publicStories[0]; // only the first one

function Home() {
  return (
    <Container className="my-5">
      <h1 className="text-center mb-4">Microfiction Library</h1>
      <Row>
        <Col md={6} className="mb-4">
          <StoryCard story={displayedStory} />
        </Col>
      </Row>
    </Container>
  );
}

export default Home;