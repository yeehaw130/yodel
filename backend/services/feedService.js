// feedService.js
const { db } = require('../config/firebaseConfig');

const generateFeed = async (userId, following) => {
    // Logic to generate the feed for a user, including playlists from friends and recommendations
    // get all playlists from following
    const playlists = [];
    for (const followId of following) {
        const docRef = db.collection('users').doc(followId);
        const userPlaylists = await docRef.get("ownedPlaylists");
        playlists.push(...userPlaylists);
    }

    // get recommendations
    // TODO: implement recommendation logic

    // order playlists by date, newest first
    playlists.sort((a, b) => {
        return new Date(b.uploadedAt) - new Date(a.uploadedAt);
    });

    return {
        message: 'Feed generated successfully',
        data: {
            playlists: playlists,
            recommendations: []
        }
    };
};

module.exports = {
    generateFeed,
};