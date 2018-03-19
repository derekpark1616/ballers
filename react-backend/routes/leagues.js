var express = require('express');
var router = express.Router();
var expressValidator = require('express-validator');
router.use(expressValidator());
let League = require('../models/league');
let User = require('../models/user');

/* GET list of leagues page. */
router.get('/', function(req, res, next) {
    League.find({}, function(err, leagues) {
        if(err) {
            console.log(err);
        } else {
            res.render('leagues', {
                title: 'Leagues',
                leagues: leagues
            });
        }
    });
});

//creating leagues
router.get('/create', function(req, res, next) {
    if(!req.user){
        console.log("not logged in");
        let errors = {
            0: {
                msg:"You must be logged in to create a league"
            }
        };
        res.render('login', {
            errors:errors
        });
    } else {
        res.render('create');
    }
    
});

router.post('/create', function(req, res, next) {
    const name = req.body.name;
    const sport = req.body.sport;
    const start = req.body.start;
    const end = req.body.end;
    const location = req.body.location;

    req.checkBody('name', 'Please name your league').notEmpty();
    req.checkBody('start', 'A start date is required').notEmpty();
    req.checkBody('location', 'A location is required').notEmpty();

    let errors = req.validationErrors();

    if(errors) {
        res.render('create', {
            errors:errors
        });
    } else {
        let newLeague = new League( {
            name: name,
            sport: sport,
            start: start,
            end: end,
            location: location,
            creator: req.user._id
        });

        newLeague.save(function(err) {
            if(err) {
                return;
            } else {
                req.flash('success', 'Your League: ' +name+ ' has been created');
                res.redirect('/');
            }
        });
    }
});

//Edit League
router.get('/edit/:id', function(req, res){
    League.findById(req.params.id, function(err, league){
        console.log(league);
        User.findById(league.creator, function(err, user){
            res.render('editLeague', {
                league: league,
                creator: user.name
            });
        });
    });
});

router.post('/edit/:id', function(req, res){
    let league = {};
    league.name =req.body.name;
    league.sport = req.body.sport;
    league.start = req.body.start;
    league.end = req.body.end;
    league.location = req.body.location;
  
    let query = {_id:req.params.id}
  
    League.update(query, league, function(err){
      if(err){
        console.log(err);
        return;
      } else {
        req.flash('success', 'League Updated');
        res.redirect('/');
      }
    });
});

//delete League
router.delete('/:id', function(req, res){
    if(!req.user){
        console.log("not logged in");
        res.status(500).send();
    }
  
    let query = {_id:req.params.id}
  
    League.findById(req.params.id, function(err, league){
        if(league.creator != req.user._id){
            console.log("not creator");
            res.status(500).send();
        } else {
            League.remove(query, function(err){
                if(err){
                    console.log(err);
                }
                res.send('Success');
            });
        }
    });
});

//view a single league
router.get('/:id', function(req, res){
    League.findById(req.params.id, function(err, league){
        User.findById(league.creator, function(err, user){
            res.render('league', {
                league: league,
                creator: user.name
            });
        });
    });
});

module.exports = router;
