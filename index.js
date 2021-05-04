// To import express into my package
const express = require('express');

// To import morgan into my package
const morgan = require('morgan');

// This variable is what I’ll use to route my HTTP requests and responses
const app = express();

// Invoke Morgan middleware function
app.use(morgan('common'));

// Data Top Ten movies
const topTenMovies = [
  {
    title: 'Soul',
    director: 'Pete Docter',
    releaseDate: 2020,
  },
  {
    title: 'Together Together',
    director: 'Nikole Beckwith',
    releaseDate: 2021,
  },
  {
    title: 'Portrait of a Lady on Fire',
    director: 'Céline Sciamma',
    releaseDate: 2019,
  },
  {
    title: 'Little Women',
    director: 'Greta Gerwig',
    releaseDate: 2019,
  },
  {
    title: 'Arrival',
    director: 'Denis Villeneuve',
    releaseDate: 2016,
  },
  {
    title: 'Rebecca',
    director: 'Alfred Hitchcock',
    releaseDate: 1940,
  },
  {
    title: 'The Banker',
    director: 'George Nolfi',
    releaseDate: 2020,
  },
  {
    title: 'Amadeus',
    director: 'Milos Forman',
    releaseDate: 1984,
  },
  {
    title: 'Borat Subsequent Moviefilm',
    director: 'Jason Woliner',
    releaseDate: 2020,
  },
  {
    title: 'Knives Out',
    director: 'Rian Johnson',
    releaseDate: 2019,
  },
];

// Express GET route located at the endpoint “/movies” that returns a JSON object containing data about my top 10 movies
app.get('/movies', (req, res) => {
  res.json(topTenMovies);
});

// another GET route located at the endpoint “/” that returns a default textual response
app.get('/', (req, res) => {
  res.send('Welcome to myFlix!');
});

// Serving static files
app.use(express.static('public'));

// error-handling middleware function that will log all application-level errors to the terminal.
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// listen for requests
// app.listen(8080, () => {
//   console.log('Your app is listening on port 8080.');
// });

// determine the port to listen on by checking PORT first and giving it a value
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Your app is listening on port ${port}`);
});
