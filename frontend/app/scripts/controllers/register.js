(function(module) {
  'use strict';

  var RegisterCtrl = function ($scope, alert, $auth) {
    $scope.submit = function() {
      $auth.signup({
        email: $scope.email,
        password: $scope.password
      }).then(function(res) {
        alert('success', 'Account Created!', 'Welcome, ' + res.data.user.email + '!');
      }).catch(function(err) {
        alert('warning', 'Oops!', err.message);
      });
    };
  };

  module.controller('RegisterCtrl', RegisterCtrl);

}(angular.module('jwtexperimentApp')));
