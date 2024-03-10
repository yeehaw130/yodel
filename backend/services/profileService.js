const { db } = require('../config/firebaseConfig');

const getUserPlaylists = async (userId) => {
    const userRef = db.collection('users').doc(userId);
    const playlistsQuery = db.collection('playlists').where('createdBy', '==', userRef);
    const playlistsSnapshot = await playlistsQuery.get();
    const playlists = [];
    playlistsSnapshot.forEach((doc) => {
        playlists.push({ id: doc.id, ...doc.data() });
    });
    return playlists;
}

const getUserInfo = async (userId) => {
    const userRef = db.collection('users').doc(userId);
    const userSnapshot = await userRef.get();
    if (!userSnapshot.exists) {
        throw new Error('User document does not exist');
    }
    const { username, bio, profilePictureUrl, isPublic } = userSnapshot.data();
    return { username, bio, profilePictureUrl, isPublic };
}


module.exports = {
    getUserPlaylists,
    getUserInfo
};