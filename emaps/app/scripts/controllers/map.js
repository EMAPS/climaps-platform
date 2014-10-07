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

    $scope.mapSlugFromId = function(id){

        console.log(id);

        var myRegexp = />https:\/\/drive\.google\.com.+?id=(.+?)(<|&|;|")/g;
        var res = [];
        var match = myRegexp.exec(id);
        while (match != null) {
            res.push(match[1]);
            // matched text: match[0]
            // match start: match.index
            // capturing group n: match[n]
            match = myRegexp.exec(id);
        }

        var finalDiv = document.createElement("div");
       res.forEach(function(d,i){

           console.log("maps", res);
           var found = maps.filter(function(e){
               return d === e.id;
           })[0];

           var createA = document.createElement('a');
           var createAText = document.createTextNode(found.title);
           createA.setAttribute('href', "#/map/"+found.slug);
           createA.appendChild(createAText);
           finalDiv.appendChild(createA);

       })

        //elem.append($compile(finalDiv)(scope));
        console.log(finalDiv);
        $("#related-maps").html(finalDiv);
        return true;
        //var m = $scope.maps.filter(function(d) {return d.id===id});

    }

        $scope.narrativeSlugFromId = function(id){

            console.log(id);

            var myRegexp = />https:\/\/drive\.google\.com.+?id=(.+?)(<|&|;|")/g;
            var res = [];
            var match = myRegexp.exec(id);
            while (match != null) {
                res.push(match[1]);
                // matched text: match[0]
                // match start: match.index
                // capturing group n: match[n]
                match = myRegexp.exec(id);
            }

            console.log("narratives", res);

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

            //elem.append($compile(finalDiv)(scope));
            console.log(finalDiv);
            $("#related-narratives").html(finalDiv);
            return true;
            //var m = $scope.maps.filter(function(d) {return d.id===id});

        }

  });
