const request = require('supertest');
const { app, server } = require('../../index');
const socialService = require('../../services/socialService');

jest.mock('../../services/socialService');

// Define base path
const basePath = '/api/social';

// Close the server after all tests are done
afterAll(done => {
  server.close(done);
});
  

// Define test cases
describe('social.js', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    describe('POST ' + basePath + '/follow', () => {
        it('should respond with 200 and success message if successful', async () => {
          const mockResult = { /* mock result data */ };
          socialService.followUser.mockResolvedValue(mockResult);
    
          const response = await request(app)
            .post(`${basePath}/follow`)
            .send({ followId: 'follow123', targetId: 'followee123' });
    
          expect(response.status).toBe(200);
          expect(response.body).toEqual({ success: true, message: 'User followed successfully', data: mockResult });
        });
    
        it('should respond with 500 if an error occurs', async () => {
          socialService.followUser.mockRejectedValue(new Error('Internal Server Error'));
    
          const response = await request(app)
            .post(`${basePath}/follow`)
            .send({ followId: 'follow123', targetId: 'followee123' });
    
          expect(response.status).toBe(500);
        });
      });
  
    describe('POST ' + basePath + '/unfollow', () => {
      it('should respond with 200 and success message if successful', async () => {
        const mockResult = { /* mock result data */ };
        socialService.unfollowUser.mockResolvedValue(mockResult);
  
        const response = await request(app)
          .post(`${basePath}/unfollow`)
          .send({ followId: 'follow123', targetId: 'followee123' });
  
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ success: true, message: 'User unfollowed successfully', data: mockResult });
      });
  
      it('should respond with 500 if an error occurs', async () => {
        socialService.unfollowUser.mockRejectedValue(new Error('Internal Server Error'));
  
        const response = await request(app)
          .post(`${basePath}/unfollow`)
          .send({ followId: 'follow123', targetId: 'followee123' });
  
        expect(response.status).toBe(500);
      });
    });

    describe('POST ' + basePath + '/acceptfollow', () => {
        it('should respond with 200 and success message if successful', async () => {
          const mockResult = { /* mock result data */ };
          socialService.handleFollowRequest.mockResolvedValue(mockResult);
    
          const response = await request(app)
            .post(`${basePath}/acceptfollow`)
            .send({ followId: 'follow123' });
    
          expect(response.status).toBe(200);
          expect(response.body).toEqual({ success: true, message: 'Follow request accepted', data: mockResult });
        });
    
        it('should respond with 500 if an error occurs', async () => {
          socialService.handleFollowRequest.mockRejectedValue(new Error('Internal Server Error'));
    
          const response = await request(app)
            .post(`${basePath}/acceptfollow`)
            .send({ followId: 'follow123' });
    
          expect(response.status).toBe(500);
        });
      });

    describe('POST ' + basePath + '/rejectfollow', () => {
        it('should respond with 200 and success message if successful', async () => {
          const mockResult = { /* mock result data */ };
          socialService.handleFollowRequest.mockResolvedValue(mockResult);
    
          const response = await request(app)
            .post(`${basePath}/rejectfollow`)
            .send({ followId: 'follow123' });
    
          expect(response.status).toBe(200);
          expect(response.body).toEqual({ success: true, message: 'Follow request rejected', data: mockResult });
        });
    
        it('should respond with 500 if an error occurs', async () => {
          socialService.handleFollowRequest.mockRejectedValue(new Error('Internal Server Error'));
    
          const response = await request(app)
            .post(`${basePath}/rejectfollow`)
            .send({ followId: 'follow123' });
    
          expect(response.status).toBe(500);
        });
      });
  
    describe('GET ' + basePath + '/followingStatus', () => {
      it('should respond with 200 and follow status if successful', async () => {
        const mockResult = { /* mock result data */ };
        const userId = 'user123';
        const targetUserId = 'targetUser123';
        socialService.followingStatus.mockResolvedValue(mockResult);
  
        const response = await request(app)
          .get(`${basePath}/followingStatus?userId=${userId}&targetUserId=${targetUserId}`);
  
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ success: true, message: 'Follow status retrieved', data: mockResult });
      });
  
      it('should respond with 500 if an error occurs', async () => {
        socialService.followingStatus.mockRejectedValue(new Error('Internal Server Error'));
  
        const response = await request(app)
          .get(`${basePath}/followingStatus?userId=user123&targetUserId=targetUser123`);
  
        expect(response.status).toBe(500);
      });
    });
  
    describe('POST ' + basePath + '/share', () => {
      it('should respond with 200 and success message if successful', async () => {
        const mockResult = { /* mock result data */ };
        socialService.sharePlaylist.mockResolvedValue(mockResult);
  
        const response = await request(app)
          .post(`${basePath}/share`)
          .send({ senderId: 'sender123', receiverId: 'receiver123', playlistId: 'playlist123' });
  
        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockResult);
      });
  
      it('should respond with 500 if an error occurs', async () => {
        socialService.sharePlaylist.mockRejectedValue(new Error('Internal Server Error'));
  
        const response = await request(app)
          .post(`${basePath}/share`)
          .send({ senderId: 'sender123', receiverId: 'receiver123', playlistId: 'playlist123' });
  
        expect(response.status).toBe(500);
      });
    });
  
    describe('GET ' + basePath + '/activity/:userId', () => {
      it('should respond with 200 and user activity if successful', async () => {
        const mockResult = { /* mock result data */ };
        const userId = 'user123';
        socialService.getUserActivity.mockResolvedValue(mockResult);
  
        const response = await request(app)
          .get(`${basePath}/activity/${userId}`);
  
        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockResult);
      });
  
      it('should respond with 500 if an error occurs', async () => {
        socialService.getUserActivity.mockRejectedValue(new Error('Internal Server Error'));
  
        const userId = 'user123';
        const response = await request(app)
          .get(`${basePath}/activity/${userId}`);
  
        expect(response.status).toBe(500);
      });
    });
  
    describe('GET ' + basePath + '/followers/:userId', () => {
        it('should respond with 200 and user following if successful', async () => {
          const mockResult = { /* mock result data */ };
          const userId = 'user123';
          socialService.getFollowers.mockResolvedValue(mockResult);
    
          const response = await request(app)
            .get(`${basePath}/followers/${userId}`);
    
          expect(response.status).toBe(200);
          expect(response.body).toEqual(mockResult);
        });
    
        it('should respond with 500 if an error occurs', async () => {
          socialService.getFollowers.mockRejectedValue(new Error('Internal Server Error'));
    
          const userId = 'user123';
          const response = await request(app)
            .get(`${basePath}/followers/${userId}`);
    
          expect(response.status).toBe(500);
        });
      });

      describe('GET ' + basePath + '/followers/list/:userId', () => {
        it('should respond with 200 and user following if successful', async () => {
          const mockResult = { /* mock result data */ };
          const userId = 'user123';
          socialService.getFollowersList.mockResolvedValue(mockResult);
    
          const response = await request(app)
            .get(`${basePath}/followers/list/${userId}`);
    
          expect(response.status).toBe(200);
          expect(response.body).toEqual(mockResult);
        });
    
        it('should respond with 500 if an error occurs', async () => {
          socialService.getFollowersList.mockRejectedValue(new Error('Internal Server Error'));
    
          const userId = 'user123';
          const response = await request(app)
            .get(`${basePath}/followers/list/${userId}`);
    
          expect(response.status).toBe(500);
        });
      });

      describe('GET ' + basePath + '/following/:userId', () => {
        it('should respond with 200 and user activity if successful', async () => {
          const mockResult = { /* mock result data */ };
          const userId = 'user123';
          socialService.getFollowing.mockResolvedValue(mockResult);
    
          const response = await request(app)
            .get(`${basePath}/following/${userId}`);
    
          expect(response.status).toBe(200);
          expect(response.body).toEqual(mockResult);
        });
    
        it('should respond with 500 if an error occurs', async () => {
          socialService.getFollowing.mockRejectedValue(new Error('Internal Server Error'));
    
          const userId = 'user123';
          const response = await request(app)
            .get(`${basePath}/following/${userId}`);
    
          expect(response.status).toBe(500);
        });
      });

      describe('GET ' + basePath + '/following/list/:userId', () => {
        it('should respond with 200 and user activity if successful', async () => {
          const mockResult = { /* mock result data */ };
          const userId = 'user123';
          socialService.getFollowingList.mockResolvedValue(mockResult);
    
          const response = await request(app)
            .get(`${basePath}/following/list/${userId}`);
    
          expect(response.status).toBe(200);
          expect(response.body).toEqual(mockResult);
        });
    
        it('should respond with 500 if an error occurs', async () => {
          socialService.getFollowingList.mockRejectedValue(new Error('Internal Server Error'));
    
          const userId = 'user123';
          const response = await request(app)
            .get(`${basePath}/following/list/${userId}`);
    
          expect(response.status).toBe(500);
        });
      });

      describe('GET ' + basePath + '/requests/:userId', () => {
        it('should respond with 200 and user follow requests if successful', async () => {
          const mockResult = { /* mock result data */ };
          const userId = 'user123';
          socialService.getFollowRequests.mockResolvedValue(mockResult);
    
          const response = await request(app)
            .get(`${basePath}/requests/${userId}`);
    
          expect(response.status).toBe(200);
          expect(response.body).toEqual(mockResult);
        });
    
        it('should respond with 500 if an error occurs', async () => {
          socialService.getFollowRequests.mockRejectedValue(new Error('Internal Server Error'));
    
          const userId = 'user123';
          const response = await request(app)
            .get(`${basePath}/requests/${userId}`);
    
          expect(response.status).toBe(500);
        });
      });

      describe('GET ' + basePath + '/:userId', () => {
        it('should respond with 200 and user profile if successful', async () => {
          const mockResult = { /* mock result data */ };
          const userId = 'user123';
          socialService.getUser.mockResolvedValue(mockResult);
    
          const response = await request(app)
            .get(`${basePath}/${userId}`);
    
          expect(response.status).toBe(200);
          expect(response.body).toEqual(mockResult);
        });
    
        it('should respond with 500 if an error occurs', async () => {
          socialService.getUser.mockRejectedValue(new Error('Internal Server Error'));
    
          const userId = 'user123';
          const response = await request(app)
            .get(`${basePath}/${userId}`);
    
          expect(response.status).toBe(500);
        });
      });
  
  });
