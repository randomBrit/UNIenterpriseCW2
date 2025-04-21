import React, { useState } from 'react';
import { Form, Button, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';

function SearchPanel({ genres, onSearch }) {
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [minimumRating, setMinimumRating] = useState(0);
  const [sortBy, setSortBy] = useState('story'); // new

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({
      genre: selectedGenre,
      minimum_rating: minimumRating,
      sortBy,
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="genreSelect">
        <Form.Label>Genre</Form.Label>
        <Form.Select
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
        >
          {genres.map((genre, idx) => (
            <option key={idx} value={genre}>
              {genre}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3" controlId="ratingSelect">
        <Form.Label>Minimum Rating</Form.Label>
        <Form.Range
          min={0}
          max={5}
          step={0.5}
          value={minimumRating}
          onChange={(e) => setMinimumRating(parseFloat(e.target.value))}
        />
        <div>{minimumRating.toFixed(1)} / 5</div>
      </Form.Group>

      <Form.Group className="mb-3" controlId="sortByToggle">
        <Form.Label>Sort By</Form.Label>
        <div>
          <ToggleButtonGroup
            type="radio"
            name="sortBy"
            value={sortBy}
            onChange={setSortBy}
          >
            <ToggleButton id="sort-story" value="story" variant="outline-primary">
              Story Rating
            </ToggleButton>
            <ToggleButton id="sort-author" value="author" variant="outline-secondary">
              Author Rating
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
      </Form.Group>

      <Button variant="primary" type="submit" className="w-100">
        Find Story
      </Button>
    </Form>
  );
}

export default SearchPanel;