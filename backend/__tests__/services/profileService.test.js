const profileService = require('../../services/profileService');
const { admin, db } = require('../../config/firebaseConfig');
const { invokeMusicAPI, invokeSpotifyAPI } = require('../../services/services');
const { profile } = require('console');
jest.mock('axios');

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

describe('ProfileService', () => {
    afterEach(() => {
        jest.clearAllMocks();
      });
    describe('getUserPlaylists', () => {
        it('should return user playlists', async () => {
            const userId = 'user123';   
            db.collection.mockReturnValueOnce({doc: jest.fn().mockReturnValue('userRef')});
            const doc = {
                id: 'id',
                data: jest.fn().mockReturnValue({testData: 'data'})
            }
            const playlistsSnapshot = [doc]
            const playlistsQuery = { get: jest.fn().mockResolvedValue(playlistsSnapshot)}
            db.collection.mockReturnValueOnce({where: jest.fn().mockReturnValue(playlistsQuery)});
            result = await profileService.getUserPlaylists(userId)
            expect(result).toEqual([{id: doc.id, ...doc.data()}]);
        });
      });

    describe('getPlaylistSongs', () => {
        it('should return songs in a playlist', async () => {
            const playlistId = 'playlist123'
            db.collection.mockReturnValueOnce({doc: jest.fn().mockReturnValue('playlistRef')});
            const song = {
                id: 'id',
                song: 'song',
                data: jest.fn().mockReturnValue({name: 'songName'})
            }
            songsSnapshot = [song]
            const songsQuery = { get: jest.fn().mockResolvedValue(songsSnapshot)}
            db.collection.mockReturnValueOnce({where: jest.fn().mockReturnValue(songsQuery)});

            db.collection.mockReturnValueOnce({where: jest.fn().mockReturnValue({get: jest.fn().mockResolvedValue(songsSnapshot)})})
            res = await profileService.getPlaylistSongs(playlistId);
            expect(res).toEqual([{
                id: song.id,
                name: song.data().name,
            }])
        });
    });

    describe('getUserInfo', () => {
        it('should return user info', async () => {
            const userId = 'user123'
            const data = {
                username: 'username',
                bio: 'bio',
                profilePictureUrl: 'url',
                isPublic: true,
            }
            const userSnapshot = { exists: true, data: jest.fn().mockReturnValue(data)}
            const userRef = {get: jest.fn().mockResolvedValue(userSnapshot)}
            db.collection.mockReturnValue({doc: jest.fn().mockReturnValue(userRef)})

            const res = await profileService.getUserInfo(userId);
            expect(res).toEqual(data)

        });
        it('should error if user does not exist', async () => {
            const userId = 'user123'
            const userSnapshot = { exists: false}
            const userRef = {get: jest.fn().mockResolvedValue(userSnapshot)}
            db.collection.mockReturnValue({doc: jest.fn().mockReturnValue(userRef)})
            await expect(profileService.getUserInfo(userId)).rejects.toThrow('User document does not exist');
        })
    })
    

});