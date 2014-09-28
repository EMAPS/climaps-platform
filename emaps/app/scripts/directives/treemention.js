'use strict';

/**
 * @ngdoc directive
 * @name emapsApp.directive:treemention
 * @description
 * # treemention
 */
angular.module('emapsApp')
  .directive('treemention', function (fileService, $compile) {
    return {
      replace: false,
      restrict: 'A',
      link: function postLink(scope, element, attrs) {
           fileService.getFile(attrs.directiveData).then(
            function(data){
              element.html(data);

              var rects = d3.select(element[0]).select("#interactive").selectAll("rect");

              rects
                .attr("tooltip", function(){
                  var title = d3.select(this).select("title").text();
                  return  title;
                })
                .attr("tooltip-append-to-body", "true")
                .attr("tooltip-placement", "left")

              $compile(angular.element(element.find("svg")))(scope);
            },
            function(error){
            	var txt = error;
            	element.html(txt);
            }
            );
      }
    };
  });
