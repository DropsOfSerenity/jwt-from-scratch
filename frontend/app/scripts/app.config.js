(function (module) {
  'use strict';

  var appConfig = function($urlRouterProvider, $stateProvider, $httpProvider) {
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

      .state('jobs', {
        url: '/jobs',
        templateUrl: '/views/jobs.html',
        controller: 'JobsCtrl'
      })

      .state('logout', {
        url: '/logout',
        controller: 'LogoutCtrl'
      });

    $urlRouterProvider.otherwise('/');

    $httpProvider.interceptors.push('authInterceptor');
  };

  module.config(appConfig);
  module.constant('API_URL', 'http://localhost:3000/');

}(angular.module('jwtexperimentApp')));
