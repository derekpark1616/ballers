var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    req.logout();
    req.flash('success', 'You have been logged out');
    res.redirect('/login');
});


module.exports = router;