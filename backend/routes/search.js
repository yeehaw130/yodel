const express = require('express');
const router = express.Router();
const searchService = require('../services/searchService');

// GET perform a search to find songs or playlists
router.get('/', async (req, res) => {
    try {
        const { query } = req.query;
        const results = await searchService.searchMusic(query);
        res.json(results);
    } catch (error) {
        console.error('Error searching music:', error);
        res.status(500).send('Internal Server Error');
    }
});

// GET retrieve detailed information about a song
router.get('/song/:songId', async (req, res) => {
    try {
        const { songId } = req.params;
        const songDetails = await searchService.getSongDetails(songId);
        res.json(songDetails);
    } catch (error) {
        console.error('Error getting song details:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;