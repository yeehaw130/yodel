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
    return playlists.results;
};

const importPlaylist = async (playlist, userId) => {
    const playlistId = playlist.id;
    const docRef = db.collection('users').doc(userId);
    const docSnapshot = await docRef.get();
    if (!docSnapshot.exists) {
        throw new Error('Document does not exist');
    }
    const integrationUserUUID = docSnapshot.get("integrationUserUUID");
    const fetchPlaylistItemsUrl = `https://api.musicapi.com/api/${integrationUserUUID}/playlists/${playlistId}/items`;
    const secret = `${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`
    const headers = {
        'Accept': 'application/json',
        'Authorization': "Basic " + Buffer.from(secret).toString('base64')
    }
    const items = await axios.get(fetchPlaylistItemsUrl, { headers}).then(res => res.data);

    const currentPlaylists = docSnapshot.data().ownedPlaylists || [];
    const newPlaylist = {
        ...playlist,
        items: items.results,
        uploadedAt: new Date().toISOString(),
    }
    const updatedList = [...currentPlaylists, newPlaylist];
    return docRef.update({
        ownedPlaylists: updatedList,
      });
}

module.exports = {
    likePlaylist,
    unlikePlaylist,
    fetchPlaylists,
    importPlaylist,
};