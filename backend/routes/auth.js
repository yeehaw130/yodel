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
            res.status(409).send('Username is not available');
        }
    } catch (error) {
        console.error("Validate Username Error:", error);
        res.status(500).send("Failed to validate username");
    }
}
);
// Signup endpoint
router.post('/signup', async (req, res) => {
    const { token, email, username } = req.body;
    try {
        // Verify the ID token
        const decodedToken = await admin.auth().verifyIdToken(token);
        const uid = decodedToken.uid;

        // Add user information in Firestore
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
        
        res.status(201).json({ message: "Signup successful", uid });
    } catch (error) {
        console.error("Signup Error:", error);
        res.status(500).json({ message: "Failed to complete signup" });
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