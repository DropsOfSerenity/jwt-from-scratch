var crypto = require('crypto');

exports.encode = function(payload, secret) {
  // HS256 algorithm
  var algorithm = 'HS256';

  var header = {
    typ: 'JWT',
    alg: algorithm
  };

  // header.payload.secret all base64 encoded compose the jwt
  var jwt = base64Encode(JSON.stringify(header)) + '.' + base64Encode(JSON.stringify(payload));
  return jwt + '.' + sign(jwt, secret);
};

function sign(str, key) {
  return crypto.createHmac('sha256', key).update(str).digest('base64');
}

function base64Encode(str) {
  return new Buffer(str).toString('base64');
}
