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
            className="guess-bar"
            size="lg"
            type="text"
            placeholder="SEARCH FOR MOVIE..."
            defaultValue={search}
          />
          <Button variant="primary" className="button" type="submit">
            Search
          </Button>
        </Form.Row>
      </Form>
      {apiData && (
        <Card key={apiData.id} style={{ width: 200, margin: 5 }}>
          <Card.Img
            variant="top"
            src={apiData.Poster}
            alt={apiData.Plot}
            width={200}
          />
          <Card.Body>
            <Card.Title>{apiData.Plot}</Card.Title>
          </Card.Body>
        </Card>
      )}
    </>
  );
};
export default SearchForm;
