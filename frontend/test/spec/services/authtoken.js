'use strict';

describe('Service: authToken', function () {

  // load the service's module
  beforeEach(module('jwtexperimentApp'));

  // instantiate service
  var authToken, $window;
  beforeEach(inject(function (_authToken_, _$window_) {
    authToken = _authToken_;
    $window = _$window_;
  }));

  it('should be authenticated if token is set in storage', function () {
    $window.localStorage.setItem('userToken', 'testtoken');
    expect(authToken.isAuthenticated()).toBe(true);
  });

  it('should get token from localstorage if set', function() {
    $window.localStorage.setItem('userToken', 'testtoken');
    expect(authToken.getToken()).toBe('testtoken');
  });
});
