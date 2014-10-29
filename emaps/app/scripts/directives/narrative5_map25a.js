'use strict';

/**
 * @ngdoc directive
 * @name emapsApp.directive:narrative5Map25a
 * @description
 * # narrative5Map25a
 */
angular.module('emapsApp')
  .directive('narrative5Map25a', function (fileService) {
    return {
        replace: false,
        restrict: 'A',
        templateUrl: 'views/narrative5_map25a.html',
        link: function postLink(scope, element, attrs) {


            var scat;
            var top5;
            scope.sel=null;
            var vals;
            var container = d3.select(element[0]).select("#scatter-container");
            var recipients = d3.select(element[0]).select(".top5");

           function updateTop5(){

                    var cur = top5.filter(function(d){
                        return d.Donor === scope.sel;
                    })[0]

                    recipients.selectAll(".rec").remove();

                    vals = d3.values(cur).slice(1,cur.length)
                    recipients.select("h2").text(cur.Donor)

                    recipients.selectAll(".rec").data(vals)
                        .enter().append("div")
                        .attr("class","rec")
                        .text(function(d) {return d})
            }

            fileService.getFile(JSON.parse(attrs.directiveData)[1].url).then(
                function (data) {
                    top5 = d3.csv.parse(data);

                })


            fileService.getFile(JSON.parse(attrs.directiveData)[0].url).then(
                function (rows) {


                    var data = d3.csv.parse(rows);

                    scat = emaps.scatterplot()
                        .width(element.find("#scatter-container").width())
                        //.width(800)
                        .height(600)
                        .sizeField("amount")
                        .xField("purposes")
                        .yField("recipients")
                        .labelField("donor")
                        .colorField(null)
                        .colorArray(["#ddd"]);


                    container.datum(data).call(scat);

                    container.selectAll("circle")
                        .on("click",function(d){
                            container.selectAll(".scat-sel").classed("scat-sel",false);
                            d3.select(this).classed("scat-sel",true);
                            scope.sel  = d["donor"];
                            updateTop5();

                        });

                    /*container.selectAll("circle")
                        .on("mouseover",function(d){

                            console.log(this);
                        });

                    container.selectAll("circle")
                        .on("mouseout",function(d){
                            container.selectAll(".scat-hov").classed("scat-hov",false);
                        });*/

                })
        }
    }
  });
