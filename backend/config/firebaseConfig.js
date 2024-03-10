const admin = require('firebase-admin');
// service account file
const serviceAccount = require('./yodel-temp-firebase.json'); //temp firebase bc read limit reached today
// const serviceAccount = require('./firebaseServiceAccount.json'); 

// Prevents reinitializing the app
if (admin.apps.length === 0) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

const db = admin.firestore();

module.exports = { admin, db };