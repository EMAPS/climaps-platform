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
    'angular-loading-bar',
    'angulartics', 
    'angulartics.google.analytics',
  ])
  .config(function ($routeProvider, $locationProvider) {

    $locationProvider.hashPrefix('!');   

    $routeProvider
      .when('/', {
          redirectTo: '/home'
      })
      .when('/home', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        resolve: {
          narratives : function (fileService) {
            return fileService.getFile('contents/narratives.json');
          },
          maps : function (fileService) {
            return fileService.getFile('contents/maps.json');
          },
          content : function (fileService) {
            return fileService.getFile('contents/pages/home.json');
          }
        }
      })
      .when('/narrative/:narrative', {
        templateUrl: 'views/narrative.html', 
        controller: 'NarrativeCtrl',
        resolve: {
          content : function ($route, fileService) {
            var narrative = $route.current.params.narrative;
            return fileService.getFile('contents/narratives/' + narrative + '.json');
          },
            narratives : function (fileService) {
                return fileService.getFile('contents/narratives.json');
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
          },
            narratives : function (fileService) {
                return fileService.getFile('contents/narratives.json');
            },
            maps : function (fileService) {
                return fileService.getFile('contents/maps.json');
            }
        }
      })
      .when('/controversy-mapping', {
        templateUrl: 'views/theory.html',
        controller: 'TheoryCtrl',
        resolve: {
          content : function (fileService) {
            return fileService.getFile('contents/pages/controversy-mapping.json');
          }
        }
      })
      .when('/foreword', {
        templateUrl: 'views/foreword.html',
        controller: 'ForewordCtrl',
        resolve: {
          content : function (fileService) {
            return fileService.getFile('contents/pages/a-foreword-for-emaps.json');
          }
        }
      })
      .when('/sprints', {
        templateUrl: 'views/sprints.html',
        controller: 'SprintsCtrl',
        resolve: {
          content : function (fileService) {
            return fileService.getFile('contents/pages/sprint.json');
          }
        }
      })
      .when('/datasets', {
        templateUrl: 'views/datasets.html',
        controller: 'DatasetsCtrl',
        resolve: {
          content : function (fileService) {
            return fileService.getFile('contents/pages/datasets.json');
          }
        }
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        resolve: {
          content : function (fileService) {
              return fileService.getFile('contents/pages/about-the-project.json');
          },
          institutions : function (fileService) {
              return fileService.getFile('contents/pages/institutions.json');
          },
          authors : function (fileService) {
              return fileService.getFile('contents/pages/authors.json');
          }
        }
      })
      .otherwise({
        redirectTo: '/'
      });
  }).run(function($rootScope, $route, $location, $window, $timeout, $anchorScroll, $animate){
     //fanta angular 

     $rootScope.$on('$locationChangeSuccess', function() {
          $rootScope.actualLocation = $location.path();
      });        

     $rootScope.$watch(function () {return $location.path()}, function (newLocation, oldLocation) {
          if($rootScope.actualLocation !== newLocation) {
            $timeout(function(){
              if($location.hash()){
                $anchorScroll();
              }else{
                $window.scrollTo(0,0);
                //$("body").animate({scrollTop: 0}, 700);
              }
            })
          }
      });
  });
