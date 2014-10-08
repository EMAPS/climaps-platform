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
        $scope.narratives = narratives;
        $scope.maps = maps;
        $scope.tabs =
            [
                { name: "narratives", active:true  },
                { name: "maps", active:false }
            ];

    var init = function () {

        $location.hash('narratives');
        $anchorScroll();
        $location.hash('show');

        }
    init();
  });