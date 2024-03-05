const { db } = require('../config/firebaseConfig');

const checkIfUserIsAuthorized = async (userId, reqId) => {
    if (userId !== reqId) {
        const userRef = db.collection('users').doc(userId);
        const userSnapshot = await userRef.get();
        if (!userSnapshot.exists) {
            throw new Error('User document does not exist');
        }
        if (!userSnapshot.data().isPublic) {
            // find if the requesting user follows the target user
            const followId = reqId + userId;
            const followRef = db.collection('follows').doc(followId);
            const followSnapshot = await followRef.get();
            if (!followSnapshot.exists || followSnapshot.data().status !== 'active') {
                throw new Error('User profile is private');
            }
        }
    }
}

const getUserPlaylists = async (userId, reqId) => {
    await checkIfUserIsAuthorized(userId, reqId);
    const userRef = db.collection('users').doc(userId);
    const playlistsQuery = db.collection('playlists').where('createdBy', '==', userRef);
    const playlistsSnapshot = await playlistsQuery.get();
    const playlists = [];
    playlistsSnapshot.forEach((doc) => {
        playlists.push({ id: doc.id, ...doc.data() });
    });
    return playlists;
}

const getUserInfo = async (userId, reqId) => {
    await checkIfUserIsAuthorized(userId, reqId);
    const userRef = db.collection('users').doc(userId);
    const userSnapshot = await userRef.get();
    if (!userSnapshot.exists) {
        throw new Error('User document does not exist');
    }
    return userSnapshot.data();
}


module.exports = {
    getUserPlaylists,
    getUserInfo
};