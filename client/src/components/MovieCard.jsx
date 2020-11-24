import React from 'react';
import Card from 'react-bootstrap/Card';

const MovieCard = ({ posts, show }) => {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body className="card-body">
        {show && (
          <Card.Img variant="top" src={posts.Poster} className="card-image" />
        )}
        <Card.Text>{posts.Plot}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default MovieCard;
