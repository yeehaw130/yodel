const socialService = require('../../services/socialService');
const { admin, db } = require('../../config/firebaseConfig');
jest.mock('axios');

jest.mock('../../config/firebaseConfig', () => {
    return {
        admin: {
            auth: jest.fn(),
            firestore: {
                FieldValue: {
                    serverTimestamp: jest.fn(),
                    increment: jest.fn()
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

describe('SocialService', () => {
    afterEach(() => {
        jest.clearAllMocks();
      });
    describe('followUser', () => {
        it('should error if follow already exists', async () => {
            const userId = 'user123'
            const targetUserId = 'target123'
            const follow = { exists: true }
            db.collection.mockReturnValueOnce({doc: jest.fn().mockReturnValue({get: jest.fn().mockResolvedValue(follow)})});
            await expect(socialService.followUser(userId, targetUserId)).rejects.toThrow('Follow already exists');
        });
        it('should be pending if target is private', async () => {
            const userId = 'user123'
            const targetUserId = 'target123'
            const follow = { exists: false }
            const followRefSet = jest.fn()
            const followRef = {get: jest.fn().mockResolvedValue(follow), set: followRefSet}
            db.collection.mockReturnValueOnce({doc: jest.fn().mockReturnValue(followRef)});
            const cur_time = new Date().getTime()
            admin.firestore.FieldValue.serverTimestamp.mockReturnValue(cur_time)
            const followData = {
                follower: userId,
                following: targetUserId,
                createdAt: cur_time,
                status: "pending"
            }

            targetUserRef = { get: jest.fn().mockResolvedValue(false)}
            db.collection.mockReturnValueOnce({doc: jest.fn().mockReturnValue(targetUserRef)})

            res = await socialService.followUser(userId, targetUserId)
            expect(res).toEqual(followData)
            expect(followRefSet).toHaveBeenCalledWith(followData)
        });
        it('should follow if target is public', async () => {
            const userId = 'user123'
            const targetUserId = 'target123'
            const follow = { exists: false }
            const followRefSet = jest.fn()
            const followRef = {get: jest.fn().mockResolvedValue(follow), set: followRefSet}
            db.collection.mockReturnValueOnce({doc: jest.fn().mockReturnValue(followRef)});
            const cur_time = new Date().getTime()
            admin.firestore.FieldValue.serverTimestamp.mockReturnValue(cur_time)
            const followData = {
                follower: userId,
                following: targetUserId,
                createdAt: cur_time,
                status: "pending"
            }

            targetUserRef = { get: jest.fn().mockResolvedValue(true)}
            db.collection.mockReturnValueOnce({doc: jest.fn().mockReturnValue(targetUserRef)})
            const followedData = {
                follower: userId,
                following: targetUserId,
                createdAt: cur_time,
                status: "active"
            }
            db.collection.mockReturnValue({doc: jest.fn().mockReturnValue({
                get: jest.fn().mockResolvedValue({exists: true, data: jest.fn().mockReturnValue(followData)}),
                update: jest.fn().mockReturnValue()
            })})
            admin.firestore.FieldValue.increment.mockReturnValue()
            res = await socialService.followUser(userId, targetUserId)
            expect(res).toEqual(followData)
            expect(followRefSet).toHaveBeenCalledWith(followData)
        });
      });

   

});