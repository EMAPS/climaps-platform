'use strict';

/**
 * @ngdoc directive
 * @name emapsApp.directive:bilateralFunds
 * @description
 * # bilateralFunds
 */
angular.module('emapsApp')
  .directive('bilateralFunds', function (fileService) {
    return {
      replace: false,
      restrict: 'A',
      link: function postLink(scope, element, attrs) {
        fileService.getFile(attrs.directiveData).then(
            function(data){
              element.html(data)

              var rects = d3.select(element[0]).select("#Layer_2").selectAll("rect")

              rects.each(function(){
             		//$(this).tooltip('destroy')
             		var title = d3.select(this).select("title").text()
             		$(this).tooltip({title:title, placement:"left", container: 'body'})
          		})

              rects.on("mouseover", function(){
					var title = d3.select(this).select("title").text()
					rects
						//.transition().duration(200)
						.attr("opacity", function(){
						var title2 = d3.select(this).select("title").text()
						if(title == title2){
							return 1 
						}else{
							return 0.3
						}
					})
				})

			rects.on("mouseout", function(){
				rects
					//.transition().duration(200)
					.attr("opacity", function(){
						return 1
				})
			})
            },
        function(error){
              var txt = error
              element.html(txt)
            }
          );
      }
    }
  });
