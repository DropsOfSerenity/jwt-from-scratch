'use strict';

var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var User = require('./models/User.js');
var jwt = require('jwt-simple');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var request = require('request');
var moment = require('moment');

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

var strategyOptions = {
  usernameField: 'email'
};

var loginStrategy = new LocalStrategy(strategyOptions, function(email, password, done) {
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

var signupStrategy = new LocalStrategy(strategyOptions, function(email, password, done) {
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

passport.use('local-login', loginStrategy);
passport.use('local-register', signupStrategy);

app.post('/register', passport.authenticate('local-register'), function(req, res) {
  createAndSendToken(req.user, res);
});

app.post('/login', passport.authenticate('local-login'), function(req, res) {
  createAndSendToken(req.user, res);
});

function createAndSendToken(user, res) {
  var payload = {
    sub: user.id,
    exp: moment().add(10, 'days').unix()
  };

  var token = jwt.encode(payload, 'shhhhhh...');

  res.status(200).send({
    user: user.toJSON(),
    token: token
  });
}

var jobs = [
  'Cook',
  'SuperHero',
  'Toast Inspector'
];

app.get('/jobs', function(req, res) {
  if (!req.headers.authorization) {
    return res.status(401).send({message: 'You are not authorized'});
  }

  var token = req.headers.authorization.split(' ')[1];
  var payload = jwt.decode(token, 'shhhhhh...');

  if (!payload.sub) {
    return res.status(401).send({
      message: 'You are not authorized'
    });
  }

  res.json(jobs);
});

app.post('/auth/google', function(req, res, next) {
  var url = 'https://accounts.google.com/o/oauth2/token';
  var apiUrl = 'https://www.googleapis.com/plus/v1/people/me/openIdConnect';
  var params = {
    code: req.body.code,
    client_id: req.body.clientId,
    redirect_uri: req.body.redirectUri,
    grant_type: 'authorization_code',
    client_secret: 'ZKudk3Vx85nlaEATuVV9u9wP'
  };

  request.post(url, {
    json: true,
    form: params
  }, function(err, response, token) {
    var accessToken = token.access_token;
    var headers = {
      Authorization: 'Bearer ' + accessToken
    };

    request.get({
      url: apiUrl,
      headers: headers,
      json: true
    }, function(err, response, profile) {
      User.findOne({
        googleId: profile.sub
      }, function(err, foundUser) {
        if (foundUser) return createAndSendToken(foundUser, res);

        // no user found with that google id create one
        var newUser = new User();
        newUser.googleId = profile.sub;
        newUser.displayName = profile.name;
        newUser.save(function(err) {
          if(err) return next(err);
          createAndSendToken(newUser, res);
        });
      });
    });
  });
});

mongoose.connect('mongodb://localhost/jwtfromscratch');

var server = app.listen(3000, function() {
  console.log('api listening on ', server.address().port);
});
