const express = require('express');
const router = express.Router();
const profileService = require('../services/profileService');

// GET user's playlists
router.get('/playlists/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const playlists = await profileService.getUserPlaylists(userId);
        res.json(playlists);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// GET user's playlist songs
router.get('/playlists/songs/:playlistId', async (req, res) => {
    try {
        const { playlistId } = req.params;
        console.log("The playlist id that was passed in was: ");
        console.log(playlistId);
        const songs = await profileService.getPlaylistSongs(playlistId);
        res.json(songs);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// GET user's info
router.get('/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const result = await profileService.getUserInfo(userId);
        res.json(result);
    } catch (error) {
        res.status(500).send(error.message)
    }
});

module.exports = router;