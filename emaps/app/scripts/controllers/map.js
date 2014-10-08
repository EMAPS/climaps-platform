'use strict';

/**
 * @ngdoc function
 * @name emapsApp.controller:MapCtrl
 * @description
 * # MapCtrl
 * Controller of the emapsApp
 */
angular.module('emapsApp')
  .controller('MapCtrl', function ($scope, $compile,content, narratives, maps) {
  
  $scope.content = content;
    $scope.narratives = narratives;
    $scope.maps = maps;


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

    $scope.mapSlugFromId = function(id){


        var res = regexMaker(id);


        var finalDiv = document.createElement("div");

        res.forEach(function(d,i){

           var found = maps.filter(function(e){
               return d === e.id;
           })[0];

           var createA = document.createElement('a');
           var createAText = document.createTextNode(found.title);
           createA.setAttribute('href', "#/map/"+found.slug);
           createA.appendChild(createAText);
           finalDiv.appendChild(createA);

       })

        $("#related-maps").html(finalDiv);
        return true;


    }

        $scope.narrativeSlugFromId = function(id){

            var res = regexMaker(id);

            var finalDiv = document.createElement("div");
            res.forEach(function(d,i){


                var found = narratives.filter(function(e){
                    return d === e.id;
                })[0];

                var createA = document.createElement('a');
                var createAText = document.createTextNode(found.title);
                createA.setAttribute('href', "#/narrative/"+found.slug);
                createA.appendChild(createAText);
                finalDiv.appendChild(createA);

            })


            $("#related-narratives").html(finalDiv);
            return true;

        }

  });
