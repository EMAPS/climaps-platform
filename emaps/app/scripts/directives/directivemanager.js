'use strict';

/**
 * @ngdoc directive
 * @name emapsApp.directive:directiveManager
 * @description
 * # directiveManager
 */
angular.module('emapsApp')
  .directive('directiveManager', function ($compile) {
    return {
      restrict: 'A',
      replace: true,
      link: function postLink(scope, element, attrs) {
      	var directiveName = attrs.directiveName;
      	var directiveData = attrs.directiveData;
      	var html = '<div directive-data="' + directiveData + '"' + directiveName + '></div>';
	      var e = angular.element(html);
	      element.append(e);
	      $compile(e)(scope);
      }
    };
  });
