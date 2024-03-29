const express = require('express');
const router = express.Router();
const feedService = require('../services/feedService');

// GET aggregated feed for a user, including playlists and recommendations
router.get('/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const feedData = await feedService.generateFeed(userId);
        res.json(feedData);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;