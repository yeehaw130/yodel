const express = require('express');
const { admin, db } = require('../config/firebaseConfig');
const router = express.Router();

// Signup endpoint
router.post('/signup', async (req, res) => {
    const { email, password, displayName } = req.body;
    try {
        // Create user with Firebase Authentication
        const userRecord = await admin.auth().createUser({
            email,
            password,
        });

        // Add user information in Firestore
        await db.collection('users').doc(userRecord.uid).set({
            displayName,
            email,
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
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