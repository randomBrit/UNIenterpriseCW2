import React from 'react';

function RatingButton({ onClick }) {
  return (
    <button onClick={onClick} className="btn btn-primary mt-2">
      Rate Story
    </button>
  );
}

export default RatingButton;