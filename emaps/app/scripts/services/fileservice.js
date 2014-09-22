'use strict';

/**
 * @ngdoc service
 * @name emapsApp.fileService
 * @description
 * # fileService
 * Factory in the emapsApp.
 */
angular.module('emapsApp')
  .factory('fileService', function ($http, $q) {
     return {

       getFile : function(url){
         var deferred = $q.defer();
         $http.get(url).success(function(data){
           deferred.resolve(data);
         }).error(function(){
           deferred.reject("An error occured while fetching file");
         });

         return deferred.promise;
       }
     }
  });
