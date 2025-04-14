import React, { useState } from 'react';
import { Card, Form, Button } from 'react-bootstrap';

function SearchPanel({ genres = [], onSearch }) {
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [minRating, setMinRating] = useState(0);

  const handleSearch = () => {
    onSearch({ genre: selectedGenre, minRating });
  };

  return (
    <Card className="p-3">
      <h5>Search Library</h5>
      <Form>
        <Form.Group className="mb-3">
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

        <Form.Group className="mb-3">
          <Form.Label>Minimum Rating</Form.Label>
          <Form.Range
            min={0}
            max={5}
            step={0.1}
            value={minRating}
            onChange={(e) => setMinRating(parseFloat(e.target.value))}
          />
          <div>{minRating.toFixed(1)}★</div>
        </Form.Group>

        <Button variant="primary" onClick={handleSearch}>
          Find Story
        </Button>
      </Form>
    </Card>
  );
}

export default SearchPanel;

