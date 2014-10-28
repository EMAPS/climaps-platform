'use strict';

/**
 * @ngdoc function
 * @name emapsApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the emapsApp
 */
angular.module('emapsApp')
  .controller('AboutCtrl', function ($scope, content, institutions, authors) {
  	$scope.content = content;
  	$scope.institutions = institutions;
  	$scope.authors = authors;
  });
