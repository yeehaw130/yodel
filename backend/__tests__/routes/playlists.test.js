const request = require('supertest');
const { app, server } = require('../../index');
const playlistService = require('../../services/playlistService');

jest.mock('../../services/playlistService');

// Define the base path
const basePath = '/api/playlists'

// Close the server after all tests are done
afterAll(done => {
    server.close(done);
});

// Define test cases
describe('playlists.js', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    describe('POST ' + basePath + '/:playlistId/likes', () => {
      it('should respond with 200 and result if successful', async () => {
        const mockResult = { /* mock result data */ };
        playlistService.likePlaylist.mockResolvedValue(mockResult);
  
        const response = await request(app)
          .post(basePath + '/playlist123/likes')
          .send({ userId: 'user123' });
  
        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockResult);
      });
  
      it('should respond with 500 if an error occurs', async () => {
        playlistService.likePlaylist.mockRejectedValue(new Error('Internal Server Error'));
  
        const response = await request(app)
          .post(basePath + '/playlist123/likes')
          .send({ userId: 'user123' });
  
        expect(response.status).toBe(500);
      });
    });
  
    describe('DELETE ' + basePath + '/:playlistId/likes', () => {
      it('should respond with 200 and result if successful', async () => {
        const mockResult = { /* mock result data */ };
        playlistService.unlikePlaylist.mockResolvedValue(mockResult);
  
        const response = await request(app)
          .delete(basePath + '/playlist123/likes')
          .send({ userId: 'user123' });
  
        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockResult);
      });
  
      it('should respond with 500 if an error occurs', async () => {
        playlistService.unlikePlaylist.mockRejectedValue(new Error('Internal Server Error'));
  
        const response = await request(app)
          .delete(basePath + '/playlist123/likes')
          .send({ userId: 'user123' });
  
        expect(response.status).toBe(500);
      });
    });
  
    describe('GET ' + basePath + '/fetch/:userId', () => {
      it('should respond with 200 and result if successful', async () => {
        const mockResult = { /* mock result data */ };
        playlistService.fetchPlaylists.mockResolvedValue(mockResult);
  
        const response = await request(app)
          .get(basePath + '/fetch/user123');
  
        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockResult);
      });
  
      it('should respond with 500 if an error occurs', async () => {
        playlistService.fetchPlaylists.mockRejectedValue(new Error('Internal Server Error'));
  
        const response = await request(app)
          .get(basePath + '/fetch/user123');
  
        expect(response.status).toBe(500);
      });
    });
  
    describe('POST ' + basePath + '/import/:userId', () => {
      it('should respond with 200 and result if successful', async () => {
        const mockResult = { /* mock result data */ };
        playlistService.importPlaylist.mockResolvedValue(mockResult);
  
        const response = await request(app)
          .post(basePath + '/import/user123')
          .send({ playlist: 'playlistData' });
  
        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockResult);
      });
  
      it('should respond with 500 if an error occurs', async () => {
        playlistService.importPlaylist.mockRejectedValue(new Error('Internal Server Error'));
  
        const response = await request(app)
          .post(basePath + '/import/user123')
          .send({ playlist: 'playlistData' });
  
        expect(response.status).toBe(500);
      });
    });
  
    describe('GET ' + basePath + '/feed/:userId', () => {
      it('should respond with 200 and result if successful', async () => {
        const mockResult = { /* mock result data */ };
        playlistService.getUserPlaylists.mockResolvedValue(mockResult);
  
        const response = await request(app)
          .get(basePath + '/feed/user123');
  
        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockResult);
      });
  
      it('should respond with 500 if an error occurs', async () => {
        playlistService.getUserPlaylists.mockRejectedValue(new Error('Internal Server Error'));
  
        const response = await request(app)
          .get(basePath + '/feed/user123');
  
        expect(response.status).toBe(500);
      });
    });
  
    describe('GET ' + basePath + '/get/:userId', () => {
      it('should respond with 200 and result if successful', async () => {
        const mockResult = { /* mock result data */ };
        playlistService.getUserPlaylists.mockResolvedValue(mockResult);
  
        const response = await request(app)
          .get(basePath + '/get/user123');
  
        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockResult);
      });
  
      it('should respond with 500 if an error occurs', async () => {
        playlistService.getUserPlaylists.mockRejectedValue(new Error('Internal Server Error'));
  
        const response = await request(app)
          .get(basePath + '/get/user123');
  
        expect(response.status).toBe(500);
      });
    });
  });
  
