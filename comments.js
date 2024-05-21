// Create web server
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const comments = require('./comments');

app.use(bodyParser.json());

app.get('/comments', (req, res) => {
  res.json(comments);
});

app.post('/comments', (req, res) => {
  const newComment = req.body;
  comments.push(newComment);
  res.json(newComment);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Path: comments.js
// Data
const comments = [
  {
    id: 1,
    text: 'Hello, World!',
  },
  {
    id: 2,
    text: 'This is a test comment',
  },
];

module.exports = comments;

// Path: test.js
// Test the API
const request = require('supertest');
const app = require('./comments');

// Test GET /comments
describe('GET /comments', () => {
  it('responds with JSON', (done) => {
    request(app)
      .get('/comments')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});

// Test POST /comments
describe('POST /comments', () => {
  it('responds with JSON', (done) => {
    request(app)
      .post('/comments')
      .send({ text: 'This is a test comment' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});

// Run the tests
$ npx mocha test.js