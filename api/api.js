'use strict';

var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var User = require('./models/User.js');
var jwt = require('jwt-simple');

var app = express();
app.use(bodyParser.json());

// custom middleware to enable CORS
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.post('/register', function(req, res) {
  var user = req.body;
  var newUser = new User({
    email: user.email,
    password: user.password
  });

  newUser.save(function(err) {
    createToken(newUser, res);
  });
});

app.post('/login', function(req, res) {
  var reqUser = req.body;

  var searchUser = {
    email: reqUser.email
  };

  User.findOne(searchUser, function(err, user) {
    if(err) throw err;
    if(!user)
      return res.status(401).send({message: 'Wrong email/password'});

    user.comparePasswords(reqUser.password, function(err, isMatch) {
      if(err) throw err;
      if(!isMatch)
        return res.status(401).send({message: 'Wrong email/password'});
      createToken(user, res);
    });
  });
});

function createToken(user, res) {
  var payload = {
    sub: user.id
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

mongoose.connect('mongodb://localhost/jwtfromscratch');

var server = app.listen(3000, function() {
  console.log('api listening on ', server.address().port);
});
