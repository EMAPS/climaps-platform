'use strict';

/**
 * @ngdoc directive
 * @name emapsApp.directive:imageManager
 * @description
 * # imageManager
 */
angular.module('emapsApp')
  .directive('imageManager', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the imageManager directive');
      }
    };
  });
