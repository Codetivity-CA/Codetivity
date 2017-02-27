var express = require('express');
var router = express.Router();
var firebase = require('firebase');

// Initialize Firebase
var config = {
  apiKey: "AIzaSyB3QZBjTDzoG50Aq-7sOwPfDTS7MGNKBO8",
  authDomain: "codetivity-89e7c.firebaseapp.com",
  databaseURL: "https://codetivity-89e7c.firebaseio.com",
  storageBucket: "codetivity-89e7c.appspot.com",
  messagingSenderId: "1022467561792"
};
firebase.initializeApp(config);

// The app only has access to public data as defined in the Security Rules
var rootRef = firebase.database().ref();
var FirebaseContent = {};
rootRef.once("value")
	.then(function(snapshot) {
		var key = snapshot.key; //null
		var childKey = snapshot.child("users/ada").key; // "ada"
		console.log(snapshot.val());
	}
);


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
