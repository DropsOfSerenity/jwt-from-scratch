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

    $httpProvider.interceptors.push('authInterceptor');
  };

  var appRun = function($window) {
    var params = $window.location.search.substring(1);
    if (params && $window.opener && $window.opener.location.origin === $window.location.origin) {
      var pair = params.split('=');
      var code = decodeURIComponent(pair[1]);

      $window.opener.postMessage(code, $window.location.origin)
    }
  };

  module.config(appConfig);
  module.constant('API_URL', 'http://localhost:3000/');
  module.run(appRun);

}(angular.module('jwtexperimentApp')));
