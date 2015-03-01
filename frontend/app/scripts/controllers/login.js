(function(module) {
  'use strict';

  var LoginCtrl = function ($scope, $http, alert, authToken, API_URL) {
    $scope.submit = function() {
      var url = API_URL + 'login';
      var user = {
        email: $scope.email,
        password: $scope.password
      };

      $http.post(url, user)
      .success(function(res) {
        alert('success', 'Welcome', 'Thanks for coming back ' + res.user.email + '!');
        authToken.setToken(res.token);
      })
      .error(function(err) {
        alert('warning', 'Something went wrong :(', err.message);
      });
    };
  };

  module.controller('LoginCtrl', LoginCtrl);

}(angular.module('jwtexperimentApp')));
