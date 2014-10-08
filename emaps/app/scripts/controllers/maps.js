'use strict';

/**
 * @ngdoc function
 * @name emapsApp.controller:MapsCtrl
 * @description
 * # MapsCtrl
 * Controller of the emapsApp
 */
angular.module('emapsApp')
  .controller('MapsCtrl', function ($location,$anchorScroll, $scope,narratives, maps) {
	    $scope.narratives = narratives;
	    $scope.maps = maps;
	    $scope.tabs =
	        [
	            { name: "narratives", active:false },
	            { name: "maps", active:true }
	        ];

	var init = function () {

	    $location.hash('maps');
	    $anchorScroll();
	    $location.hash('show');

	    }
	init();
  });


