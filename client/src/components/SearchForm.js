import React from 'react';
// import axios from `axios`;
import { Form } from 'react-bootstrap';

const SearchForm = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Entered SearchForm');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Row>
        <Form.Control id="searchbar" type="text" placeholder="Type Here" />
      </Form.Row>
    </Form>
  );
};

export default SearchForm;
