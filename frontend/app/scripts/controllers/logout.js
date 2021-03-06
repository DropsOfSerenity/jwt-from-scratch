'use strict';

/**
 * @ngdoc function
 * @name jwtexperimentApp.controller:LogoutCtrl
 * @description
 * # LogoutCtrl
 * Controller of the jwtexperimentApp
 */
angular.module('jwtexperimentApp')
  .controller('LogoutCtrl', function ($state, $auth) {
    $auth.logout();
    $state.go('main');
  });
