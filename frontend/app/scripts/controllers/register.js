(function(module) {
  'use strict';

  var RegisterCtrl = function ($scope, alert, auth) {
    $scope.submit = function() {
      auth.register($scope.email, $scope.password)
      .success(function(res) {
        alert('success', 'Account Created!', 'Welcome, ' + res.user.email + '!');
      })
      .error(function(err) {
        alert('warning', 'Oops!', 'Could not register.');
      });
    };
  };

  module.controller('RegisterCtrl', RegisterCtrl);

}(angular.module('jwtexperimentApp')));
