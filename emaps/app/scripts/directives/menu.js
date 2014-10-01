'use strict';

/**
 * @ngdoc directive
 * @name emapsApp.directive:menu
 * @description
 * # menu
 */
angular.module('emapsApp')
  .directive('menu', function () {
    return {
      templateUrl: 'views/menu.html',
      restrict: 'A',
      replace: "false",
      link: function postLink(scope, element, attrs) {
        //element.text('this is the menu directive');
        element.find("#menu-ico").click(function(event) {
          event.preventDefault();
          $(this).toggleClass("on");

            if($(this).hasClass("on")) {
                element.find(".hidden-menu").removeClass("out");
            }
            else {
                element.find(".hidden-menu").addClass("out");
            }

        });

          element.find("li a").click(function(event){
              element.find(".hidden-menu").addClass("out");
              element.find("#menu-ico").removeClass("on");


          })

      }
    };
  });
