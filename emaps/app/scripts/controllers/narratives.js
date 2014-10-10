'use strict';

/**
 * @ngdoc function
 * @name emapsApp.controller:NarrativesCtrl
 * @description
 * # NarrativesCtrl
 * Controller of the emapsApp
 */
angular.module('emapsApp')
  .controller('NarrativesCtrl', function ($location,$anchorScroll, $scope,narratives, maps) {
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
                { name: "Issue Stories", active:true  },
                { name: "Issue Maps", active:false }
            ];

    var init = function () {

        $location.hash('narratives');
        $anchorScroll();
        $location.hash('show');

        }
    init();
  });