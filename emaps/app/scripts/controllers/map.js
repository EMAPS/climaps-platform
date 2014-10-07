'use strict';

/**
 * @ngdoc function
 * @name emapsApp.controller:MapCtrl
 * @description
 * # MapCtrl
 * Controller of the emapsApp
 */
angular.module('emapsApp')
  .controller('MapCtrl', function ($scope, content, narratives, maps) {
	
	$scope.content = content;
    $scope.narratives = narratives;
    $scope.maps = maps;

    $scope.mapSlugFromId = function(id){

        console.log($scope.maps);
        return "lol";
        //var m = $scope.maps.filter(function(d) {return d.id===id});

    }

  });
