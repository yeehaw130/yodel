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
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        isPublic: true,
        followersCount: 0,
        followingCount: 0,
        bio: "",
        profilePictureUrl: "",
        integrationUserUUID: "",
    });

    return uid;
};

const verifyToken = async (token) => {
    const decodedToken = await admin.auth().verifyIdToken(token);
    return decodedToken;
};

const connectMusicService = async (userId, data64) => {
    const jsonString = Buffer.from(data64, 'base64').toString('utf-8');
    const jsonObject = JSON.parse(jsonString);
    const { integrationUserUUID } = jsonObject;
    
    await db.collection('users').doc(userId).update({
        integrationUserUUID
    })
}

module.exports = {
    validateUsername,
    signup,
    verifyToken,
    connectMusicService,
};