'use strict';

/**
 * @ngdoc function
 * @name emapsApp.controller:DatasetsCtrl
 * @description
 * # DatasetsCtrl
 * Controller of the emapsApp
 */
angular.module('emapsApp')
  .controller('DatasetsCtrl', function ($scope, content) {
    $scope.content = content
  });
