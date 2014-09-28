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

          var ext = attrs.directiveData.split('.');

          ext = ext[ext.length - 1].toLowerCase();

          //find a better way to find imgs
          if(ext === 'jpg' || ext === 'png'){
            d3.select(element[0]).append('img')
              .attr('src', attrs.directiveData);
            return;
          }

          fileService.getFile(attrs.directiveData).then(
	          function(data){
	              element.html(data);
	          	},
	          function(error){
	              var txt = error;
	              element.html(txt);
	          	}
          );
        }
    };
  });
