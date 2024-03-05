const express = require('express');
const router = express.Router();
const profileService = require('../services/profileService');

// GET user's playlists
router.get('/playlists/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const reqId = req.body.userId;
        const playlists = await profileService.getUserPlaylists(userId, reqId);
        res.json(playlists);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// GET user's info
router.get('/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const reqId = req.body.userId;
        const result = await profileService.getUserInfo(userId, reqId);
        res.json(result);
    } catch (error) {
        res.status(500).send(error.message)
    }
});