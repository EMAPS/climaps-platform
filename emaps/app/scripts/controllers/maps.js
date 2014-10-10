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
        $scope.narratives = narratives.sort(function(a,b){
            if(b.title < a.title) return 1;
            else return -1;
        });
        $scope.maps = maps.sort(function(a,b){

            if(b.title < a.title) return 1;
            else return -1;
        });
	    $scope.tabs =
	        [
	            { name: "Issue stories", active:false  },
	            { name: "Issue maps", active:true }
	        ];

	var init = function () {

	    $location.hash('maps');
	    $anchorScroll();
	    $location.hash('show');

	    }
	init();
  });


