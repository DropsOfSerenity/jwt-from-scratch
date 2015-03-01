'use strict';

angular.module('jwtexperimentApp')
  .service('auth', function($http, $state, API_URL, authToken, $window) {

    var GOOGLE_OAUTH_URL = 'https://accounts.google.com/o/oauth2/auth?';

    function authSuccessful(res) {
      authToken.setToken(res.token);
      $state.go('main');
    }

    this.login = function(email, password) {
      var url = API_URL + 'login';
      return $http.post(url, {
          email: email,
          password: password
        })
        .success(authSuccessful);
    };

    this.register = function(email, password) {
      var url = API_URL + 'register';
      return $http.post(url, {
        email: email,
        password: password
      }).success(authSuccessful);
    };

    var urlBuilder = [];
    var GOOGLE_CLIENT_ID = '705480244411-hhcs39ogj3mlfilfbcfgtpjscq93fvpt.apps.googleusercontent.com';
    urlBuilder.push(
      'response_type=code',
      'client_id=' + GOOGLE_CLIENT_ID,
      'redirect_uri=' + window.location.origin,
      'scope=profile email');

    this.googleAuth = function() {
      var url = GOOGLE_OAUTH_URL + urlBuilder.join('&');
      var left = ($window.outerWidth - 500) / 2;
      var top = ($window.outerHeight - 500) / 2.5;
      var options = 'width=500, height=500, left=' + left + ', top=' + top;

      var popup = $window.open(url, '', options);
      $window.focus();

      $window.addEventListener('message', function(event) {
        if(event.origin === $window.location.origin) {
          popup.close();
          var code = event.data;
          $http.post(API_URL + 'auth/google', {
            code: code,
            clientId: GOOGLE_CLIENT_ID,
            redirectUri: $window.location.origin
          });
        }
      });
    };

    return this;
  });
