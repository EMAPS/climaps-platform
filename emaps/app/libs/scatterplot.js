(function(){

  var emaps = window.emaps || (window.emaps = {});

  emaps.scatterplot = function(){

    var height = 1280,
        width = 800,
        xField = "x",
        yField = "y",
        sizeField = "size",
        labelField = "label",
        //give null to colorField for monochrome circles
        colorField = "color",
        colorStyle = "linear",
        //frog eggs array of values, null forn normal scatterplot
        frogeggs = null
        //color string or array with one element for monochrome circles
        colorArray = ["#00D481"]
        minSize = 2,
        maxSize = 40,
        sizeScale = d3.scale.linear(),
        xScale = d3.scale.linear(),
        yScale = d3.scale.linear(),
        colorScale = d3.scale.linear();



    function scatterplot(selection){
      selection.each(function(data){
        var chart,
        w = width-100,
        h = height-120;

        data = data.filter(function(d){return (yField in d && d[yField]!== "") && (xField in d && d[xField] !== "")})

        //define scales for x, y and size
        sizeScale.range([minSize,maxSize]).domain(d3.extent(data, function(d) {return Math.sqrt(parseFloat(d[sizeField])/Math.PI)}));
        var xext = d3.extent(data, function(d) {return parseFloat(d[xField])})
        xScale.range([100,w]).domain(xext);
        var yext = d3.extent(data, function(d) {return parseFloat(d[yField])})
        yScale.range([100,h]).domain([yext[1],yext[0]]);

        xAxis = d3.svg.axis().scale(xScale).orient("bottom")//.tickSubdivide(true),
    		yAxis = d3.svg.axis().scale(yScale).ticks(10).orient("left");

        //====================================================
        //Big, uncomprehensible section to define color scales

        //if single color
        if (colorArray instanceof String) {
          colorField = null;
        }

        // if array with single value inside
        else if (colorArray instanceof Array && colorArray.length == 1) {
          colorField = null;
          colorArray = colorArray[0]
        }

        //if array with more than one element
        else if (colorArray instanceof Array && colorArray.length > 1) {

          //linear
          if(colorStyle ==="linear" || colorStyle !=="ordinal") {
            colorScale = d3.scale.linear().range(colorArray)
            var ext = d3.extent(data, function(d){return parseFloat(d[colorField])})

            if (colorArray.length>2) {

              var intermediate = colorArray.length-2
              var newExt = []
              for (var i = 0; i<intermediate; i++) {
                newExt.push((ext[1]*(i+1))/colorArray.length-1)
              }
              newExt.push(ext[1])
              newExt.splice(0,0,ext[0])
              colorScale.domain(newExt)
            }
            else {
              colorScale.domain(ext)
            }

          }
          //ordinal
          else {
            colorScale = d3.scale.ordinal().range(colorArray)
          }
        }

        //end of big, uncomprenhensible section to define color scales
        //============================================================


        //check if svg is already there
        if (selection.select('svg').empty()){
          chart = selection.append('svg')
          .attr('width', width)
          .attr('height', height)

          chart.append("g")
          .attr("class","lins")

          chart.append("g")
          .attr("class","circles")

          chart.append("g")
          .attr("class","labels")


        }
        else
        {
          chart = selection.select('svg')
          .attr('width', width)
          .attr('height', height)
        }




        //bind data
        var gees = d3.select(".circles").selectAll("g").data(data, function(d){return d[labelField]})


        gees.exit().remove();


        //add new groups
        var newgees = gees.enter().append("g")
        .on("mouseover", function(d){

          d3.select(this).selectAll("circle")
          .style("opacity",1)

          texts.filter(function(e){return e == d})
          .style("opacity",1)
          .attr("x",function(d){return xScale(parseFloat(d[xField]))})
          .attr("y",function(d){return yScale(parseFloat(d[yField])) + sizeScale(Math.sqrt(parseFloat(d[sizeField])/Math.PI)) + 10})

          //plot lines
          var lins = d3.select(".lins")

          var linx = lins.append("line")
          .attr("class","pointer")
          .attr("x1",xScale(parseFloat(d[xField])))
          .attr("y1",yScale(parseFloat(d[yField])))
          .attr("x2",xScale(parseFloat(d[xField])))
          .attr("y2",yScale(parseFloat(d[yField])))
          .style("stroke","#aaaaaa")
          .style("opacity",0.3)
          .style("stroke-dasharray","4,4")
          .style("stroke-width",2)
          .transition()
          .duration(300)
          .attr("x2",xScale(parseFloat(d[xField])))
          .attr("y2",yScale(yext[0]))

          var liny = lins.append("line")
          .attr("class","pointer")
          .attr("x1",xScale(parseFloat(d[xField])))
          .attr("y1",yScale(parseFloat(d[yField])))
          .attr("x2",xScale(parseFloat(d[xField])))
          .attr("y2",yScale(parseFloat(d[yField])))
          .style("stroke","#aaaaaa")
          .style("opacity",0.3)
          .style("stroke-width",2)
          .style("stroke-dasharray","4,4")
          .transition()
          .duration(300)
          .attr("x2",xScale(xext[0]))
          .attr("y2",yScale(parseFloat(d[yField])))

        })
        .on("mouseout", function(d){
          d3.select(this).selectAll("circle")
          .style("opacity",0.7)

          texts.style("opacity",0)
          .attr("x",0)
          .attr("y",0)

          //remove lines
          d3.selectAll(".pointer").remove();
        })

        if (frogeggs!==null && frogeggs instanceof Array) {
          newgees.append("circle")
          .attr("class","eggout")
          .style("stroke","none")
          .style("opacity",0.7)
          .style("fill","#fff")

          //transition on circles
          d3.selectAll(".eggout").transition().duration(300)
          .attr("cx",function(d){return xScale(parseFloat(d[xField]))})
          .attr("cy",function(d){return yScale(parseFloat(d[yField]))})
          .attr("r",function(d){
              return sizeScale(Math.sqrt(parseFloat(d[sizeField])/Math.PI))
          })
          .style("fill", "#eee")
        }

        //add circles to groups
        var circles  = newgees.append("circle")
        .style("stroke","none")
        .style("opacity",0.7)
        .style("fill","#fff")
        .attr("class","circle")



        //transition on circles
        d3.selectAll(".circle").transition().duration(300)
        .attr("cx",function(d){return xScale(parseFloat(d[xField]))})
        .attr("cy",function(d){return yScale(parseFloat(d[yField]))})
        .attr("r",function(d){
          if (frogeggs === null || ! frogeggs instanceof Array) {
            return sizeScale(Math.sqrt(parseFloat(d[sizeField])/Math.PI))
          }
          else {
            var tot = 0;
            for(var i = 0; i < frogeggs.length; i++){
              tot += parseFloat(d[frogeggs[i]])
            }
            return sizeScale(Math.sqrt(tot/Math.PI))
          }
        })
        .style("fill", function(d){
            if(colorField === null) {
              return colorArray;
            }
            else {
              return colorScale(parseFloat(d[colorField]))
            }
        })


        //bind data
        var tees = d3.select(".labels").selectAll("g").data(data, function(d){return d[labelField]})

        //add new groups
        var newtees = tees.enter().append("g")

        //remove old groups
        tees.exit().remove();

        //add text to groups
        var texts = newtees.append("text")
        .attr("text-anchor","middle")
        .attr("class","label")
        .style("font-size",12)
        .style("font-family","Source Sans Pro")
        .style("opacity",0)
        .text(function(d){return d[labelField]});

        //transition on texts
        d3.selectAll(".label")
        .attr("x",0)
        .attr("y",0)




        //Axes

        d3.selectAll(".axis").remove();

        chart.append("g")
        .attr("class", "x axis")
        .style("stroke-width", "1px")
        .style("font-size","11px")
        .style("font-family","Source Sans Pro")
        .attr("transform", "translate(" + 0 + "," + h + ")")
        .call(xAxis);

      	chart.append("g")
        .attr("class", "y axis")
        .style("stroke-width", "1px")
        .style("font-size","11px")
			  .style("font-family","Source Sans Pro")
        .attr("transform", "translate(" + 100 + "," + 0 + ")")
        .call(yAxis);

        d3.selectAll(".y.axis line, .x.axis line, .y.axis path, .x.axis path")
         	.style("shape-rendering","crispEdges")
         	.style("fill","none")
         	.style("stroke","#ccc")

      }); //end selection
    } // end district


  scatterplot.height = function(x){
    if (!arguments.length) return parseInt(height);
    height = x;
    return scatterplot;
  }

  scatterplot.width = function(x){
    if (!arguments.length) return parseInt(width);
    width = x;
    return scatterplot;
  }

  scatterplot.xField = function(x){
    if (!arguments.length) return xField;
    xField = x;
    return scatterplot;
  }

  scatterplot.yField = function(x){
    if (!arguments.length) return yField;
    yField = x;
    return scatterplot;
  }

  scatterplot.sizeField = function(x){
    if (!arguments.length) return sizeField;
    sizeField = x;
    return scatterplot;
  }

  scatterplot.labelField = function(x){
    if (!arguments.length) return labelField;
    labelField = x;
    return scatterplot;
  }

  scatterplot.minSize = function(x){
    if (!arguments.length) return minSize;
    minSize = x;
    return scatterplot;
  }

  scatterplot.maxSize = function(x){
    if (!arguments.length) return maxSize;
    maxSize = x;
    return scatterplot;
  }
  scatterplot.colorField = function(x){
    if (!arguments.length) return colorField;
    colorField = x;
    return scatterplot;
  }
  scatterplot.colorStyle = function(x){
    if (!arguments.length) return colorStyle;
    colorStyle = x;
    return scatterplot;
  }
  scatterplot.colorArray = function(x){
    if (!arguments.length) return colorArray;
    colorArray = x;
    return scatterplot;
  }
  scatterplot.frogeggs = function(x){
    if (!arguments.length) return frogeggs;
    frogeggs = x;
    return scatterplot;
  }


  //d3.rebind(scatterplot, dispatch, 'on');

  return scatterplot;

  }

})();
