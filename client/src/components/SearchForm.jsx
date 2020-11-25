import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form } from 'react-bootstrap';
import SearchCard from './SearchCard';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const SearchForm = (event) => {
  const [search, setSearch] = useState('');
  const [apiData, setApiData] = useState([]);

  const submitSearch = (event) => {
    event.preventDefault();
    setSearch(event.target.elements.searchbar.value);

    const fetchData = async () => {
      const result = await axios.get(`/ombd?search=${search}`);
      console.log(result.data);
      setApiData(result.data);
    };
    try {
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(`/ombd?search=${search}`);
      setApiData(result.data);
    };
    try {
      fetchData();
    } catch (error) {
      console.error(error);
    }
  }, [search]);

  return (
    <>
      <Form onSubmit={submitSearch}>
        <Form.Row>
          <Form.Control
            id="searchbar"
            size="lg"
            type="text"
            placeholder="SEARCH MOVIE"
            defaultValue={search}
          />
        </Form.Row>
        <Button variant="primary" className="button" type="submit">
          Guess
        </Button>{' '}
      </Form>

      {apiData &&
        apiData.map((movie) => {
          console.log(movie);
          return (
            <Card key={movie.id} style={{ width: 200, margin: 5 }}>
              {/* <a href={`/ombd/${movie.id}`}> */}
              <Card.Img
                variant="top"
                src={movie.Poster}
                alt={movie.Plot}
                width={200}
              />
              {/* </a> */}
              <Card.Body>
                <Card.Title>{movie.Plot}</Card.Title>
              </Card.Body>
            </Card>
          );
        })}
    </>
  );
};

export default SearchForm;
