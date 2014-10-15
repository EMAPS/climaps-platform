'use strict';

/**
 * @ngdoc function
 * @name emapsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the emapsApp
 */
angular.module('emapsApp')
  .controller('MainCtrl', function ($routeParams,$anchorScroll,$location,$scope, narratives, maps, content) {



    $scope.narratives = narratives.sort(function(a,b){
        if(b.title < a.title) return 1;
        else return -1;
    });
    $scope.maps = maps.sort(function(a,b){

        if(b.title < a.title) return 1;
        else return -1;
    });
    $scope.content = content;







    $scope.tabs =
        [
            { name: "Issue stories", active:true  },
            { name: "Issue maps", active:false }
        ];
  });
