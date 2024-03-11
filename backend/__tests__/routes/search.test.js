const request = require('supertest');
const { app, server } = require('../../index');
const searchService = require('../../services/searchService');

jest.mock('../../services/searchService');

// Define base path
const basePath = '/api/search';

// Close the server after all tests are done
afterAll(done => {
    server.close(done);
});

// Define test cases
describe('search.js', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('GET ' + basePath, () => {
    it('should respond with 200 and search results if successful', async () => {
      const mockResults = [{ /* mock search result data */ }, { /* mock search result data */ }];
      const query = 'test';
      searchService.searchMusic.mockResolvedValue(mockResults);

      const response = await request(app)
        .get(`${basePath}/?query=${query}`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockResults);
    });

    it('should respond with 500 if an error occurs', async () => {
      const query = 'test';
      searchService.searchMusic.mockRejectedValue(new Error('Internal Server Error'));

      const response = await request(app)
        .get(`${basePath}/?query=${query}`);

      expect(response.status).toBe(500);
    });
  });

  describe('GET ' + basePath + '/song/:songId', () => {
    it('should respond with 200 and song details if successful', async () => {
      const mockSongDetails = { /* mock song details data */ };
      const songId = 'song123';
      searchService.getSongDetails.mockResolvedValue(mockSongDetails);

      const response = await request(app)
        .get(`${basePath}/song/${songId}`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockSongDetails);
    });

    it('should respond with 500 if an error occurs', async () => {
      const songId = 'song123';
      searchService.getSongDetails.mockRejectedValue(new Error('Internal Server Error'));

      const response = await request(app)
        .get(`${basePath}/song/${songId}`);

      expect(response.status).toBe(500);
    });
  });
});
