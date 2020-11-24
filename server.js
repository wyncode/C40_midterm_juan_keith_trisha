if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const path = require('path');
const app = express();
const axios = require('axios');

// JUST FOR DEMO PURPOSES, PUT YOUR ACTUAL API CODE HERE

const getOmdbAPI = async () => {
  const API_KEY = process.env.API_KEY;
  return axios.get(`http://www.omdbapi.com/?apikey=e772d5f8&t=deadpool`);
};

app.get('/ombd', async (request, response) => {
  try {
    const movieData = await getOmdbAPI();
    response.json(movieData.data);

    // response.json("Hello WOrld");
  } catch (error) {
    console.log(error);
  }
});
// END DEMO

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));
  // Handle React routing, return all requests to React app
  app.get('*', (request, response) => {
    response.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`API listening on port ${port}...`);
});
