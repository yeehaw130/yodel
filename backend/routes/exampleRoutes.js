const express = require('express');
const router = express.Router();
const { db } = require('../config/firebaseConfig');

router.post('/addUser', async (req, res) => {
  try {
    const data = req.body;
    const result = await db.collection('users').add(data);
    res.status(201).send(`User added with ID: ${result.id}`);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get('/getUser/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await db.collection('users').doc(userId).get();
    if (user.exists) {
      res.status(200).json(user.data());
    } else {
      res.status(404).send('User not found');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});


module.exports = router;