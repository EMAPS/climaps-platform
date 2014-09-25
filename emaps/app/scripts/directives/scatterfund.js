'use strict';

/**
 * @ngdoc directive
 * @name emapsApp.directive:scatterfund
 * @description
 * # scatterfund
 */
angular.module('emapsApp')
  .directive('scatterfund', function (fileService) {
    return {
      replace: false,
      restrict: 'A',
      templateUrl: 'views/scatterfund.html',
      link: function postLink(scope, element, attrs) {


  	    var scatterfundContainer = element.find("#scatterfund-container")[0],
  			container = d3.select(element[0]),
  			chart = d3.select(scatterfundContainer),
  			scatterfund = emaps.scatterplot()
                 .width(1170)
                 .height(600)
                 .sizeField("Total")
                 .xField("Germanwatch_inverse")
                 .yField("Total")
                 .frogeggs(["Adaptation_Fund","LDC_Fund","Pilot_programme","Special_Climate_Change_Fund"])
                 .labelField("Country")
                 .colorField("Germanwatch_inverse")
                 .colorArray(["#62a34e","#fbbe1a","#C03B4C"])

        scope.indexes = ["Germanwatch_inverse","Dara_inverse","Gain_inverse","Human_Development_Index"],
       	scope.index = scope.indexes[0];
        	//scope.funds = ["Adaptation_Fund","LDC_Fund","Pilot_programme","Special_Climate_Change_Fund"]

        
        fileService.getFile(attrs.directiveData).then(

        	function(rows){
        		var data = d3.csv.parse(rows)

        		chart.datum(data).call(scatterfund)
        	},
        	function(error){
        		var txt = error
        		element.text(txt)
        	}
        );
      }
    };
  });
