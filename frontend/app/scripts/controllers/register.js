(function(module) {
  'use strict';

  var RegisterCtrl = function ($scope, $http, alert, authToken, API_URL) {
    $scope.submit = function() {
      var url = API_URL + 'register';
      var user = {
        email: $scope.email,
        password: $scope.password
      };

      $http.post(url, user)
      .success(function(res) {
        alert('success', 'Account Created!', 'Welcome, ' + res.user.email + '!');
        authToken.setToken(res.token);
      })
      .error(function(err) {
        alert('warning', 'Oops!', 'Could not register.');
      });
    };
  };

  module.controller('RegisterCtrl', RegisterCtrl);

}(angular.module('jwtexperimentApp')));
