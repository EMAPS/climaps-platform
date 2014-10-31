'use strict';

/**
 * @ngdoc directive
 * @name emapsApp.directive:multiplestatic
 * @description
 * # multiplestatic
 */
angular.module('emapsApp')
    .directive('multiplestaticfluid', function (fileService,$compile) {
        return {
            restrict: 'A',
            templateUrl: 'views/multiplestaticfluid.html',
            link: function postLink(scope, element, attrs) {


                //var scatterfundContainer = element.find('#multiple-container')[0];

                scope.indexes = JSON.parse(attrs.directiveData);
                scope.index = scope.indexes[0];
                scope.container = element.find("#multiple-container-fluid");



                scope.$watch('index', function(newValue, oldValue){
                    //if(newValue !== oldValue){


                    var ext = newValue.url.split('.');
                    ext = ext[ext.length - 1].toLowerCase();
                    if(ext === 'jpg' || ext === 'png'){
                        scope.container.append('img')
                            .attr('src', newValue.url);
                        return;
                    }

                    fileService.getFile(newValue.url).then(
                        function(data){

                            scope.container.html(data);

                            var circles = d3.select(scope.container[0]).select("#interactive").selectAll("circle").filter(function(d){

                                if (d3.select(this).select("title").length>0) return true;
                                else return false;

                            })

                            addLabels(circles);


                            var rects = d3.select(scope.container[0]).select("#interactive").selectAll("rect").filter(function(d){

                                if (d3.select(this).select("title").length>0) return true;
                                else return false;

                            })

                            addLabels(rects);

                            function addLabels(selection) {

                                selection
                                    .attr('tooltip', function(){
                                        var title = d3.select(this).select('title').text();
                                        return  title;
                                    })
                                    .attr('tooltip-append-to-body', 'true')
                                    .attr('tooltip-placement', 'left');


                                selection.on('mouseover', function(){
                                    var title = d3.select(this).select('title').text();

                                    /* rects
                                     .attr('opacity', function(){
                                     var title2 = d3.select(this).select('title').text();
                                     if(title === title2){
                                     return 1 ;
                                     }else{
                                     return 0.3;
                                     }
                                     });*/
                                });

                                selection.on('mouseout', function(){
                                    /*rects
                                     .attr('opacity', function(){
                                     return 1;
                                     });*/
                                });
                                $compile(angular.element(element.find('svg')))(scope);
                            }
                            //$compile(angular.element(element.find('svg')))(scope);

                        },
                        function(error){
                            var txt = error;
                            scope.container.html(txt);
                        }
                    );

                    //<img src=+"'"+newValue"'"/>

                    // }
                });


            }
        };
    });
