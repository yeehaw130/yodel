// playlistService.js
const { db } = require('../config/firebaseConfig');
const axios = require('axios');
require('dotenv').config();

const importPlaylists = async (userId, externalService) => {
    // Logic to import playlists from a third-party platform
};

const likePlaylist = async (userId, playlistId) => {
    // Logic to like a playlist
};

const unlikePlaylist = async (userId, playlistId) => {
    // Logic to unlike a playlist
};

const fetchPlaylists = async (userId) => {
    const docRef = db.collection('users').doc(userId);
    const docSnapshot = await docRef.get();
    if (!docSnapshot.exists) {
        throw new Error('Document does not exist');
    }
    const integrationUserUUID = docSnapshot.get("integrationUserUUID");
    const fetchPlaylistsUrl = `https://api.musicapi.com/api/${integrationUserUUID}/playlists`
    const secret = `${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`
    const headers = {
        'Accept': 'application/json',
        'Authorization': "Basic " + Buffer.from(secret).toString('base64')
    }
    const playlists = await axios.get(fetchPlaylistsUrl, { headers }).then(res => res.data);
    return playlists;
};

module.exports = {
    importPlaylists,
    likePlaylist,
    unlikePlaylist,
    fetchPlaylists,
};