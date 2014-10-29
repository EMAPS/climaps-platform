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

                var found =$scope.maps.filter(function(e){
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

        console.log($scope.relatedMaps, $scope.relatedNarratives);


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

           var createP = document.createElement('p');
            var createA = document.createElement('a');
           var createAText = document.createTextNode(found.title);
           createA.setAttribute('href', "#!/map/"+found.slug);
           createA.appendChild(createAText);
           createP.appendChild(createA);
           finalDiv.appendChild(createP);

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

                var createP = document.createElement('p');
                var createA = document.createElement('a');
                var createAText = document.createTextNode(found.title);
                createA.setAttribute('href', "#!/narrative/"+found.slug);
                createA.appendChild(createAText);
                createP.appendChild(createA);
                finalDiv.appendChild(createP);
            });


            $("#related-narratives").html(finalDiv);
            return true;

        }

  });
