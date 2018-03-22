var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
    title: 'Ballers',
    background: '/images/6man.jpg' 
  });
});

module.exports = router;
