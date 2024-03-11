const request = require('supertest');
const { app, server } = require('../../index');
const profileService = require('../../services/profileService');

jest.mock('../../services/profileService');

// Define base path
const basePath = '/api/profile';

// Close the server after all tests are done
afterAll(done => {
    server.close(done);
});

// Define test cases
describe('profile.js', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('GET ' + basePath + '/playlists/:userId', () => {
    it('should respond with 200 and user playlists if successful', async () => {
      const mockPlaylists = [{ /* mock playlist data */ }, { /* mock playlist data */ }];
      const userId = 'user123';
      profileService.getUserPlaylists.mockResolvedValue(mockPlaylists);

      const response = await request(app)
        .get(`${basePath}/playlists/${userId}`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockPlaylists);
    });

    it('should respond with 500 if an error occurs', async () => {
      const userId = 'user123';
      profileService.getUserPlaylists.mockRejectedValue(new Error('Internal Server Error'));

      const response = await request(app)
        .get(`${basePath}/playlists/${userId}`);

      expect(response.status).toBe(500);
    });
  });

  describe('GET ' + basePath + '/:userId', () => {
    it('should respond with 200 and user info if successful', async () => {
      const mockUserInfo = { /* mock user info data */ };
      const userId = 'user123';
      profileService.getUserInfo.mockResolvedValue(mockUserInfo);

      const response = await request(app)
        .get(`${basePath}/${userId}`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockUserInfo);
    });

    it('should respond with 500 if an error occurs', async () => {
      const userId = 'user123';
      profileService.getUserInfo.mockRejectedValue(new Error('Internal Server Error'));

      const response = await request(app)
        .get(`${basePath}/${userId}`);

      expect(response.status).toBe(500);
    });
  });
});
