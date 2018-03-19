var express = require('express');
var expressValidator = require('express-validator');
var router = express.Router();
const bcrypt = require('bcryptjs');
router.use(expressValidator());
let User = require('../models/user');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('register');
});

router.post('/', function(req, res, next) {
    const name = req.body.name;
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    const password2 = req.body.password2;

    req.checkBody('name', 'Name is required').notEmpty();
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('email', 'Please enter a valid email').isEmail();
    req.checkBody('username', 'Username is required').notEmpty();
    req.checkBody('password', 'Password is required').notEmpty();
    req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

    let errors = req.validationErrors();

    if(errors) {
        res.render('register', {
            errors:errors
        });
    } else {
        let newUser = new User( {
            name: name,
            email: email,
            username: username,
            password: password
        });

        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(newUser.password, salt, function(err, hash) {
                if(err) {
                    console.log(err);
                }
                newUser.password = hash;
                newUser.save(function(err) {
                    if(err) {
                        return;
                    } else {
                        req.flash('success', 'You are now registered and can log in');
                        res.redirect('/login');
                    }
                })
            });
        });
    }
    
});

module.exports = router;
