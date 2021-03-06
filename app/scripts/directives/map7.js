'use strict';

/**
 * @ngdoc directive
 * @name emapsApp.directive:map7
 * @description
 * # map7
 */
angular.module('emapsApp')
    .directive('map7', function (fileService, $timeout, $q) {
        return {
            templateUrl: 'views/map7.html',
            replace: false,
            restrict: 'A',
            compile: function compile(tElement, tAttributes) {
                return {
                    pre: function (scope, element, attrs) {




                    },

                    post: function postLink(scope, element, attrs) {

                        scope.datafiles = [];
                        scope.data;

                        function loadData() {

                            JSON.parse(attrs.directiveData).forEach(function (e, i) {

                                fileService.getFile(e.url).then(
                                    function (data) {
                                        if(i==0) scope.data = data;
                                        scope.datafiles.push(data);
                                        if(scope.datafiles.length == JSON.parse(attrs.directiveData).length) {
                                            showMap();
                                        }
                                    })
                            });

                        }

                        loadData();

                        function showMap() {

                        scope.datasets = [
                            {
                                "filter": "undp",
                                "fieldSet": [
                                    {
                                        "value": "themes",
                                        "label": "sectors"
                                    },
                                    {
                                        "value": "countries",
                                        "label": "countries"
                                    },
                                    {
                                        "value": "climate-hazards",
                                        "label": "climate hazards"
                                    },
                                    {
                                        "value": "key-collaborators",
                                        "label": "key collaborators"
                                    }
                                ],
                                "name": "UNDP",
                                "dataset": "adaptation_projects.json"
                            },
                            {
                                "filter": "psi",
                                "fieldSet": [
                                    {
                                        "value": "themes",
                                        "label": "sectors"
                                    },
                                    {
                                        "value": "countries",
                                        "label": "countries"
                                    },
                                    {
                                        "value": "climate-hazards",
                                        "label": "climate hazards"
                                    },
                                    {
                                        "value": "key-collaborators",
                                        "label": "key collaborators"
                                    }
                                ],
                                "name": "PSI",
                                "dataset": "adaptation_projects.json"
                            },
                            {
                                "filter": "climatewise",
                                "fieldSet": [
                                    {
                                        "value": "themes",
                                        "label": "sectors"
                                    },
                                    {
                                        "value": "countries",
                                        "label": "countries"
                                    },
                                    {
                                        "value": "climate-hazards",
                                        "label": "climate hazards"
                                    },
                                    {
                                        "value": "key-collaborators",
                                        "label": "key collaborators"
                                    }
                                ],
                                "name": "Climatewise",
                                "dataset": "adaptation_projects.json"
                            },
                            {
                                "filter": "",
                                "fieldSet": [
                                    {
                                        "value": "overview.sector",
                                        "label": "sectors"
                                    },
                                    {
                                        "value": "country",
                                        "label": "countries"
                                    },
                                    {
                                        "value": "types",
                                        "label": "types"
                                    },
                                    {
                                        "value": "scale",
                                        "label": "scale"
                                    },
                                    {
                                        "value": "overview.stimuli",
                                        "label": "stimuli"
                                    },
                                    {
                                        "value": "overview.impacts",
                                        "label": "impacts"
                                    },
                                    {
                                        "value": "project_classification.project_type",
                                        "label": "project type"
                                    },
                                    {
                                        "value": "project_classification.project_status",
                                        "label": "project status"
                                    },
                                    {
                                        "value": "project_classification.running_time",
                                        "label": "running time"
                                    },
                                    {
                                        "value": "project_classification.spatial_scale",
                                        "label": "spatial scale"
                                    },
                                    {
                                        "value": "project_classification.effect_emergence",
                                        "label": "effect emergence"
                                    },
                                    {
                                        "value": "project_classification.effect_persistence",
                                        "label": "effect persistence"
                                    },
                                    {
                                        "value": "problem_solving_capacity_an_reversibility.problem_solving_coverage",
                                        "label": "problem solving coverage"
                                    },
                                    {
                                        "value": "problem_solving_capacity_an_reversibility.reversibility",
                                        "label": "reversibility"
                                    },
                                    {
                                        "value": "responsibilities.initiating_agent",
                                        "label": "initiating agent"
                                    },
                                    {
                                        "value": "responsibilities.executing_agent",
                                        "label": "executing agent"
                                    },
                                    {
                                        "value": "responsibilities.funding_source",
                                        "label": "funding source"
                                    }
                                ],
                                "name": "Ci-Grasp",
                                "dataset": "cigrasp.json"
                            },
                            {
                                "filter": "",
                                "fieldSet": [
                                    {
                                        "value": "SectorNameE",
                                        "label": "sectors"
                                    },
                                    {
                                        "value": "sector_mapped",
                                        "label": "sectors in undp alm scheme"
                                    },
                                    {
                                        "value": "recipientnameE",
                                        "label": "recipient countries"
                                    },
                                    {
                                        "value": "donornameE",
                                        "label": "donor countries"
                                    },
                                    {
                                        "value": "agencynameE",
                                        "label": "agency"
                                    },
                                    {
                                        "value": "purposename_e",
                                        "label": "purposes"
                                    },
                                    {
                                        "value": "RegionNameE",
                                        "label": "regions"
                                    },
                                    {
                                        "value": "IncomeGroupNameE",
                                        "label": "income Groups"
                                    }
                                ],
                                "name": "OECD",
                                "dataset": "oecd.json"
                            },
                            {
                                "filter": "",
                                "fieldSet": [
                                    {
                                        "value": "sector",
                                        "label": "sectors"
                                    },
                                    {
                                        "value": "sector_mapped",
                                        "label": "sectors in undp alm scheme"
                                    },
                                    {
                                        "value": "recipient",
                                        "label": "recipient countries"
                                    },
                                    {
                                        "value": "recipient_income_level",
                                        "label": "Recipient Income Level"
                                    },
                                    {
                                        "value": "region",
                                        "label": "Region"
                                    },
                                    {
                                        "value": "donor",
                                        "label": "Funder"
                                    },
                                    {
                                        "value": "implementor",
                                        "label": "Implementor"
                                    }
                                ],
                                "name": "Climate Funds Update",
                                "dataset": "climatefundsupdate.json"
                            },
                            {
                                "filter": "",
                                "fieldSet": [
                                    {
                                        "value": "sector",
                                        "label": "sectors"
                                    },
                                    {
                                        "value": "sector_mapped",
                                        "label": "sectors in undp alm scheme"
                                    },
                                    {
                                        "value": "recipient",
                                        "label": "recipient"
                                    }
                                ],
                                "name": "NAPA",
                                "dataset": "napa.json"
                            }
                        ]

                        scope.d = scope.datasets[0];
                        scope.xindex = scope.d["fieldSet"];
                        scope.yindex = scope.d["fieldSet"];
                        scope.source = scope.d["fieldSet"][0].value;
                        scope.target = scope.d["fieldSet"][1].value;
                        //scope.source = "recipient_mapped";
                        scope.dataset = scope.d.dataset;
                        scope.orderby = "alphabet"; // count or alphabet
                        scope.whichdata = "indiabangladesh";
                        scope.el = d3.select(element[0]).select("#matrix-container");
                        scope.filter = scope.d.filter;
                        scope.sort = "alphabet"
                        scope.filt = "indiabangladesh";

                       $timeout(function(){
                           scope.d = scope.datasets[1];
                       });



                        scope.drawChart = function (orderby, source, target, filter) {


                            scope.el.select("svg").remove();
                            var margin = {
                                    top: 140,
                                    right: 140,
                                    bottom: 10,
                                    left: 250
                                },
                                width = 820,
                                height = 2000;

                            var x = d3.scale.ordinal().rangeBands([0, width]);

                            var nodes = [],
                                links = [],
                                sources = [],
                                targets = [];


                            scope.data.forEach(function (d, i) {


                                if (scope.filter !== "" && d.source !== scope.filter) {
                                    return;
                                }

                                if (source.indexOf(".") == -1)
                                    var dsources = d[source];
                                else
                                    var dsources = eval("d." + source);
                                if (target.indexOf(".") == -1)
                                    var dtargets = d[target];
                                else
                                    var dtargets = eval("d." + target);
                                if (dsources === "" || dtargets === "") {

                                    return;
                                }

                                if(!(dsources instanceof Array)) {

                                    if(scope.dataset == "cigrasp.json")
                                        dsources = dsources.split(",");
                                    else
                                        dsources = [dsources];
                                }
                                if(!(dtargets instanceof Array)) {

                                    if(scope.dataset == "cigrasp.json")
                                        dtargets = dtargets.split(",");
                                    else
                                        dtargets = [dtargets];
                                }


                                if (scope.whichdata == 'indiabangladesh') {
                                    if ('countries' in d && !(d.countries == 'Bangladesh' || d.countries == 'India'))
                                        return;
                                    if ('country' in d && !(d.country == 'Bangladesh' || d.country == 'India'))
                                        return;
                                    if ('recipientnameE' in d && !(d.recipientnameE == 'Bangladesh' || d.recipientnameE == 'India'))
                                        return;
                                    if ('recipient' in d && !(d.recipient == 'Bangladesh' || d.recipient == 'India'))
                                        return;
                                    if ('recipientMapped' in d && !(d.recipientMapped == 'Bangladesh' || d.recipientMapped == 'India'))
                                        return;
                                }



                                dsources.forEach(function (s) {
                                    s = s.trim();
                                    if (s != 'Non-specific') {

                                        var sid = nodeIndex(s, sources);
                                        if (sid < 0) {
                                            sources.push({
                                                "name": s
                                            });
                                            sid = nodeIndex(s, sources);
                                        }

                                        dtargets.forEach(function (t) {
                                            t = t.trim();
                                            if (t != 'Non-specific') {
                                                var tid = nodeIndex(t, targets);
                                                if (tid < 0) {
                                                    targets.push({
                                                        "name": t
                                                    });
                                                    tid = nodeIndex(t, targets);
                                                }

                                                var li = linkIndex(sid, tid, links);
                                                if (li < 0)
                                                    links.push({
                                                        "source": sid,
                                                        "target": tid,
                                                        "value": 1
                                                    });
                                                else
                                                    links[li].value++;
                                            }
                                        });
                                    }
                                });
                            });


                            var matrix = [],
                                ntargets = targets.length,
                                nsources = sources.length;

                            // Compute index per node
                            targets.forEach(function (target, i) {
                                target.count = 0;
                                matrix[i] = d3.range(nsources).map(function (j) {
                                    sources[j].count = 0;
                                    return {
                                        x: j,
                                        y: i,
                                        z: 0
                                    };
                                });
                            });

                            // Convert links to matrix; count character occurrences.
                            var max = 0;
                            links.forEach(function (link) {
                                matrix[link.target][link.source].z += link.value;
                                if (max < link.value)
                                    max = link.value;
                                targets[link.target].count += link.value;
                                sources[link.source].count += link.value;
                            });

                            var y = d3.scale.ordinal().rangeBands([0, 11 * ntargets]);
                            var z = d3.scale.linear().domain([0, max]);

                            // Precompute the orders.
                            var sourceOrders = {
                                name: d3.range(nsources).sort(function (a, b) {
                                    return d3.ascending(sources[a].name, sources[b].name);
                                }),
                                count: d3.range(nsources).sort(function (a, b) {
                                    return d3.descending(sources[a].count, sources[b].count);
                                })
                            };
                            var targetOrders = {
                                name: d3.range(ntargets).sort(function (a, b) {
                                    return d3.ascending(targets[a].name, targets[b].name);
                                }),
                                count: d3.range(ntargets).sort(function (a, b) {
                                    return d3.descending(targets[a].count, targets[b].count);
                                })
                            };


                           // The default sort order.
                            if (orderby == "count") {
                                x.domain(sourceOrders.count);
                                y.domain(targetOrders.count);
                            } else {
                                x.domain(sourceOrders.name);
                                y.domain(targetOrders.name);
                            }

                            height = ntargets * 11 + 20;

                            var svg = scope.el.append("svg")
                                .attr("width", width + margin.left + margin.right)
                                .attr("height", height + margin.top + margin.bottom)
                                //.style("margin-left", -margin.left + "px")
                                .append("g")
                                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


                            var row = svg.selectAll(".row")
                                .data(matrix)
                                .enter().append("g")
                                .attr("class", "row")
                                .attr("transform", function (d, i) {
                                    return "translate(0," + y(i) / 2 + ")";
                                })
                                .each(row);

                            //row.append("line")
                            //.attr("x2", width);

                            row.append("text")
                                .attr("x", -6)
                                .attr("y", 5) //y.rangeBand()/2)
                                .attr("dy", ".12em")
                                .attr("transform", function (d, i) {
                                    return "translate(0," + (y(i) + 2) / 2 + ")";
                                })
                                .attr("text-anchor", "end")
                                .text(function (d, i) {
                                    if (targets[i].name.length > 50) return targets[i].name.substr(0, 50) + "…";
                                    else return targets[i].name;
                                });

                            var column = svg.selectAll(".column")
                                .data(sources)
                                .enter().append("g")
                                .attr("class", "column")
                                .attr("transform", function (d, i) {
                                    return "translate(" + x(i) + ",-10)rotate(-30)";
                                });

                            column.append("text")
                                .attr("x", 6)
                                .attr("y", 2.5) //y.rangeBand() / 2)
                                .attr("dy", ".32em")
                                .attr("text-anchor", "start")
                                .text(function (d, i) {
                                    if (d.name.length > 30) return d.name.substr(0, 30) + "…";
                                    else return d.name;
                                });

                            function nodeIndex(name, list) {
                                var i;
                                for (i = 0; i < list.length; i++) {
                                    if (list[i].name == name)
                                        return i;
                                }
                                return -1;
                            }

                            function linkIndex(source, target, list) {
                                var i;
                                for (i = 0; i < list.length; i++) {
                                    if (list[i].source == source && list[i].target == target)
                                        return i;
                                }
                                return -1;
                            }

                            function row(row) {

                                var bg = d3.select(this).selectAll(".bg")
                                    .data(row)
                                    .enter().append("rect")
                                    .attr("class", "bg")
                                    .attr("x", function (d) {
                                        return x(d.x);
                                    })
                                    .attr("y", function (d) {
                                        return y(d.y) / 2;
                                    })
                                    .attr("width", function (d) {
                                        return (x.rangeBand() - 5)
                                    })
                                    .attr("height", 10) //y.rangeBand()/2)
                                    .style("fill", function (d, i) {
                                        return "rgba(120, 120, 120)";
                                    })
                                    .style("opacity", 0.1);



                                var cell = d3.select(this).selectAll(".cell")
                                    .data(row.filter(function (d) {
                                        return d.z;
                                    }))
                                    .enter().append("rect")
                                    .attr("class", "cell")
                                    .attr("x", function (d) {
                                        return x(d.x);
                                    })
                                    .attr("y", function (d) {
                                        return y(d.y) / 2;
                                    })
                                    .attr("width", function (d) {
                                        return z(d.z) * (x.rangeBand() - 5)
                                    })
                                    .attr("height", 10) //y.rangeBand()/2)
                                    .style("fill", function (d, i) {
                                        return "rgb(40, 98, 117)";
                                    })
                                    .style("opacity", 0.7)
                                    .on("mouseover", mouseover)
                                    .on("mouseout", mouseout)
                                    .append("svg:title")
                                    .text(function (d) {
                                        return d.z + " * (" + sources[d.x].name + " + " + targets[d.y].name + ")";
                                    });
                            }

                            function mouseover(p) {
                                d3.select(this).classed("mat-sel", true)
                                d3.selectAll(".row text").classed("active", function (d, i) {
                                    return i == p.y;
                                });
                                d3.selectAll(".column text").classed("active", function (d, i) {
                                    return i == p.x;
                                });
                            }

                            function mouseout() {
                                d3.select(this).classed("mat-sel", false)
                                d3.selectAll("text").classed("active", false);
                            }


                        }

                        scope.$watch('yindex', function (newValue, oldValue) {
                            if (newValue !== oldValue) {


                                scope.target = newValue[1];
                                //scope.target = newValue.value;
                                scope.drawChart(scope.orderby, scope.source.value, scope.target.value, scope.filter)

                            }
                        });

                       scope.$watch('source', function (newValue, oldValue) {
                            if (newValue !== oldValue) {

                                //scope.target = newValue.value;
                                scope.drawChart(scope.orderby, scope.source.value, scope.target.value, scope.filter)

                            }
                        });

                        scope.$watch('target', function (newValue, oldValue) {
                            if (newValue !== oldValue) {



                                scope.drawChart(scope.orderby, scope.source.value, scope.target.value, scope.filter)

                            }
                        });



                        //scope.drawChart(scope.orderby, scope.source, scope.target, scope.filter);


                        scope.$watch('d', function (newValue, oldValue) {
                            if (newValue !== oldValue) {

                                scope.d = newValue;
                                scope.xindex = scope.d["fieldSet"];
                                scope.yindex = scope.d["fieldSet"];
                                scope.data=scope.datafiles.filter(function(d){return d.name===newValue.dataset})[0].values;
                                scope.dataset = scope.d.dataset;
                                scope.filter = scope.d.filter;

                                scope.drawChart(scope.d, scope.orderby, scope.source.value, scope.target.value, scope.filter)
                                //scope.drawChart(scope.orderby,scope.source,scope.target,scope.filter)

                            }
                        });

                        scope.$watch('xindex', function (newValue, oldValue) {
                            if (newValue !== oldValue) {


                                scope.source = newValue[0];
                                //scope.source = newValue.value;
                                scope.drawChart(scope.orderby, scope.source.value, scope.target.value, scope.filter)

                            }
                        });

                        scope.$watch('sort', function (newValue, oldValue) {
                            if (newValue !== oldValue) {

                                scope.orderby = newValue;
                                scope.drawChart(scope.orderby, scope.source.value, scope.target.value, scope.filter)

                            }
                        });
                        scope.$watch('filt', function (newValue, oldValue) {
                            if (newValue !== oldValue) {

                                scope.whichdata = newValue;

                                scope.drawChart(scope.orderby, scope.source.value, scope.target.value, scope.filter)

                            }
                        });

                        scope.drawChart(scope.orderby, scope.source.value, scope.target.value, scope.filter);


                        }
                    }

                }
            }
        }
  });
