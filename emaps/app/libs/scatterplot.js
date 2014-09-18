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
        //color string or array with one element for monochrome circles
        colorArray = ["#00D481"]
        minSize = 10,
        maxSize = 100,
        sizeScale = d3.scale.linear(),
        xScale = d3.scale.linear(),
        yScale = d3.scale.linear(),
        colorScale;



    function scatterplot(selection){
      selection.each(function(data){
        var chart;

        //define scales for x, y and size
        sizeScale.range([minSize,maxSize]).domain(d3.extent(data, function (d){return d[sizeField])});
        xScale.range([0,width]).domain(d3.extent(data, function (d){return d[xField])});
        yScale.range([0,height]).domain(d3.extent(data, function (d){return d[yField])});


        //====================================================
        //Big, uncomprehensible section to define color scales

        //if single color
        if (typeof colorArray === "string" || colorArray instanceof String ||  ) {
          colorField = null;
        }

        // if array with single value inside
        else if (colorArray instanceof Array && colorArray.size == 1) {
          colorField = null;
          colorArray = colorArray[0]
        }

        //if array with more than one element
        else if (colorArray instanceof Array && colorArray.size > 1) {

          //linear
          if(colorStyle ==="linear" || colorStyle !=="ordinal") {
            colorScale = d3.scale.linear().range(colorArray)
            var ext = d3.extent(data, function(d){return d.colorField})

            if (colorArray.length>2) {

              var intermediate = colorArray.length-2
              var newExt = []
              for (var i = 0; i<intermediate; i++) {
                newExt.push((ext[1]*i)/colorArray.length-1)
              }
              newExt.push(ext[1])
              newExt.splice(0,0,ext[0])
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
        }
        else
        {
          chart = selection.select('svg')
          .attr('width', width)
          .attr('height', height)
        }

        //bind data
        var gees = chart.selectAll("g").data(data)

        //add new groups
        var newgees = gees.enter().append("g")

        //add circles to groups
        var circles  = newgees.append("circle")
        .style("stroke","none")
        .style("opacity",0.8)
        .style("fill", function(d){
            if(colorField === null) {
              return colorArray;
            }
            else {
              return colorScale(d[colorField])
            }
        })
        .on("mouseover", function(d){
          d3.select(this)
          .attr("opacity",1)
        })
        .on("mouseout", function(d){
          d3.select(this)
          .attr("opacity",0.8)
        })

        //transition on circles
        circles.transition().duration(300)
        .attr("cx",function(d){return xScale(d[xField])})
        .attr("cy",function(d){return yScale(d[yField])})
        .attr("r",function(d){return sizeScale(d[sizeField])})

        //add text to groups
        var texts = newgees.append("text")
        .attr("text-anchor","middle")
        .style("font-size",12)
        .text(function(d){return d[label]});

        //transition on texts
        texts.transition().duration(300)
        .attr("x",function(d){return xScale(d[xField])})
        .attr("y",function(d){return yScale(d[yField]) + sizeScale(d[sizeField]) + 10})

        //remove old groups
        gees.exit().remove();

      }); //end selection
    } // end district


  scatterplot.height = function(x){
    if (!arguments.length) return height;
    height = x;
    return scatterplot;
  }

  scatterplot.width = function(x){
    if (!arguments.length) return width;
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


  d3.rebind(district, dispatch, 'on');

  return scatterplot;

  }

})();
