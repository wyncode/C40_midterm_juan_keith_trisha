import React from 'react';
import SearchForm from './components/SearchForm';
import { Container } from 'react-bootstrap';
import MovieCard from './components/MovieCard';

import './App.css';
import DataFetching from './components/MovieGame';

const App = () => {
  return (
    <Container>
      <DataFetching />
    </Container>
  );
};

export default App;
