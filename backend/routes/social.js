const express = require('express');
const router = express.Router();
const socialService = require('../services/socialService');

// POST follow a user
router.post('/follow', async (req, res) => {
    try {
        const { userId, targetUserId } = req.body; // Assuming the client sends the current user's ID and the target user's ID
        const result = await socialService.followUser(userId, targetUserId);
        res.json({ success: true, message: 'User followed successfully', data: result });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to follow user', error: error.message });
    }
});

// POST unfollow a user
router.post('/unfollow', async (req, res) => {
    try {
        const { userId, targetUserId } = req.body; // Similarly, assuming the client sends the necessary IDs
        const result = await socialService.unfollowUser(userId, targetUserId);
        res.json({ success: true, message: 'User unfollowed successfully', data: result });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to unfollow user', error: error.message });
    }
});

// POST share a playlist to a friend
router.post('/share', async (req, res) => {
    try {
        const { senderId, receiverId, playlistId } = req.body;
        const result = await socialService.sharePlaylist(senderId, receiverId, playlistId);
        res.json(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// GET user activity, like friends' online status or recent listens
router.get('/activity/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const activity = await socialService.getUserActivity(userId);
        res.json(activity);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;