// playlistService.js
const { admin, db } = require('../config/firebaseConfig');
const axios = require('axios');
require('dotenv').config();
const { invokeMusicAPI, invokeSpotifyAPI } = require('./services');

const likePlaylist = async (userId, playlistId) => {
    // Logic to like a playlist
};

const unlikePlaylist = async (userId, playlistId) => {
    // Logic to unlike a playlist
};

const fetchPlaylists = async (userId) => {
    const userRef = db.collection('users').doc(userId);
    const userSnapshot = await userRef.get();
    if (!userSnapshot.exists) {
        throw new Error('User document does not exist');
    }
    const integrationUserUUID = userSnapshot.get("integrationUserUUID");
    if (!integrationUserUUID) {
        throw new Error('Integration user UUID is missing');
    }
    const fetchPlaylistsUrl = `${integrationUserUUID}/playlists`;
    const res = await invokeMusicAPI(fetchPlaylistsUrl);
    return res.results;
};

// Helper function to import a single song and its album and artists
const importSong = async (song) => {
    // Import song artists
    const songArtistRefs = await Promise.all(song.artists.map(async (artist) => {
        const artistRef = db.collection('artists').doc(artist.id);
        await artistRef.set({ name: artist.name }, { merge: true });
        return artistRef;
    }));

    // Import album and its artists
    const albumArtistRefs = await Promise.all(song.album.artists.map(async (artist) => {
        const artistRef = db.collection('artists').doc(artist.id);
        await artistRef.set({ name: artist.name }, { merge: true });
        return artistRef;
    }));

    const albumRef = db.collection('albums').doc(song.album.id);
    await albumRef.set({
        name: song.album.name,
        artists: albumArtistRefs,
        totalItems: song.album.totalItems,
    }, { merge: true });

    // compute readable duration in the format 0m 0s
    song.duration = song.duration / 1000;
    const minutes = Math.floor(song.duration / 60);
    const seconds = Math.floor(song.duration - minutes * 60);
    song.duration = `${minutes}m ${seconds}s`;

    // Import song with references to its album and artists
    const songRef = db.collection('songs').doc(song.id);
    await songRef.set({
        name: song.name,
        album: albumRef,
        artists: songArtistRefs,
        duration: song.duration,
        imageUrl: song.imageUrl,
        isrc: song.isrc,
        previewUrl: song.previewUrl
    });

    return songRef;
};

// Function to import the playlist and its songs from MusicAPI into Firestore
const importPlaylist = async (playlist, userId) => {
    const userRef = db.collection('users').doc(userId);
    const userSnapshot = await userRef.get();
    if (!userSnapshot.exists) {
        throw new Error('User does not exist');
    }
    const integrationUserUUID = userSnapshot.get("integrationUserUUID");
    if (!integrationUserUUID) {
        throw new Error('Integration user UUID is missing');
    }
    const fetchPlaylistItemsUrl = `${integrationUserUUID}/playlists/${playlist.id}/items`;
    const res = await invokeMusicAPI(fetchPlaylistItemsUrl);
    const songs = res.results;

    // Import all the playlist's songs
    const songRefs = await Promise.all(songs.map(song => importSong(song)));

    //load cover photo and description from spotify if applicable
    //TODO: if applicable
    const spotifyPlaylistUrl = `playlists/${playlist.id}`;
    const spotifyPlaylist = await invokeSpotifyAPI(spotifyPlaylistUrl, integrationUserUUID);
    const description = "";
    const coverPhotoUrl = "";
    if (spotifyPlaylist) {
        const coverPhotoUrl = (spotifyPlaylist.images && spotifyPlaylist.images.length) ? spotifyPlaylist.images[0].url : "";
    }

    const playlistRef = db.collection('playlists').doc(playlist.id);
    await playlistRef.set({
        name: playlist.name,
        description: description,
        totalItems: playlist.totalItems,
        coverPhotoUrl: coverPhotoUrl,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        createdBy: userRef,
        likesCount: 0
    });

    // Fetch existing song links for the playlist to avoid duplicates
    const existingLinksSnapshot = await db.collection('playlistSongs')
        .where('playlist', '==', playlistRef)
        .get();

    const existingSongIds = new Set();
    existingLinksSnapshot.forEach(doc => {
        const songRef = doc.data().song;
        existingSongIds.add(songRef.id);
    });


    // Link new songs to the playlist, excluding duplicates
    await Promise.all(songRefs.map(songRef => {
        if (!existingSongIds.has(songRef.id)) {
            const playlistSongRef = db.collection('playlistSongs').doc();
            return playlistSongRef.set({
                playlist: playlistRef,
                song: songRef,
                createdAt: admin.firestore.FieldValue.serverTimestamp()
            });
        }
    }));

    console.log('Playlist imported successfully.');
    return { message: 'Playlist imported successfully.' };
};

// get user playlists object with song details from firestore
const getUserPlaylists = async (userId, feed) => {
    const userRef = db.collection('users').doc(userId);
    const userSnapshot = await userRef.get();
    if (!userSnapshot.exists) {
        throw new Error('User does not exist');
    }
    const userPlaylists = await db.collection('playlists').where('createdBy', feed ? '!=' : '==', userRef).get();
    const playlists = await Promise.all(userPlaylists.docs.map(async doc => {
        let pl = { id: doc.id, ...doc.data() };

        // get playlist songs
        const playlistSongs = await db.collection('playlistSongs').where('playlist', '==', doc.ref).get();

        pl.songs = await Promise.all(playlistSongs.docs.map(async doc => {
            let song = { id: doc.id, ...doc.data() };
            const songDetails = await song.song.get();
            song = { ...song, ...songDetails.data() };
            return song;
        }));

        return pl;
    }));


    for (let pl of playlists) {
        const createdBySnapshot = await pl.createdBy.get();
        if (createdBySnapshot.exists) {
            pl.createdBy = createdBySnapshot.data();
        } else {
            console.log('No such document!');
        }
        for (let song of pl.songs) {
            const a = await song.album.get();

            const artistSnapshot = await song.artists[0].get();
            if (artistSnapshot.exists) {
                song.artists = artistSnapshot.data().name;
            } else {
                console.log('No such document!');
            }


            const albumSnapshot = await song.album.get();
            if (albumSnapshot.exists) {
                song.album = albumSnapshot.data().name;
            } else {
                console.log('No such document!');
            }
            
        }
    }                                  

    return playlists;
};


module.exports = {
    likePlaylist,
    unlikePlaylist,
    fetchPlaylists,
    importPlaylist,
    getUserPlaylists,
};