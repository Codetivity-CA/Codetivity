var express = require('express');
var router = express.Router();

router.get('/home', function(req, res){
    res
        .status(200)
        .sendFile('/views/index.html', { root: "./"});
});

router.get('/login', function(req, res){
    res
        .status(200)
        .sendFile('/views/login.html', { root: "./"});
});

// Respond with rendered codetivity.ejs when a GET request is made for '/code'
router.get('/code', function(req, res) {
    console.log("hey I'm here");
    res
        .status(200)
        .render('codetivity', {
            title: 'Express'
        });
});

router.get('/testLogin', function(req, res){
    res
        .status(200)
        .sendFile('/views/testLogin.html', { root: "./" });
});


module.exports = router;

