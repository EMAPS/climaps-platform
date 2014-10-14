'use strict';

/**
 * @ngdoc directive
 * @name emapsApp.directive:image
 * @description
 * # image
 */
angular.module('emapsApp')
    .directive('singleimage', function (fileService, $compile) {
        return {
            replace: false,
            template : "<div class='img-narrative'></div>",
            restrict: 'A',
            link: function postLink(scope, element, attrs) {



                var container = element.find(".img-narrative");

                var ext = JSON.parse(attrs.source)[0].url.split('.');
                ext = ext[ext.length - 1].toLowerCase();

                //find a better way to find imgs
                if(ext === 'jpg' || ext === 'png'){
                    container.append('<img src="'+JSON.parse(attrs.source)[0].url+ '"/>')
                    return;
                }

                fileService.getFile(JSON.parse(attrs.source)[0].url).then(
                    function(data){

                        container.html(data);
                    },
                    function(error){
                        var txt = error;
                        container.html(txt);
                    }
                );


            }
        }
    });