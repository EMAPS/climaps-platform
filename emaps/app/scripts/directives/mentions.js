'use strict';

/**
 * @ngdoc directive
 * @name emapsApp.directive:mentions
 * @description
 * # mentions
 */
angular.module('emapsApp')
  .directive('mentions', function (fileService) {
    return {
      replace: false,
      restrict: 'A',
      link: function postLink(scope, element, attrs) {
            fileService.getFile(attrs.directiveData).then(
            	function(data){
              		element.html(data);
              		var circles = d3.select(element[0]).select('#interactive').selectAll('g');

              		circles.each(function(){
             			var title = d3.select(this).select('title').text();
             			$(this).tooltip({title:title, container: 'body'});
          			});
          		},
        		function(error){
              		var txt = error;
              		element.html(txt);
            	}
            );
      }
    };
  });
