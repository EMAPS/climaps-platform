'use strict';

/**
 * @ngdoc function
 * @name emapsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the emapsApp
 */
angular.module('emapsApp')
  .controller('MainCtrl', function ($scope, narratives, maps) {
  	
    $scope.narratives = narratives;
    $scope.maps = maps;
    //$scope.content = content;

  });
