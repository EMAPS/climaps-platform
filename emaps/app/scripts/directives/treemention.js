'use strict';

/**
 * @ngdoc directive
 * @name emapsApp.directive:treemention
 * @description
 * # treemention
 */
angular.module('emapsApp')
  .directive('treemention', function (fileService) {
    return {
      replace: false,
      restrict: 'A',
      link: function postLink(scope, element, attrs) {
           fileService.getFile(attrs.directiveData).then(
            function(data){
              element.html(data)

              var rects = d3.select(element[0]).select("#interactive").selectAll("rect")

              rects.each(function(){
             		var title = d3.select(this).select("title").text()
             		$(this).tooltip({title:title, placement:"left", container: 'body'})
          		})
            },
            function(error){
            	var txt = error
            	element.html(txt)
            }
            )
      }
    };
  });
