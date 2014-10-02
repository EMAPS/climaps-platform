'use strict';

/**
 * @ngdoc directive
 * @name emapsApp.directive:mentions
 * @description
 * # mentions
 */
angular.module('emapsApp')
  .directive('mentions', function (fileService, $compile) {
    return {
      replace: false,
      restrict: 'A',
      link: function postLink(scope, element, attrs) {

            var container = d3.select(element[0])
                      .append("div")
                      .attr("class", "container")
                      .append("div")
                      .attr("class", "row")
                      .append("div")
                      .attr("class", "col-md-12");

            fileService.getFile(JSON.parse(attrs.directiveData)[0].url).then(
            	function(data){

              		container.html(data);

              		var circles = d3.select(element[0]).select('#interactive').selectAll('g');

              		circles.attr('tooltip', function(){
                  var title = d3.select(this).select('title').text();
                  return  title;
                })
                .attr('tooltip-append-to-body', 'true')
                .attr('tooltip-placement', 'top');


              $compile(angular.element(element.find('svg')))(scope);

          		},
        		function(error){
              		var txt = error;
              		element.html(txt);
            	}
            );
      }
    };
  });
