const express = require('express');
const router = express.Router();
const musicService = require('../services/musicService');

// GET perform a server-side search across connected music platforms to find songs or playlists
router.get('/search', async (req, res) => {
    try {
        const { query } = req.query;
        const results = await musicService.searchMusic(query);
        res.json(results);
    } catch (error) {
        console.error('Error searching music:', error);
        res.status(500).send('Internal Server Error');
    }
});

// GET retrieve detailed information about a song
router.get('/details/:songId', async (req, res) => {
    try {
        const { songId } = req.params;
        const songDetails = await musicService.getSongDetails(songId);
        res.json(songDetails);
    } catch (error) {
        console.error('Error getting song details:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;