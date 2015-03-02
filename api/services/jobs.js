'use strict';

var jwt = require('jwt-simple');

var jobs = [
  'Cook',
  'SuperHero',
  'Toast Inspector'
];

module.exports = function(req, res) {
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
};
