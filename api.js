const express = require('express');
const app = express();
require('dotenv').config();
app.use(express.json());

// Get PORT from environment variable
const PORT = process.env.PORT;
const VOTE_URL = process.env.VOTE_URL;
const VOTES_URL = process.env.VOTES_URL;

let voteCount = 0;

// Middleware to set Access-Control-Allow-Origin header on all APIs
app.use((req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*');
  next();
});

// OPTIONS method to allow all requests
app.options('*', (req, res) => {
  res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.set('Access-Control-Allow-Headers', 'Content-Type');
  res.send();
});

// GET method for health check
app.get('/', (req, res) => {
  res.send('OK');
});

// POST method for voting
app.post('/vote', (req, res) => {
  fetch(VOTE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ vote: req.body.vote }),
  })
    .then(response => response.json())
    .then(data => {
        console.log(data)
        return res.send(data)
      }
    )
    .catch(error => console.error(error));
});

// GET method for retrieving vote count
app.get('/votes', (req, res) => {
  fetch(VOTES_URL)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        return res.send(data)
      }
    )
    .catch(error => console.error(error));
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
  console.log(`Vote URL is ${VOTE_URL}`);
  console.log(`Votes URL is ${VOTES_URL}`);
});
