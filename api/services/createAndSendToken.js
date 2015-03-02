var moment = require('moment');
var jwt = require('jwt-simple');

module.exports = function(user, res) {
  var payload = {
    sub: user.id,
    exp: moment().add(10, 'days').unix()
  };

  var token = jwt.encode(payload, 'shhhhhh...');

  res.status(200).send({
    user: user.toJSON(),
    token: token
  });
};
