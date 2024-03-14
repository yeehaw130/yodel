const authService = require('../../services/authService');
const { admin, db } = require('../../config/firebaseConfig');
const { invokeMusicAPI } = require('../../services/services');

jest.mock('../../config/firebaseConfig', () => {
    return {
        admin: {
            auth: jest.fn(),
            firestore: {
                FieldValue: {
                    serverTimestamp: jest.fn(),
                }
            }
        },
        db: {
            collection: jest.fn(),
            doc: jest.fn(),
        }
    }
});
jest.mock('../../services/services');

describe('AuthService', () => {
  describe('validateUsername', () => {
    it('should return true if username is available', async () => {
      const mockEmptyUser = { empty: true };
      db.collection.mockReturnValue({ where: jest.fn().mockReturnValue({ get: jest.fn().mockResolvedValue(mockEmptyUser) }) });

      const result = await authService.validateUsername('testusername');

      expect(result).toBe(true);
    });

    it('should return false if username is not available', async () => {
      const mockNonEmptyUser = { empty: false };
      db.collection.mockReturnValue({ where: jest.fn().mockReturnValue({ get: jest.fn().mockResolvedValue(mockNonEmptyUser) }) });

      const result = await authService.validateUsername('testusername');

      expect(result).toBe(false);
    });
  });

  describe('signup', () => {
    it('should return the UID of the user', async () => {
      const mockDecodedToken = { uid: 'user123' };
      admin.auth.mockReturnValue({ verifyIdToken: jest.fn().mockResolvedValue(mockDecodedToken) });

      const mockSet = jest.fn();
      db.doc.mockReturnValue({ set: mockSet });
      db.collection.mockReturnValue({ 
         doc: jest.fn().mockReturnValue({
             set: mockSet
         }
         )
      })
      const result = await authService.signup({ token: 'testtoken', email: 'test@example.com', username: 'testuser' });

      expect(result).toBe('user123');
      expect(admin.auth().verifyIdToken).toHaveBeenCalledWith('testtoken');
      expect(mockSet).toHaveBeenCalledWith({
        username: 'testuser',
        email: 'test@example.com',
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        isPublic: true,
        followersCount: 0,
        followingCount: 0,
        bio: '',
        profilePictureUrl: '',
        integrationUserUUID: '',
      });
    });
  });

  describe('verifyToken', () => {
    it('should return decoded token', async () => {
      const mockDecodedToken = { /* mock decoded token */ };
      admin.auth.mockReturnValue({ verifyIdToken: jest.fn().mockResolvedValue(mockDecodedToken) });

      const result = await authService.verifyToken('testtoken');

      expect(result).toBe(mockDecodedToken);
      expect(admin.auth().verifyIdToken).toHaveBeenCalledWith('testtoken');
    });
  });

  describe('connectMusicService', () => {
    it('should update user document with integrationUserUUID and profilePictureUrl', async () => {
        // Mock dependencies
    const mockData64 = 'eyJpbnRlZ3JhdGlvblVzZXJVUkwiOiJ1c2VyVXNlcklVVkkiLCJpbWFnZVVybCI6Imh0dHBzOi8vZXhhbXBsZS5jb20ifQ==';
    const mockJsonObject = { integrationUserUUID: 'userUUID' };
    const mockJsonString = JSON.stringify(mockJsonObject);
    const mockInvokeMusicAPIResult = { imageUrl: 'https://example.com' };
    const mockUpdate = jest.fn().mockResolvedValue({});
    const mockBufferFrom = jest.spyOn(Buffer, 'from').mockReturnValue(Buffer.from(mockJsonString, 'utf-8'));
    const mockJSONParse = jest.spyOn(JSON, 'parse').mockReturnValue(mockJsonObject)

    invokeMusicAPI.mockResolvedValue(mockInvokeMusicAPIResult);
    const userId = 'user123';
    db.collection.mockReturnValue({
        doc: jest.fn().mockReturnValue({ update: mockUpdate })
      });

    // Execute the function
    await authService.connectMusicService(userId, mockData64);

    // Assertions
    expect(mockBufferFrom).toHaveBeenCalledWith(mockData64, 'base64');
    expect(mockJSONParse).toHaveBeenCalledWith(mockJsonString);
    // expect(mockInvokeMusicAPI).toHaveBeenCalledWith('userUUID/users/profile');
    expect(mockUpdate).toHaveBeenCalledWith({ integrationUserUUID: 'userUUID', profilePictureUrl: 'https://example.com' });

    // Clean up
    mockBufferFrom.mockRestore();
    });
  });
});