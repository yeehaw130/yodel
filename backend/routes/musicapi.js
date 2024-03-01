const express = require('express');
const router = express.Router();
const { db } = require('../config/firebaseConfig');
const axios = require('axios');
require('dotenv').config();

const secret = `${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`
const headers = {
    'Accept': 'application/json',
    'Authorization': "Basic " + Buffer.from(secret).toString('base64')
}
router.get('/connectService/:userId/', async (req, res) => {
    const { userId } = req.params;
    const { data64 } = req.query;
    try {
        const jsonString = Buffer.from(data64, 'base64').toString('utf-8');
        const jsonObject = JSON.parse(jsonString);
        const { integrationUserUUID } = jsonObject;

        await db.collection('users').doc(userId).update({
            integrationUserUUID
        })

        res.redirect('http://localhost:5173');
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.get('/getPlaylists/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        const docRef = db.collection('users').doc(userId);
        const docSnapshot = await docRef.get();
        if (!docSnapshot.exists) {
            throw new Error('Document does not exist');
        }
        const integrationUserUUID = docSnapshot.get("integrationUserUUID");
        console.log(integrationUserUUID)

        const getPlaylistUrl = `https://api.musicapi.com/api/${integrationUserUUID}/playlists`
        const playlists = await axios.get(getPlaylistUrl, { headers }).then(res => res.data);
        const playlistWithItems = await Promise.all(playlists.map(async playlist => {
            // Fetch additional data asynchronously
            const getPlaylistItemsUrl = `https://api.musicapi.com/api/${integrationUserUUID}/playlists/${playlistId}/items`;
            const res = await axios.get(getPlaylistItemsUrl, { headers }).then(res => res.data);
            // Append additionalData to the playlist object
            return {
                ...playlist,
                extraData: additionalData
            };
        }));


    } catch (error) {
        res.status(400).send(error.message);
    }
});
const getSongs = async (playlistId, integrationUserUUID) => {
    const getPlaylistItemsUrl = `https://api.musicapi.com/api/${integrationUserUUID}/playlists/${playlistId}/items`;
    const res = await axios.get(getPlaylistItemsUrl, { headers });

}




module.exports = router;