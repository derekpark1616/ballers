var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

router.get('/', function(req, res, next) {
  res.render('login');
});

router.post('/', function(req, res, next){
  passport.authenticate('local', { 
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  })(req, res, next);
})

module.exports = router;
