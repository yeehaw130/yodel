const express = require('express');
const router = express.Router();
const playlistService = require('../services/playlistService');

// POST like a playlist
router.post('/:playlistId/likes', async (req, res) => {
    try {
        const { playlistId } = req.params;
        const { userId } = req.body;
        const result = await playlistService.likePlaylist(userId, playlistId);
        res.json(result);
    } catch (error) {
        res.status(500).send(error.response.data.message);
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
        res.status(500).send(error.response.data.message);
    }
});

// GET fetch users playlists from musicapi
router.get('/fetch/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const result = await playlistService.fetchPlaylists(userId);
        res.json(result);
    } catch (error) {
        res.status(500).send(error.response.data.message)
    }
});

// POST import playlist to profile
router.post('/import/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const { playlist } = req.body;
        const result = await playlistService.importPlaylist(playlist, userId);
        res.json(result);
    } catch (error) {
        res.status(500).send(error.response.data.message);
    }
});

// GET all user playlists object
router.get('/get/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const result = await playlistService.getUserPlaylists(userId, false);
        res.json(result);
    } catch (error) {
        res.status(500).send(error);
    }
});

// GET feed for user
router.get('/feed/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const result = await playlistService.getUserPlaylists(userId, true);
        res.json(result);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;