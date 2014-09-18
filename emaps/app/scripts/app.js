'use strict';

/**
 * @ngdoc overview
 * @name emapsApp
 * @description
 * # emapsApp
 *
 * Main module of the application.
 */
angular
  .module('emapsApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.bootstrap'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/narratives/:narrative', {
        templateUrl: 'views/narrative.html', 
        controller: 'NarrativeCtrl',
        // resolve: {
        //   venues : function ($route, fileService) {
        //     var district = $route.current.params.district;
        //     return fileService.getFile('data/' + district + '/venues.json')
        //   }
        // }
      })
      .when('/maps/:map', {
        templateUrl: 'views/map.html', 
        controller: 'MapCtrl',
        // resolve: {
        //   venues : function ($route, fileService) {
        //     var district = $route.current.params.district;
        //     return fileService.getFile('data/' + district + '/venues.json')
        //   }
        // }
      })
      .when('/theory', {
        templateUrl: 'views/theory.html',
        controller: 'TheoryCtrl'
      })
      .when('/sprints', {
        templateUrl: 'views/sprints.html',
        controller: 'SprintsCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
