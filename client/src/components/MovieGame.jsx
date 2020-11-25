import React from 'react';
import axios from 'axios';
import '../App.css';
import MovieCard from '../components/MovieCard';
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { movieList, rounds } from './Utilities';

function DataFetching() {
  const [posts, setPosts] = useState([]);
  const [currentRound, setCurrentRound] = useState(0);
  const [guess, setGuess] = useState('');
  const [hasGuessed, setHasGuessed] = useState(false);
  const [count, setCount] = useState(0);

  const [randomMovie, setRandomMovie] = useState(
    movieList[Math.floor(Math.random() * movieList.length)]
  );

  useEffect(() => {
    console.log();
    axios
      .get(`/ombd?search=${randomMovie}`)
      .then((res) => {
        console.log('object');
        console.log(res.data);
        setPosts(res.data);
      })

      .catch((err) => {
        console.log(err);
      });
  }, [randomMovie]);

  const handleChange = (event) => {
    setGuess(event.target.value);
  };

  const submitGuess = (event) => {
    event.preventDefault();
    const form = event.target;
    console.log(guess);
    console.log(posts.Title);
    form.reset();
    setHasGuessed(true);
    if (guess.toLowerCase() === posts.Title.toLowerCase()) {
      console.log('correct!');
      setCount(count + 1);
    }
  };

  //nextRound();
  //if (guess === posts.data.title) {
  // you win
  //} else {
  // you got it wrong
  //}
  //};

  const nextRound = () => {
    setHasGuessed(false);

    if (currentRound >= 8) {
      setCurrentRound(0);
      alert(`Your score was ${count}!\nPlay again?`);
      return;
    }
    setRandomMovie(movieList[Math.floor(Math.random() * movieList.length)]);
    setCurrentRound(currentRound + 1);
    //set game for next round
    //check if round limit reached
  };

  return (
    <div className="container">
      <h1>Round {currentRound + 1}</h1>
      <h2> KJT MOVIE SPREE </h2>
      <h1>Based on this plot, what could this movie be?</h1>
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
