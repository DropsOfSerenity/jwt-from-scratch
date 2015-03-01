'use strict';

var bcrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  email: String,
  password: String,
  googleId: String,
  displayName: String
});

UserSchema.methods.toJSON = function() {
  var user = this.toObject();
  delete user.password;

  return user;
};

UserSchema.methods.comparePasswords = function(password, cb) {
  bcrypt.compare(password, this.password, cb);
};

// middleware pre-save
UserSchema.pre('save', function(next) {
  var user = this;

  if(!user.isModified('password')) return next();

  bcrypt.genSalt(10, function(err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) return next(err);

      user.password = hash;
      next();
    });
  });
});

module.exports = mongoose.model('User', UserSchema);
