'use strict';

/**
 * @ngdoc service
 * @name emapsApp.fileService
 * @description
 * # fileService
 * Factory in the emapsApp.
 */
angular.module('emapsApp')
  .factory('fileService', function () {
    // Service logic
    // ...

    var meaningOfLife = 42;

    // Public API here
    return {
      someMethod: function () {
        return meaningOfLife;
      }
    };
  });
