'use strict';

/**
 * @ngdoc function
 * @name emapsApp.controller:MapCtrl
 * @description
 * # MapCtrl
 * Controller of the emapsApp
 */
angular.module('emapsApp')
  .controller('MapCtrl', function ($scope, $compile,$timeout,content, narratives, maps) {
  
    $scope.content = content;
    $scope.narratives = narratives;
    $scope.maps = maps;
    $scope.relatedMaps = [];
    $scope.relatedNarratives = [];


    $scope.content.metadata.forEach(function(d){
        if(d.title==="Related maps"){

            var res = regexMaker(d.html);
            
            res.forEach(function(d,i){

                var found = $scope.maps.filter(function(e){
                    return d === e.id;
                })[0];

                $scope.relatedMaps.push({title:found.title,slug:found.slug})

            })
        }

        if(d.title==="Related narratives"){
            var res = regexMaker(d.html);
            res.forEach(function(d,i){

                var found =$scope.narratives.filter(function(e){
                    return d === e.id;
                })[0];

                $scope.relatedNarratives.push({title:found.title,slug:found.slug})

            })
        }

    });

    function regexMaker(id) {

        var myRegexp = />https:\/\/drive\.google\.com.+?id=(.+?)(<|&|;|")/g;
        var res = [];
        var match = myRegexp.exec(id);
        while (match != null) {
            res.push(match[1]);
            match = myRegexp.exec(id);
        }
        return res;

    }

  });
