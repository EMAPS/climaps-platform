'use strict';

/**
 * @ngdoc directive
 * @name emapsApp.directive:narrative6Map30
 * @description
 * # narrative6Map30
 */
angular.module('emapsApp')
  .directive('narrative6Map30', function (fileService) {
    return {
        replace: false,
        restrict: 'A',
        templateUrl:'views/multiplestatic.html',
      link: function postLink(scope, element, attrs) {

          scope.indexes = JSON.parse(attrs.directiveData);
          scope.index = scope.indexes[0];
          scope.container = d3.select(element[0]).select("#multiple-container");



          scope.$watch('index', function(newValue, oldValue) {
              //if(newValue !== oldValue){

              fileService.getFile(newValue.url).then(
                  function (data) {

                      scope.container.html(data);

                      var streamPath = scope.container.select("#interactive").selectAll("path")

                      streamPath.on("mouseover", function () {

                          scope.container.select("#interactive").selectAll("path").transition().duration(300).style("opacity", 0.3);
                          d3.select(this).transition().duration(300).style("opacity", 1);
                      })


                      streamPath.on("mouseout", function () {
                          scope.container.select("#interactive").selectAll("path").transition().duration(300).style("opacity", 0.7);
                      })

                  })
          })

      }
    };
  });
