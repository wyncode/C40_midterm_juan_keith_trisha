import React from 'react';
import axios from 'axios';
import '../App.css';
import MovieCard from '../components/MovieCard';
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';

function DataFetching() {
  const [posts, setPosts] = useState([]);
  const [guess, setGuess] = useState('');
  const [hasGuessed, setHasGuessed] = useState(false);

  useEffect(() => {
    axios
      .get('/ombd')
      .then((res) => {
        console.log(res);
        setPosts(res.data);
      })

      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleChange = (event) => {
    setGuess(event.target.value);
  };

  const submitGuess = (event) => {
    event.preventDefault();
    console.log(guess);
    setHasGuessed(true);
  };

  const nextRound = () => {};

  return (
    <div className="container">
      <h1>Guess The Movie??</h1>
      <div className="card-container">
        <div key={posts.id}>
          <MovieCard posts={posts} show={hasGuessed} />
        </div>
      </div>
      <form onSubmit={submitGuess}>
        <input className="guess-bar" type="text" onChange={handleChange} />
        <Button variant="primary" className="button" type="submit">
          Guess
        </Button>{' '}
        {hasGuessed && (
          <Button variant="primary" className="button" onClick={nextRound}>
            Next Round
          </Button>
        )}
      </form>
    </div>
  );
}

export default DataFetching;
