(function (module) {
  'use strict';

  var appConfig = function($urlRouterProvider, $stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: '/views/main.html'
      })

      .state('register', {
        url: '/register',
        templateUrl: '/views/register.html',
        controller: 'RegisterCtrl'
      })

      .state('logout', {
        url: '/logout',
        controller: 'LogoutCtrl'
      });

    $urlRouterProvider.otherwise('/');
  };

  module.config(appConfig);

}(angular.module('jwtexperimentApp')));
