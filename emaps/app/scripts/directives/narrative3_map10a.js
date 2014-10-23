'use strict';

/**
 * @ngdoc directive
 * @name emapsApp.directive:narrative3Map10a
 * @description
 * # narrative3Map10a
 */
angular.module('emapsApp')
  .directive('narrative3Map10a', function (fileService) {
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
              .attr("class", "col-md-12 single-container");

          fileService.getFile(JSON.parse(attrs.directiveData)[0].url).then(
              function(data) {

                  container.html(data);
                  var streamPath = container.select("#interactive").selectAll("path")

                  var streamGroup = container.select("#interactive").selectAll("g")


                  streamPath.on("mouseover", function () {

                      var parent = d3.select(this).node().parentNode

                      var id = d3.select(parent).attr("id")

                      streamGroup.transition().duration(200).attr("opacity", function () {
                          var id2 = d3.select(this).attr("id")
                          if (id2) {
                              if (id == id2) {
                                  return 1
                              } else {
                                  return 0.3
                              }
                          }
                      })
                  })

                  streamPath.on("mouseout", function () {
                      streamGroup.transition().duration(200).attr("opacity", function () {
                          var id2 = d3.select(this).attr("id")
                          if (id2) {
                              return 1
                          }
                      })
                  })

              })


      }
    };
  });
