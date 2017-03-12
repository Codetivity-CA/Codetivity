var express = require('express');
var router = express.Router();

// Respond with rendered codetivity.ejs when a GET request is made for '/'
router.get('/', function(req, res, next) {
  // THIS IS WHERE IT'S LOOKING FOR THE MAIN PAGE AND RENDERING IT!!!!!!!!!!!!!!!!!!!
  res.render('codetivity', {
    title: 'Express'
  });
});

/**
 * TEST CODE
 */
router.get('/home', function(req, res){
        console.log("GET home");
        res
            .status(200)
            .sendFile('/views/mainpage/index.html', { root: "./"});
    });

module.exports = router;

