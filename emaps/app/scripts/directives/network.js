'use strict';

/**
 * @ngdoc directive
 * @name emapsApp.directive:network
 * @description
 * # network
 */
angular.module('emapsApp')
  .directive('network', function (fileService) {
    return {
      restrict: 'A',
      replace: false,
      templateUrl: 'views/network.html',
      link: function postLink(scope, element, attrs) {
      	
      	scope.isCollapsed = true;

      	var sigmaContainer = element.find('#sigma-container')[0],
      		container = d3.select(element[0]),
      		chart = d3.select(sigmaContainer),
      		network = emaps.graph()
                .on('filtered', function(d){

                	if(!d.nodeID){
                		scope.selected = undefined;
                		scope.isCollapsed = true;
                		if(!scope.$$phase) {
              				scope.$apply();
            			}
                	}else{

	                	scope.selectedNode = d.nodes.filter(function(d){
	                    	return d.selected;
	                  	})[0];

	                  	network.centerView(scope.selectedNode);

	                  	scope.attrs = d3.entries(scope.selectedNode.attributes);

	                  	scope.linkedNodes = d.nodes.filter(function(d){
	                    	return !d.selected;
	                  	});

	                  	//scope.edges = edgesDirection(d['nodeID'], d['edges']);
	                  	scope.edges = edgesDirection(d.nodeID, d.edges);


	                	scope.isCollapsed = false;

	                  	if(!scope.$$phase) {
              				scope.$apply();
            			}
                	}

                });

        scope.updateNetwork = function(d) {
  			chart.call(network.setSelectedNode(d.id));
  		};

		var edgesDirection = function(nodeID, edges){

		    var outgoing={},incoming={},mutual={};

		    edges.forEach(function(d){
		      if(nodeID === d.source){
		        outgoing[d.id] = d;
		      }else if(nodeID === d.target){
		        incoming[d.id] = d;
		      }
		    });

		    for (var e in outgoing) {
		      if (e in incoming) {
		        mutual[e]=outgoing[e];
		        delete incoming[e];
		        delete outgoing[e];
		      }
		    }

		    return {outgoing: d3.values(outgoing),incoming: d3.values(incoming), mutual: d3.values(mutual)};

		};

        fileService.getFile(attrs.directiveData).then(

	            function(data){

	            	scope.bipartite = data.bipartite || true; //to be removed when added to source json
	            	scope.nodes = data.nodes;
	            	scope.selected = undefined;

	            	chart.datum(data).call(network);

	            	container.select('#in').on('click', function(){
					    network.zoomIn();
					  });
					  
					container.select('#out').on('click', function(){
					    network.zoomOut();
					  });

					container.select('#reset').on('click', function(){
					    network.zoomReset();
					  });

	            },
	            function(error){
		            var txt = error;
		            element.html(txt);
	            }
            );
      }
    };
  });
