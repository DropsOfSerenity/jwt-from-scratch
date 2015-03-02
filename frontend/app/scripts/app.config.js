(function (module) {
  'use strict';

  var appConfig = function($urlRouterProvider, $stateProvider, $httpProvider, $authProvider, API_URL) {
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

      .state('login', {
        url: '/login',
        templateUrl: '/views/login.html',
        controller: 'LoginCtrl'
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

    $authProvider.google({
      url: API_URL + 'auth/google',
      clientId: '705480244411-hhcs39ogj3mlfilfbcfgtpjscq93fvpt.apps.googleusercontent.com'
    });

    $authProvider.facebook({
      url: API_URL + 'auth/facebook',
      clientId: '1386201625029116'
    });

    $authProvider.loginUrl = API_URL + 'login';
    $authProvider.signupUrl = API_URL + 'register';

    $httpProvider.interceptors.push('authInterceptor');
  };

  module.config(appConfig);
  module.constant('API_URL', 'http://localhost:3000/');
  // module.run(appRun);

}(angular.module('jwtexperimentApp')));
