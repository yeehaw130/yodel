const request = require('supertest');
const { app, server } = require('../../index');
const authService = require('../../services/authService');

jest.mock('../../services/authService');

// Define the base path
const basePath = '/api/auth';

// Close the server after all tests are done
afterAll(done => {
  server.close(done);
});

describe('auth.js', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('POST ' + basePath + '/validateusername', () => {
    it('should respond with 200 if username is available', async () => {
      authService.validateUsername.mockResolvedValue(true);
      const response = await request(app)
        .post(basePath + '/validateusername')
        .send({ username: 'testuser' });
      expect(response.status).toBe(200);
    });

    it('should respond with 409 if username is not available', async () => {
      authService.validateUsername.mockResolvedValue(false);
      const response = await request(app)
        .post(basePath + '/validateusername')
        .send({ username: 'testuser' });
      expect(response.status).toBe(409);
    });

    it('should respond with 500 if an error occurs', async () => {
      authService.validateUsername.mockRejectedValue(new Error('Internal Server Error'));
      const response = await request(app)
        .post(basePath + '/validateusername')
        .send({ username: 'testuser' });
      expect(response.status).toBe(500);
    });
  });

  describe('POST ' + basePath + '/signup', () => {
    it('should respond with 201 and uid if signup is successful', async () => {
      authService.signup.mockResolvedValue('user123');
      const response = await request(app)
        .post(basePath + '/signup')
        .send({ username: 'testuser', password: 'testpassword' });
      expect(response.status).toBe(201);
      expect(response.body).toEqual({ message: "Signup successful", uid: 'user123' });
    });

    it('should respond with 500 if an error occurs', async () => {
      authService.signup.mockRejectedValue(new Error('Internal Server Error'));
      const response = await request(app)
        .post(basePath + '/signup')
        .send({ username: 'testuser', password: 'testpassword' });
      expect(response.status).toBe(500);
    });
  });

  describe('POST ' + basePath + '/verifytoken', () => {
    it('should respond with 200 if token is valid', async () => {
      authService.verifyToken.mockResolvedValue({ userId: 'user123' });
      const response = await request(app)
        .post(basePath + '/verifytoken')
        .send({ token: 'valid_token' });
      expect(response.status).toBe(200);
    });

    it('should respond with 401 if token is invalid', async () => {
      authService.verifyToken.mockRejectedValue(new Error('Invalid Token'));
      const response = await request(app)
        .post(basePath + '/verifytoken')
        .send({ token: 'invalid_token' });
      expect(response.status).toBe(401);
    });
  });

  describe('GET ' + basePath + '/connectservice/:userId', () => {
    it('should respond with 302 redirect if connection is successful', async () => {
      authService.connectMusicService.mockResolvedValue();
      const response = await request(app).get(basePath + '/connectservice/user123').query({ data64: 'some_data' });
      expect(response.status).toBe(302);
      expect(response.header.location).toBe('http://localhost:5173');
    });

    it('should respond with 500 if an error occurs', async () => {
      authService.connectMusicService.mockRejectedValue(new Error('Failed to connect to music service'));
      const response = await request(app).get(basePath + '/connectservice/user123').query({ data64: 'some_data' });
      expect(response.status).toBe(500);
    });
  });
});
