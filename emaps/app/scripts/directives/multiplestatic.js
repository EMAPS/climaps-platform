'use strict';

/**
 * @ngdoc directive
 * @name emapsApp.directive:multiplestatic
 * @description
 * # multiplestatic
 */
angular.module('emapsApp')
  .directive('multiplestatic', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the multiplestatic directive');
      }
    };
  });
