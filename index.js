// import mongoose
const mongoose = require('mongoose');
const Models = require('./models.js');

const Movies = Models.Movie;
const Users = Models.User;

mongoose.connect('mongodb://localhost:27017/myFlixDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// import packages
const express = require('express'),
  bodyParser = require('body-parser'),
  uuid = require('uuid');

// import morgan into my package
const morgan = require('morgan');

const app = express();

const movies = [
  {
    title: 'Amadeus',
    description:
      'The film follows a fictional rivalry between Mozart and Italian composer Antonio Salieri at the court of Emperor Joseph II',
    director: 'Milos Forman',
    genres: [' Biography', 'Drama', 'History', 'Music'],

    image:
      'https://www.amadeus-live.com/wp-content/uploads/2015/10/main-home-image5.jpg',
  },
  {
    title: 'Rebecca',

    description: 'The film is a gothic tale shot in black-and-white.',
    director: 'Alfred Hitchcock',
    genres: 'Romance',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Rebecca_%281939_poster%29.jpeg/1200px-Rebecca_%281939_poster%29.jpeg',
  },
];

//  middleware
app.use(morgan('common'));

app.use(express.static('public'));

app.use(bodyParser.json());

// error-handling middleware function that will log all application-level errors to the terminal.
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

//  GET
app.get('/', (req, res) => {
  res.send('Welcome to myFlix!');
});

app.get('/movies', (req, res) => {
  res.json(movies);
});

// Gets the data about a single movie, by title
app.get('/movies/:title', (req, res) => {
  res.json(
    movies.find((movie) => {
      return movie.title === req.params.title;
    })
  );
});

app.get('/movies/genres/:genres', (req, res) => {
  res.send('Successful GET request returning a description of the genre');
});

app.get('/movies/directors/:name', (req, res) => {
  res.send('Successful GET request returning a description of the Director');
});

app.post('/users', (req, res) => {
  res.send('Registration succesful!');
});

app.put('/users/:username', (req, res) => {
  res.send(
    'The user: ' + req.params.username + ' ' + 'was successfully updated'
  );
});

app.post('/users/:username/favourites/:title', (req, res) => {
  res.send('Movie:' + req.params.title + ' ' + 'was added to favourites. ');
});

app.delete('/users/:username/favourites/:title', (req, res) => {
  res.send(
    'Movie:' + req.params.title + ' ' + 'has been removed from favourites'
  );
});

app.delete('/users/:username', (req, res) => {
  res.send('User' + req.params.username + ' ' + 'was deleted.');
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Your app is listening on port ${port}`);
});
