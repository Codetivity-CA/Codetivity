var express = require('express');
var firebase = require('firebase');
var router = express.Router();

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
var db = firebase.database();
var ref = db.ref("/heather/text");
ref.once("value").then(function(snapshot){
  printDatabase(snapshot);
});

/* GET home page. */
router.get('/', function(req, res, next) {
  // THIS IS WHERE IT'S LOOKING FOR THE MAIN PAGE AND RENDERING IT!!!!!!!!!!!!!!!!!!!
  res.render('codetivity', {
    title: 'Express'
  });
});

module.exports = router;


// FUNCTIONS
function printDatabase(snapshot){
    if (snapshot.val() == "shfaksdjfhalskjdfhlasdkjfh") {
      console.log("Database working.");
    }
}