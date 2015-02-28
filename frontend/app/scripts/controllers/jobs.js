'use strict';

/**
 * @ngdoc function
 * @name jwtexperimentApp.controller:JobsCtrl
 * @description
 * # JobsCtrl
 * Controller of the jwtexperimentApp
 */
angular.module('jwtexperimentApp')
.controller('JobsCtrl', function (API_URL, $scope, $http, alert) {
  $http.get(API_URL + 'jobs')
    .success(function(jobs) {
      $scope.jobs = jobs;
    }) .error(function(err) {
      alert('warning', 'Unable to get jobs', err.message);
    });
});
