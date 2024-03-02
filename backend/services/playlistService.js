// playlistService.js
const { db } = require('../config/firebaseConfig');
const axios = require('axios');
require('dotenv').config();

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

    const fetchPlaylistsUrl = `https://api.musicapi.com/api/${integrationUserUUID}/playlists`;
    const secret = `${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`;
    const headers = {
        'Accept': 'application/json',
        'Authorization': "Basic " + Buffer.from(secret).toString('base64')
    };
    const playlists = await axios.get(fetchPlaylistsUrl, { headers }).then(res => res.data);
    return playlists.results;
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
const importPlaylist = async (playlistData, userId) => {
    const userRef = db.collection('users').doc(userId);
    const userSnapshot = await userRef.get();
    if (!userSnapshot.exists) {
        throw new Error('User does not exist');
    }
    const integrationUserUUID = userSnapshot.get("integrationUserUUID");
    const fetchPlaylistItemsUrl = `https://api.musicapi.com/api/${integrationUserUUID}/playlists/${playlistData.id}/items`;
    const secret = `${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`
    const headers = {
        'Accept': 'application/json',
        'Authorization': "Basic " + Buffer.from(secret).toString('base64')
    }
    const songData = await axios.get(fetchPlaylistItemsUrl, { headers}).then(res => {
        console.log(res.data.results);
        res.data.results;
    });

    // Import all the playlist's songs
    const songRefs = await Promise.all(songData.map(song => importSong(song)));

    const playlistRef = db.collection('playlists').doc(playlistData.id);
    await playlistRef.set({
        name: playlistData.name,
        description: "",
        totalItems: playlistData.totalItems,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        createdBy: userRef,
        likesCount: 0
    });

    // Link the playlist and songs in the 'playlistSongs' collection
    await Promise.all(songRefs.map(songRef => {
        const playlistSongRef = db.collection('playlistSongs').doc();
        return playlistSongRef.set({
            playlist: playlistRef,
            song: songRef,
            createdAt: admin.firestore.FieldValue.serverTimestamp()
        });
    }));

    console.log('Playlist imported successfully.');
};


module.exports = {
    likePlaylist,
    unlikePlaylist,
    fetchPlaylists,
    importPlaylist,
};