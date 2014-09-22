'use strict';

/**
 * @ngdoc directive
 * @name emapsApp.directive:scatterplot
 * @description
 * # scatterplot
 */
angular.module('emapsApp')
  .directive('scatterplot', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the scatterplot directive');
      }
    };
  });
