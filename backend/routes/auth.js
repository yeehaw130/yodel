const express = require('express');
const router = express.Router();
const authService = require('../services/authService');

router.post('/validateusername', async (req, res) => {
    const { username } = req.body;
    try {
        const isAvailable = await authService.validateUsername(username);
        if (isAvailable) {
            res.status(200).send('Username is available');
        } else {
            res.status(409).send('Username is not available');
        }
    } catch (error) {
        console.error("Validate Username Error:", error);
        res.status(500).send("Failed to validate username");
    }
});

router.post('/signup', async (req, res) => {
    try {
        const uid = await authService.signup(req.body);
        res.status(201).json({ message: "Signup successful", uid });
    } catch (error) {
        console.error("Signup Error:", error);
        res.status(500).json({ message: "Failed to complete signup" });
    }
});

router.post('/verifytoken', async (req, res) => {
    const { token } = req.body;
    try {
        const decodedToken = await authService.verifyToken(token);
        res.status(200).send(decodedToken);
    } catch (error) {
        res.status(401).send('Invalid token');
    }
});

module.exports = router;