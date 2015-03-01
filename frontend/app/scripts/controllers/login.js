(function(module) {
  'use strict';

  var LoginCtrl = function ($scope, alert, auth) {
    $scope.submit = function() {
      auth.login($scope.email, $scope.password)
      .success(function(res) {
        alert('success', 'Welcome', 'Thanks for coming back ' + res.user.email + '!');
      })
      .error(function(err) {
        alert('warning', 'Something went wrong :(', err.message);
      });
    };

    $scope.google = function() {
      auth.googleAuth().then();
    };
  };

  module.controller('LoginCtrl', LoginCtrl);

}(angular.module('jwtexperimentApp')));
