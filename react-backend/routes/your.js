var express = require('express');
var router = express.Router();
let League = require('../models/league');
let User = require('../models/user');


//get list of all of the users leagues
router.get('/leagues', function(req, res, next) {
    console.log('leagues');
    if(!req.user){
        console.log("not logged in");
        req.flash('error', 'You must be logged in!');
        res.redirect('/login');
    } else {
        League.find({'_id': { $in: req.user.inLeagues}}, function(err, leagues) {
            if(err){
                console.log(err);
            } else {
                res.render('leagues', {
                    title: 'Your Leagues',
                    leagues: leagues
                });
            }
            
        });
    }
});

module.exports = router;