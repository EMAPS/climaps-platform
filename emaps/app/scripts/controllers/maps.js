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
	            { name: "Issue stories", active:true  },
	            { name: "Issue maps", active:false }
	        ];

	var init = function () {

	    $location.hash('maps');
	    $anchorScroll();
	    $location.hash('show');

	    }
	init();
  });


