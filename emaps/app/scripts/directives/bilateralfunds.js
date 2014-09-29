'use strict';

/**
 * @ngdoc directive
 * @name emapsApp.directive:bilateralFunds
 * @description
 * # bilateralFunds
 */
angular.module('emapsApp')
  .directive('bilateralFunds', function (fileService, $compile) {
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

        fileService.getFile(JSON.parse(attrs.directiveData)[0]).then(
            function(data){
              container.html(data);

              var rects = container.select('#Layer_2').selectAll('rect');


              rects
                .attr('tooltip', function(){
                  var title = d3.select(this).select('title').text();
                  return  title;
                })
                .attr('tooltip-append-to-body', 'true')
                .attr('tooltip-placement', 'left');


              rects.on('mouseover', function(){
					var title = d3.select(this).select('title').text();

    					rects
    						.attr('opacity', function(){
    						var title2 = d3.select(this).select('title').text();
    						if(title === title2){
    							return 1 ;
    						}else{
    							return 0.3;
    						}
    					});
    				});

    			rects.on('mouseout', function(){
    				rects
    					.attr('opacity', function(){
    						return 1;
    				});
    			});

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
