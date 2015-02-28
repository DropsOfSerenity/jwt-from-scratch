(function(module) {
  'use strict';

  var RegisterCtrl = function ($scope, $http, alert) {
    $scope.submit = function() {
      var url = 'http://localhost:3000/register';
      var user = {name: 'Bob'};

      $http.post(url, user)
      .success(function(res) {
        alert('success', 'OK', 'You are now registered.');
      })
      .error(function(err) {
        alert('warning', 'Oops!', 'Could not register.');
      });
    };
  };

  module.controller('RegisterCtrl', RegisterCtrl);

}(angular.module('jwtexperimentApp')));
