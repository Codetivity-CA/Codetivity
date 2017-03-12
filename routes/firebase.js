/**
 * Created by alexmadrzyk on 3/10/17.
 */

var express = require('express');
var firebase = require('firebase');
var router = express.Router();

// Initialize Firebase
var settings = {
    apiKey: "AIzaSyB3QZBjTDzoG50Aq-7sOwPfDTS7MGNKBO8",
    authDomain: "codetivity-89e7c.firebaseapp.com",
    databaseURL: "https://codetivity-89e7c.firebaseio.com",
    storageBucket: "codetivity-89e7c.appspot.com",
    messagingSenderId: "1022467561792"
};
firebase.initializeApp(settings);

// The app only has access to public data as defined in the Security Rules
var db = firebase.database();
var ref = db.ref("/heather/text");
ref.once("value").then(function(snapshot){
    checkDatabase(snapshot);
});

module.exports = router;








// FUNCTIONS
function checkDatabase(snapshot){
    if (snapshot.val() == "shfaksdjfhalskjdfhlasdkjfh") {
        console.log("Database working.");
    }
}