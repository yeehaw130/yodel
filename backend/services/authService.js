// authService.js

const { admin, db } = require('../config/firebaseConfig');

const validateUsername = async (username) => {
    const user = await db.collection('users').where('username', '==', username).get();
    return user.empty;
};

const signup = async ({ token, email, username }) => {
    const decodedToken = await admin.auth().verifyIdToken(token);
    const uid = decodedToken.uid;

    await db.collection('users').doc(uid).set({
        username,
        email,
        createdAt: new Date().toISOString(),
        isPublic: false,
        followers: [],
        following: [],
        likedPlaylists: [],
        ownedPlaylists: [],
    });

    return uid;
};

const verifyToken = async (token) => {
    const decodedToken = await admin.auth().verifyIdToken(token);
    return decodedToken;
};

module.exports = {
    validateUsername,
    signup,
    verifyToken,
};