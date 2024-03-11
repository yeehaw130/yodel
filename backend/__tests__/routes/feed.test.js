const request = require('supertest');
const { app, server } = require('../../index');
const feedService = require('../../services/feedService');

jest.mock('../../services/feedService');

// Define the base path
const basePath = '/api/feed';

// Close the server after all tests are done
afterAll(done => {
  server.close(done);
});

describe('feed.js', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });
  describe('GET ' + basePath + '/:userId', () => {
    it('should respond with 200 and feed data if successful', async () => {
        // Mock feedService.generateFeed to return sample data
        const mockFeedData = { /* sample feed data */ };
        feedService.generateFeed.mockResolvedValue(mockFeedData);
    
        // Send a GET request to the route
        const response = await request(app).get('/api/feed/user123');
    
        // Verify the response status and data
        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockFeedData);
      });
    
      it('should respond with 500 if an error occurs', async () => {
        // Mock feedService.generateFeed to throw an error
        feedService.generateFeed.mockRejectedValue(new Error('Internal Server Error'));
    
        // Send a GET request to the route
        const response = await request(app).get('/api/feed/user123');
    
        // Verify the response status and error message
        expect(response.status).toBe(500);
        expect(response.text).toBe('Internal Server Error');
      });
    });
});
