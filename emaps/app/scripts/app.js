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
    'ui.bootstrap',
    'angular-loading-bar'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        resolve: {
          narratives : function (fileService) {
            return fileService.getFile('contents/narratives.json');
          },
          maps : function (fileService) {
            return fileService.getFile('contents/maps.json');
          }
          // ,
          // content : function (fileService) {
          //   return fileService.getFile('contents/pages/home.json');
          // }
        }
      })
      .when('/narrative/:narrative', {
        templateUrl: 'views/narrative.html', 
        controller: 'NarrativeCtrl',
        resolve: {
          content : function ($route, fileService) {
            var narrative = $route.current.params.narrative;
            return fileService.getFile('contents/narratives/' + narrative + '.json');
          }
        }
      })
      .when('/map/:map', {
        templateUrl: 'views/map.html', 
        controller: 'MapCtrl',
        resolve: {
          content : function ($route, fileService) {
            var map = $route.current.params.map;
            return fileService.getFile('contents/maps/' + map + '.json');
          }
        }
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
  })
  .config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeSpinner = false;
  }]);
