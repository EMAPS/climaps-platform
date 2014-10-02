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

        var container = d3.select(element[0])
                          .append("div")
                          .attr("class", "container")
                          .append("div")
                          .attr("class", "row")
                          .append("div")
                          .attr("class", "col-md-12");

          var ext = JSON.parse(attrs.directiveData)[0].url.split('.');
          ext = ext[ext.length - 1].toLowerCase();

          //find a better way to find imgs
          if(ext === 'jpg' || ext === 'png'){
           container.append('img')
              .attr('src', JSON.parse(attrs.directiveData)[0].url);
            return;
          }

          fileService.getFile(JSON.parse(attrs.directiveData)[0].url).then(
	          function(data){
	              container.html(data);
	          	},
	          function(error){
	              var txt = error;
	              container.html(txt);
	          	}
          );
        }
    };
  });
