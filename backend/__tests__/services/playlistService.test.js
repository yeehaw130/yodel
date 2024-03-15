const playlistService = require('../../services/playlistService');
const { admin, db } = require('../../config/firebaseConfig');
const { invokeMusicAPI, invokeSpotifyAPI } = require('../../services/services');
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

describe('PlaylistService', () => {
    afterEach(() => {
        jest.clearAllMocks();
      });
    describe('fetchPlaylists', () => {
        it('fetchPlaylists should throw error if user document does not exist', async () => {
          const userId = 'user123';
          const userRefMock = {
            get: jest.fn().mockResolvedValue({ exists: false })
          };
          db.collection.mockReturnValue({ doc: jest.fn().mockReturnValue(userRefMock) });
      
          await expect(playlistService.fetchPlaylists(userId)).rejects.toThrow('User document does not exist');
        });
      
        it('fetchPlaylists should throw error if integration user UUID is missing', async () => {
          const userId = 'user123';
          const userRefMock = {
            get: jest.fn().mockResolvedValue({ exists: true, get: () => null })
          };
          db.collection.mockReturnValue({ doc: jest.fn().mockReturnValue(userRefMock) });
      
          await expect(playlistService.fetchPlaylists(userId)).rejects.toThrow('Integration user UUID is missing');
        });
      
        it('fetchPlaylists should return playlists', async () => {
          const userId = 'user123';
          const integrationUserUUID = 'integrationUser123';
          const playlists = [{ name: 'playlist1' }, { name: 'playlist2' }];
          const userRefMock = {
            get: jest.fn().mockResolvedValue({ exists: true, get: () => integrationUserUUID })
          };
          invokeMusicAPI.mockReturnValue({ results: playlists})
          db.collection.mockReturnValue({ doc: jest.fn().mockReturnValue(userRefMock) });
      
          const result = await playlistService.fetchPlaylists(userId);
      
          expect(result).toEqual(playlists);
        });
      });
    describe('importSong', () => {
        it('should import song info to db', async () => {
            const artistRef = {set: jest.fn().mockReturnValue()}
            const albumArtistRef = {set: jest.fn().mockReturnValue()}
            const albumRef = {set: jest.fn().mockReturnValue()}
            db.collection.mockReturnValueOnce({doc: jest.fn().mockReturnValue(artistRef)});
            db.collection.mockReturnValueOnce({doc: jest.fn().mockReturnValue(albumArtistRef)});
            db.collection.mockReturnValueOnce({doc: jest.fn().mockReturnValue(albumRef)});
            const song = {
                name: "songName",
                artists: ['songArtist'],
                album: {
                    name: "albumName",
                    artists: ['albumArtist'],
                },
                duration: 100000,
                imageUrl: 'imageUrl',
                isrc: 'isrc',
                previewURL: 'previewUrl',
            }
            const duration = song.duration / 1000;
            const minutes = Math.floor(duration / 60);
            const seconds = Math.floor(duration - minutes * 60);
            const d = `${minutes}m ${seconds}s`;
            const songRefSet = jest.fn().mockReturnValue();
            db.collection.mockReturnValueOnce({doc: jest.fn().mockReturnValue({set: songRefSet})});
            await playlistService.importSong(song);
            expect(songRefSet).toHaveBeenCalledWith({
                name: song.name,
                album: albumRef,
                artists: [artistRef],
                duration: d,
                imageUrl: song.imageUrl,
                isrc: song.isrc,
                previewUrl: song.previewUrl,
            }); 
        });
    });

    describe('importPlaylist', () => {
        it('should error if user does not exist', async () => {
            const userId = 'user123';
            const playlistId = 'playlist123';
            db.collection.mockReturnValue({doc: jest.fn().mockReturnValue({get: jest.fn().mockReturnValue({exists: false})})})
            await expect(playlistService.importPlaylist(playlistId, userId)).rejects.toThrow('User does not exist');
        });
        it('should error if user did not connect music service', async () => {
            const userId = 'user123';
            const playlistId = 'playlist123';
            db.collection.mockReturnValue({doc: jest.fn().mockReturnValue({get: jest.fn().mockReturnValue({exists: true, get: jest.fn().mockReturnValue(null)})})});
            await expect(playlistService.importPlaylist(playlistId, userId)).rejects.toThrow('Integration user UUID is missing');
        });
        it('should error if user did not connect music service', async () => {
            const userId = 'user123';
            const playlistId = 'playlist123';
            const integrationUserUUID = 'integrationUser123';
            db.collection.mockReturnValue({doc: jest.fn().mockReturnValue({get: jest.fn().mockReturnValue({exists: true, get: jest.fn().mockReturnValue(integrationUserUUID)})})});
            const song = {
                name: "songName",
                artists: ['songArtist'],
                album: {
                    name: "albumName",
                    artists: ['albumArtist'],
                },
                duration: 100000,
                imageUrl: 'imageUrl',
                isrc: 'isrc',
                previewURL: 'previewUrl',
            }
            const songs = [song]
            invokeMusicAPI.mockReturnValue({ results: songs })
            playlistService.importSong.mock
            
        });

    });
});