'use strict';

/**
 * @ngdoc directive
 * @name emapsApp.directive:static
 * @description
 * # static
 */
angular.module('emapsApp')
  .directive('static', function (fileService) {
    return {
      replace: false,
      restrict: 'A',
      link: function postLink(scope, element, attrs) {

          fileService.getFile(attrs.directiveData).then(
	          function(data){
	              element.html(data)
	          	},
	          function(error){
	              var txt = error
	              element.html(txt)
	          	}
          );
        }
    }
  });
