'use strict';

/**
 * @ngdoc directive
 * @name emapsApp.directive:multiplestatic
 * @description
 * # multiplestatic
 */
angular.module('emapsApp')
  .directive('multiplestatic', function (fileService) {
    return {
      //template: '<div></div>',
      restrict: 'A',
      templateUrl: 'views/multiplestatic.html',
      link: function postLink(scope, element, attrs) {


        var scatterfundContainer = element.find('#multiple-container')[0];

          scope.indexes = JSON.parse(attrs.directiveData);
           scope.index = scope.indexes[0];
           scope.container = element.find("#multiple-container");


        scope.$watch('index', function(newValue, oldValue){
          //if(newValue !== oldValue){
          var ext = newValue.split('.');
              ext = ext[ext.length - 1].toLowerCase();
            if(ext === 'jpg' || ext === 'png'){
             scope.container.append('img')
                .attr('src', newValue);
              return;
            }

            fileService.getFile(newValue).then(
              function(data){
                  console.log(data);
                  scope.container.html(data);
                },
              function(error){
                  var txt = error;
                  scope.container.html(txt);
                }
            );

              //<img src=+"'"+newValue"'"/>

           // }
        });


      }
    };
  });
