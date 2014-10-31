'use strict';

/**
 * @ngdoc function
 * @name emapsApp.controller:ForewordCtrl
 * @description
 * # ForewordCtrl
 * Controller of the emapsApp
 */
angular.module('emapsApp')
  .controller('ForewordCtrl', function ($scope, content) {
	$scope.content = content;
  });
