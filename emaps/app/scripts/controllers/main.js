'use strict';

/**
 * @ngdoc function
 * @name emapsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the emapsApp
 */
angular.module('emapsApp')
  .controller('MainCtrl', function ($routeParams,$anchorScroll,$location,$scope, narratives, maps) {


    $scope.narratives = narratives;
    $scope.maps = maps;
    $scope.tabs =
        [
            { name: "narratives", active:false  },
            { name: "maps", active:true }
        ];

    //$scope.content = content;

  });
