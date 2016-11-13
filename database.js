var firebase = require("firebase");

var isInitail = false;

// Initialize Firebase
var config = {
    apiKey: process.env.FIREBASE_API_KEY || "{YOUR_FIREBASE_API_KEY}",
    authDomain: process.env.FIREBASE_AUTH_DOMAIN || "{YOUR_FIREBASE_AUTH_DOMAIN}",
    databaseURL: process.env.FIREBASE_DATABASE_URL || "{YOUR_FIREBASE_DATABASE_URL}",
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET || "{YOUR_FIREBASE_STORAGE_BUCKET}",
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || "{YOUR_FIREBASE_MESSAGING_SENDER_ID}"
};

module.exports = {
    get: function () {
        if (false == isInitail) {
            isInitail = true;
            firebase.initializeApp(config);
        }
        return firebase.database();
    },
}