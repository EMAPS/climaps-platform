'use strict';

/**
 * @ngdoc function
 * @name emapsApp.controller:NarrativectrlCtrl
 * @description
 * # NarrativectrlCtrl
 * Controller of the emapsApp
 */
angular.module('emapsApp')
  .controller('NarrativeCtrl', function ($scope, content, narratives) {

    $scope.narratives = narratives;

    $scope.filterLinks = function(str){

        var regex =/href="https:\/\/drive\.google\.com.+?id=(.+?)&amp.+"/g;

        if(regex.test(str)){

            str = str.replace(regex, function (a, b) {
                console.log("found");

                var slug = $scope.narratives.filter(function (e) {
                    return e.id == b;
                })[0].slug;

                return "href='#!/narrative/" + slug + "'";
            });
        };

        return str;

    };

    content.sections.forEach(function(d,i){
        d.html= $scope.filterLinks(d.html);
    });

  	$scope.content = content;

  });
