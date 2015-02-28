'use strict';

/**
 * @ngdoc function
 * @name jwtexperimentApp.controller:JobsCtrl
 * @description
 * # JobsCtrl
 * Controller of the jwtexperimentApp
 */
angular.module('jwtexperimentApp')
  .controller('JobsCtrl', function ($scope) {
    $scope.jobs = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
