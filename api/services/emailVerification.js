'use strict';

var _ = require('underscore');
var fs = require('fs');
var config = require('./config.js');
var jwt = require('jwt-simple');

var model = {
  verifyUrl: 'http://localhost:3000/auth/verify/verifyEmail?token=',
  title: 'jwtExperiment',
  subTitle: 'Thanks for signing up',
  body: 'Please verify your email address by clicking the link below.'
}

exports.send = function(email) {
  var payload = {
    sub: email
  };

  var token = jwt.encode(payload, config.EMAIL_SECRET);

  console.log(getHtml(token));
};

function getHtml(token) {
  var path = './views/emailVerification.html';
  var html = fs.readFileSync(path, 'utf8');

  var template = _.template(html);

  model.verifyUrl += token;
  return template(model);
}

_.templateSettings = {
  interpolate: /\{\{(.+?)\}\}/g
};
