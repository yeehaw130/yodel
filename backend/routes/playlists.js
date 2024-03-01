const express = require('express');
const router = express.Router();
const playlistService = require('../services/playlistService');

// POST import playlists from external music service
router.post('/import', async (req, res) => {
    try {
        const { userId, externalService } = req.body;
        const result = await playlistService.importPlaylists(userId, externalService);
        res.json(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// POST like a playlist
router.post('/:playlistId/likes', async (req, res) => {
    try {
        const { playlistId } = req.params;
        const { userId } = req.body;
        const result = await playlistService.likePlaylist(userId, playlistId);
        res.json(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// DELETE unlike a playlist
router.delete('/:playlistId/likes', async (req, res) => {
    try {
        const { playlistId } = req.params;
        const { userId } = req.body;
        const result = await playlistService.unlikePlaylist(userId, playlistId);
        res.json(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;