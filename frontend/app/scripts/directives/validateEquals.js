(function(module) {
  'use strict';

  var validateEquals = function() {
    return {
      require: 'ngModel',
      link: function(scope, elem, attrs, ngModelCtrl) {
        function validateEqual(value) {
          var valid = (value === scope.$eval(attrs.validateEquals));
          ngModelCtrl.$setValidity('equal', valid);
          return valid ? value : undefined;
        }
        ngModelCtrl.$parsers.push(validateEqual);
        ngModelCtrl.$formatters.push(validateEqual);

        scope.$watch(attrs.validateEquals, function() {
          ngModelCtrl.$setViewValue(ngModelCtrl.$viewValue);
        });
      }
    };
  };

  module.directive('validateEquals', validateEquals);

}(angular.module('jwtexperimentApp')));
