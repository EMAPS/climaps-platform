'use strict';

/**
 * @ngdoc function
 * @name emapsApp.controller:NarrativectrlCtrl
 * @description
 * # NarrativectrlCtrl
 * Controller of the emapsApp
 */
angular.module('emapsApp')
  .controller('NarrativeCtrl', function ($scope, content) {
  	console.log(content)
  	$scope.content = content;
  });