'use strict';

var _ = require('underscore');
var fs = require('fs');
var config = require('./config.js');
var jwt = require('jwt-simple');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

var model = {
  verifyUrl: 'http://localhost:3000/auth/verify/verifyEmail?token=',
  title: 'jwtExperiment',
  subTitle: 'Thanks for signing up',
  body: 'Please verify your email address by clicking the link below.'
};

exports.send = function(email, res) {
  var payload = {
    sub: email
  };

  var token = jwt.encode(payload, config.EMAIL_SECRET);

  var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'ambientrevolution@gmail.com',
      pass: config.GMAIL_PASS
    }
  });

  var mailOptions = {
    from: 'Justin <AmbientRevolution@gmail.com>',
    to: email,
    subject: 'jwtexperiment Account Verification',
    html: getHtml(token)
  }

  transporter.sendMail(mailOptions, function(err, info) {
    console.log(err);
    if(err) return res.status(500, err);
    console.log('email sent ', info.response);
  });
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
