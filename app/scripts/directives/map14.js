'use strict';

/**
 * @ngdoc directive
 * @name emapsApp.directive:map14
 * @description
 * # map14
 */
angular.module('emapsApp')
  .directive('map14', function (fileService,$compile) {
    return {
        replace: false,
        restrict: 'A',
        templateUrl: 'views/map14.html',
        link: function postLink(scope, element, attrs) {


            var matrix;
            var data;
            var container = d3.select(element[0]).select("#matrix14-container");
            var changeSorting = function() {

                var s = $(this).attr("data");
                var cl = $(this).attr("class");
                var o = null;

                if(cl.indexOf("sort")>-1 || cl.indexOf("s-up")>-1) o = "descending";
                else if (cl.indexOf("s-down")>-1) o = "ascending";

                matrix
                    .sortFields([s])
                    .sortOrder(o);

                container.datum(data).call(matrix);
                $compile(angular.element(element.find('svg')))(scope);
                container.selectAll(".xlabel").on("click", changeSorting);

            }

            fileService.getFile(JSON.parse(attrs.directiveData)[0].url).then(
                function (rows) {


                     data = d3.csv.parse(rows);

                     matrix = emaps.matrix()
                        .width(element.find("#matrix14-container").width())
                        .height(800)
                        .yField("item")
                        .xField(["ALL","CCVI","CVM","GAIN","CRI","CCPI","DICE","HDI","VASS"])
                        .normalization("whole")
                        .colorField(null)
                        .selColor("B0CFCD")
                        //.sortFields(["DICE"])
                        .matrixStyle("bars")
                        .colorArray("#286275")


                    container.datum(data).call(matrix);
                    $compile(angular.element(element.find('svg')))(scope);


                    container.selectAll(".xlabel").on("click", changeSorting)


                })
        }
    }
  });
