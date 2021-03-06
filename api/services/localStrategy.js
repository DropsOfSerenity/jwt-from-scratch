'use strict';

var User = require('../models/User.js');
var LocalStrategy = require('passport-local').Strategy;

var strategyOptions = {
  usernameField: 'email'
};

exports.login = new LocalStrategy(strategyOptions, function(email, password, done) {
  var searchUser = {email: email};
  User.findOne(searchUser, function(err, user) {
    if(err) return done(err);
    if(!user) return done(null, false, {
      message: 'Wrong email/password'
    });

    user.comparePasswords(password, function(err, isMatch) {
      if(err) return done(err);
      if(!isMatch) {
        return done(null, false, {
          message: 'Wrong email/password'
        });
      }
      return done(null, user);
    });
  });
});

exports.signup = new LocalStrategy(strategyOptions, function(email, password, done) {
  var searchUser = {email: email};
  User.findOne(searchUser, function(err, user) {
    if(err) return done(err);
    if(user) return done(null, false, {
      message: 'Email already taken'
    });
    var newUser = new User({
      email: email,
      password: password
    });

    newUser.save(function(err) {
      if(err) return done(err);
      done(null, newUser);
    });
  });
});
