'use strict';

/**
 * @ngdoc directive
 * @name emapsApp.directive:multiplestatic
 * @description
 * # multiplestatic
 */
angular.module('emapsApp')
  .directive('multiplestatic', function () {
    return {
      //template: '<div></div>',
      restrict: 'A',
      templateUrl: 'views/multiplestatic.html',
      link: function postLink(scope, element, attrs) {


        var scatterfundContainer = element.find('#multiple-container')[0];

          scope.indexes = JSON.parse(attrs.directiveData);
           scope.index = scope.indexes[0];


        scope.$watch('index', function(newValue, oldValue){
          if(newValue !== oldValue){

            if(ext === 'jpg' || ext === 'png'){
             container.append('img')
                .attr('src', newValue);
              return;
            }

            fileService.getFile(newValue).then(
              function(data){
                  container.html(data);
                },
              function(error){
                  var txt = error;
                  container.html(txt);
                }
            );

              //<img src=+"'"+newValue"'"/>

            }
        });


      }
    };
  });
