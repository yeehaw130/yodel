const express = require('express');
const { admin, db } = require('../config/firebaseConfig');
const router = express.Router();

router.post('/validateusername', async (req, res) => {
    const { username } = req.body;
    try {
        const user = await db.collection('users').where('username', '==', username).get();
        if (user.empty) {
            res.status(200).send('Username is available');
        } else {
            res.status(400).send('Username is not available');
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}
);
// Signup endpoint
router.post('/signup', async (req, res) => {
    const { userRecord, displayName, username } = req.body;
    try {
        // Add user information in Firestore
        await db.collection('users').doc(userRecord.uid).set({
            displayName,
            username,
            email: userRecord.email,
            createdAt: new Date().toISOString(),
            isPublic: false,
            followers: [],
            following: [],
            likedPlaylists: [],
            ownedPlaylists: [],
        });
        
        res.status(201).send({ uid: userRecord.uid });
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Token verification endpoint
router.post('/verifyToken', async (req, res) => {
    const { token } = req.body;
    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        res.status(200).send(decodedToken);
    } catch (error) {
        res.status(401).send('Invalid token');
    }
});

module.exports = router;