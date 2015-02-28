(function(module) {
  'use strict';

  var RegisterCtrl = function ($scope, $http) {
    $scope.submit = function() {
      var url = '/';
      var user = {};

      $http.post(url, user)
      .success(function(res) {
        console.log('success');
      })
      .error(function(err) {
        console.log('error');
      });
    };
  };

  module.controller('RegisterCtrl', RegisterCtrl);

}(angular.module('jwtexperimentApp')));
