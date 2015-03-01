'use strict';

angular.module('jwtexperimentApp')
  .service('auth', function ($http, $state, API_URL, authToken) {

      this.login = function(email, password) {
        var url = API_URL + 'login';
        return $http.post(url, {email: email, password: password})
        .success(authSuccessful);
      };

      this.register = function(email, password) {
        var url = API_URL + 'register';
        return $http.post(url, {
          email: email,
          password: password
        }).success(authSuccessful);
      };

      function authSuccessful(res) {
        authToken.setToken(res.token);
        $state.go('main');
      }

      return this;
  });
