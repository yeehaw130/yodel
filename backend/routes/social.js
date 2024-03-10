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

// POST accept a follow request
router.post('/acceptfollow', async (req, res) => {
    try {
        const { followId } = req.body;
        const result = await socialService.handleFollowRequest(followId, true);
        res.json({ success: true, message: 'Follow request accepted', data: result });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to accept follow request', error: error.message });
    }
});

// POST reject a follow request
router.post('/rejectfollow', async (req, res) => {
    try {
        const { followId } = req.body;
        const result = await socialService.handleFollowRequest(followId, false);
        res.json({ success: true, message: 'Follow request rejected', data: result });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to reject follow request', error: error.message });
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

// GET followers of a user
router.get('/followers/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const followers = await socialService.getFollowers(userId);
        res.json(followers);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// GET users followed by a user
router.get('/following/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const following = await socialService.getFollowing(userId);
        res.json(following);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// GET pending follow requests for a user
router.get('/requests/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const requests = await socialService.getFollowRequests(userId);
        res.json(requests);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// GET profile picture URL for a user
router.get('/profilepicture/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const pictureUrl = await socialService.getProfilePictureUrl(userId);
        res.json(pictureUrl);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// GET user profile information
router.get('/:userId', async (req, res) => {   
    try {
        const userId = req.params.userId;
        const user = await socialService.getUser(userId);
        res.json(user);
    } catch (error) {
        res.status(500).send(error.message);
    }
});


module.exports = router;