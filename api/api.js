'use strict';

var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passport = require('passport');
var facebookAuth = require('./services/facebookAuth.js');
var googleAuth = require('./services/googleAuth.js');
var createAndSendToken = require('./services/createAndSendToken.js');
var localStrategy = require('./services/localStrategy.js');
var jobs = require('./services/jobs.js');
var emailVerification = require('./services/emailVerification.js');

var app = express();
app.use(bodyParser.json());
app.use(passport.initialize());
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

// custom middleware to enable CORS
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Origin', 'http://localhost:9000');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

/**
 * PASSPORT STRATEGIES
 */
passport.use('local-login', localStrategy.login);
passport.use('local-register', localStrategy.signup);

/**
 * AUTHENTICATION
 */
app.post('/register', passport.authenticate('local-register'), function(req, res) {
  emailVerification.send(req.user.email, res);
  createAndSendToken(req.user, res);
});
app.post('/login', passport.authenticate('local-login'), function(req, res) {
  createAndSendToken(req.user, res);
});
app.post('/auth/facebook', facebookAuth);
app.post('/auth/google', googleAuth);

/**
 * PROTECTED RESOURCES
 */
app.get('/jobs', jobs);

mongoose.connect('mongodb://localhost/jwtfromscratch');

var server = app.listen(3000, function() {
  console.log('api listening on ', server.address().port);
});
