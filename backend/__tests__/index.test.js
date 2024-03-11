const request = require('supertest');
const { app, server } = require('../index'); // Import the app from index.js

// Close the server after all tests are done
afterAll(done => {
  server.close(done);
});

describe('GET /', () => {
  it('should respond with "Hello World!"', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Hello World!');
  });
});