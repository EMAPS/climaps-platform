'use strict';

/**
 * @ngdoc directive
 * @name emapsApp.directive:dna
 * @description
 * # dna
 */
angular.module('emapsApp')
  .directive('dna', function (fileService) {
    return {
      replace: false,
      restrict: 'A',
      link: function postLink(scope, element, attrs) {
        fileService.getFile(attrs.directiveData).then(
            function(data){
              	element.html(data);
				var rects = d3.select(element[0]).select('#interactive').selectAll('rect')
				.attr('col-val',function(){
					var st = d3.select(this).attr('fill');
					if (st === undefined) {return 0;}
					else {return st;}
				})

				rects.each(function(){
             		var title = d3.select(this).select('title').text();
             		$(this).tooltip({title:title, placement:'left', container: 'body'});
          		})

				rects.on('mouseover', function(){
					var title = d3.select(this).select('title').text();

					rects.transition().duration(200).style('fill', function(){
						var title2 = d3.select(this).select('title').text()
						if(title !== title2){
							return d3.select(this).attr('col-val');
						}
						else {return '#FF5A52';}
					})
					.style('stroke', function(){
						var title2 = d3.select(this).select('title').text();
						if(title !== title2){
							return 'none';
						}
						else {return '#FF5A52';}
					});
				});

				rects.on('mouseout', function(){
					rects.transition().duration(200).style('fill', function(){
							return d3.select(this).attr('col-val');
					})
					.style('stroke', function(){
						return 'none';
					});
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
