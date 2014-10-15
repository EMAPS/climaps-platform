(function(){

  var emaps = window.emaps || (window.emaps = {});

  emaps.matrix = function(){

    var height = 1280,
        width = 800,
        xField = "x",
        yField = "y",
        sortFields = [],
        //possible values: null = "descending", "ascending"
        sortOrder = null,
        //possible values: heatmap, bars, circles
        matrixStyle = "heatmap"
        //possible values: whole, column
        normalization = "whole"
        sizeField = "size",
        labelField = "label",
        //give null to colorField for monochrome circles
        colorField = "color",
        colorStyle = "linear",
        //color string or array with one element for monochrome circles
        colorArray = ["#00D481"]
        selColor = "#FF5A52",
        minSize = 0,
        maxSize = 13,
        sizeScale = d3.scale.linear(),
        xScale = d3.scale.ordinal(),
        yScale = d3.scale.ordinal(),
        colorScale = d3.scale.linear(),
        totExt=[];



    function matrix(selection){
      selection.each(function(data){
        var chart,
        w = width,
        h = height;



        //==============================================================
        // COLOR!!
        //==============================================================
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

          d3.select(".lins").remove();
          d3.select(".circles").remove();
          d3.select(".labels").remove();

          chart.append("g")
          .attr("class","lins")

          chart.append("g")
          .attr("class","circles")

          chart.append("g")
          .attr("class","labels")

        }



        //Filter data
        //===========
        data = data.filter(function(d){return yField in d && d[yField] !== ""})

        data = data.filter(function(d){
          for (i in xField){
            if (!(xField[i] in d) || d[xField[i]] === "") {
              return false
            }
          }
          return true;
        })

        if(sortFields !== null && sortFields.length >0) {
          data.sort(function(a,b) {
            var atot = 0, btot = 0;
            for (i in sortFields) {
              atot += parseFloat(a[sortFields[i]])
              btot += parseFloat(b[sortFields[i]])
            }
            if(sortOrder === null || sortOrder ==="descending") return btot-atot;
            else if (sortOrder ==="ascending") return atot-btot;
          })


        }
        //end filter data
        //==========


        // X scale
        //==========
        xScale.rangeRoundBands([150,w]).domain(d3.range(xField.length));
        var xstep = xScale.range()[1]-xScale.range()[0]


        // Y scale
        //==========
        var ynest = d3.nest()
          .key(function(d) { return d[yField]; })
          .entries(data);

        var yvals = []

        ynest.forEach(function(d,i){
          yvals.push(d.key)
        })

        yScale.rangeRoundBands([100,h],1).domain(yvals);
        var ystep = yScale.range()[1]-yScale.range()[0]

        //end y scales
        //==========


        // Size scales
        //==========
      if(matrixStyle==="circles") sizeScale.range([minSize,maxSize])
      else if(matrixStyle==="bars") sizeScale.range([0,xScale.rangeBand()])
      else if(matrixStyle==="heatmap") sizeScale.range([0,1])

        var sizescales = []

          for(i in xField) {
            var curExt = d3.extent(data,function(d){return parseFloat(d[xField[i]])})
            sizescales.push(curExt)
          }

        if(normalization==="whole") {
          var totMin = d3.min(sizescales,function(d){return d[0]})
          var totMax = d3.min(sizescales,function(d){return d[1]})

          if(matrixStyle==="circles") totExt=[Math.sqrt(totMin/Math.PI),Math.sqrt(totMax/Math.PI)]
          else if(matrixStyle ==="bars" || matrixStyle ==="heatmap") totExt=[totMin,totMax]
          sizeScale.domain(totExt)
        }
        // end size scales
        //==========


        // For each column
        //================

        xField.forEach(function(e,i){

          if(normalization==="column") {
            sizeScale.domain(sizeScales[i])
          }

          d3.select(".labels").append("text")
          .style("font-family","Source Sans Pro")
          .style("font-size",12)
          .attr("text-anchor","middle")
          .attr("data",e)
          .attr("class",function() {

              if(sortFields.indexOf(e)>-1 && (sortOrder === null || sortOrder ==="descending")) return "s-down xlabel m"+i
              else if(sortFields.indexOf(e)>-1 && sortOrder ==="ascending") return "s-up xlabel m"+i
                else return"sort xlabel m"+i})
          .text(e)
          .attr("x",0)
          .attr("y",0)
          //.attr("transform","translate("+xScale(i)+","+80+")rotate(-30)")
          .attr("transform","translate("+xScale(i)+","+80+")");

          var gees = d3.select(".circles").selectAll(".field"+i).data(data, function(d){return d[yField]})

          gees.exit().remove();

          if(matrixStyle==="circles") {

          gees.enter().append("circle")
          .attr("class","item field"+i)

          .style("stroke","none")
          .style("opacity",0.7)
          .style("fill",colorArray)

          //transition on circles
          d3.selectAll(".field"+i).transition().duration(300)
          .attr("cx",function(d){return xScale(i)})
          .attr("cy",function(d){return yScale(d[yField])})
          .attr("r",function(d){
            return sizeScale(Math.sqrt(parseFloat(d[e])/Math.PI));
        })

      }

      else if(matrixStyle==="bars") {

        gees.enter().append("rect")
        .attr("class","item field"+i)

        .style("stroke","none")
        .style("opacity",0.7)
        .style("fill",function(d){
          if(d.item == "All" || i==0) return "#668E94";
          return colorArray;
          })


        //transition on circles
        d3.selectAll(".field"+i).transition().duration(300)
        //.attr("x",function(d){return xScale(i)-xScale.rangeBand()/2})
        .attr("x",function(d){
        return xScale(i)-xstep/2 + (xstep-sizeScale(parseFloat(d[e])))/2
          })
        .attr("y",function(d){return yScale(d[yField])-ystep/2})
        .attr("height",ystep)
        .attr("width",function(d){return sizeScale(parseFloat(d[e]))})
            .attr('tooltip', function(d){
                return d[e];
            })
            .attr('tooltip-append-to-body', 'true')
            .attr('tooltip-placement', 'left');

      }

      else if(matrixStyle==="heatmap") {

        gees.enter().append("rect")
        .attr("class","item field"+i)
        .style("stroke","none")
        .style("opacity",function(d){return sizeScale(parseFloat(d[e]))})
        .style("fill",colorArray)


        //transition on circles
        d3.selectAll(".field"+i).transition().duration(300)
        //.attr("x",function(d){return xScale(i)-xScale.rangeBand()/2})
        .attr("x",function(d){
        return xScale(i)-xstep/2
          })
        .attr("y",function(d){return yScale(d[yField])-ystep/2})
        .attr("height",ystep)
        .attr("width",xstep)
      }


      d3.selectAll(".item").on("mouseover", function(d,j){

        var n = j % d3.selectAll(".ylabel")[0].length;
        //console.log(d3.select(this).attr("class"));
        var m = parseInt(d3.select(this).attr("class").split(" ")[1].replace( /^\D+/g, ''))
        d3.select(".n"+n).classed("mat-sel",true)
        d3.select(".m"+m).classed("mat-sel",true)
        d3.select(this).style("stroke",selColor)
        .style("fill",function(){
          if(matrixStyle === "bars" || matrixStyle === "circles") return selColor;
          else return colorArray;
        })

      })

      d3.selectAll(".item").on("mouseout", function(d,j){

        var n = j % d3.selectAll(".ylabel")[0].length;
        //console.log(d3.select(this).attr("class"));
        var m = parseInt(d3.select(this).attr("class").split(" ")[1].replace( /^\D+/g, ''))
        d3.select(".n"+n).classed("mat-sel",false)
        d3.select(".m"+m).classed("mat-sel",false)
        d3.select(this).style("stroke","none")
        .style("fill",function(d){
          if(d.item == "All" || d3.select(this).attr("class").indexOf("field0")>-1) return "#668E94";
          return colorArray;
          })

      })


      d3.select(".lins").selectAll(".ylabel").data(yvals)
      .enter().append("text")
      .attr("class",function(d,i){return "ylabel "+"n"+i})
      .style("font-family","Source Sans Pro")
      .style("font-size",12)
      .attr("text-anchor","end")
      .text(function(d){return d})
      .attr("x",80)
      .attr("y",function(d){return yScale(d)+4})

      })

      d3.selectAll(".xlabel").each(function(d,i){
        var classes = d3.select(this).attr("class")
        var bbox = d3.select(this)[0][0].getBBox();
        var t = d3.transform(d3.select(this).attr("transform")).translate;

        d3.select(".labels").append("text")
        .attr("x",t[0]+bbox.width+bbox.x+5)
        .attr("y",t[1])
        .attr("font-family","FontAwesome")
        .style("font-size",12)
          .style("fill",function(){
            if(classes.indexOf("sort") > -1) return "#888";
            else return "black";
            })
        .text(function(){
            if(classes.indexOf("sort") > -1) return "\uf0dc";
            else if (classes.indexOf("s-up") > -1) return "\uf0de";
            else if (classes.indexOf("s-down") > -1) return "\uf0dd";
        });

      })
        //bind data

        })
      }


        matrix.height = function(x){
          if (!arguments.length) return parseInt(height);
          height = x;
          return matrix;
        }

        matrix.width = function(x){
          if (!arguments.length) return parseInt(width);
          width = x;
          return matrix;
        }

        matrix.xField = function(x){
          if (!arguments.length) return xField;
          xField = x;
          return matrix;
        }

        matrix.yField = function(x){
          if (!arguments.length) return yField;
          yField = x;
          return matrix;
        }

        matrix.sizeField = function(x){
          if (!arguments.length) return sizeField;
          sizeField = x;
          return matrix;
        }

        matrix.minSize = function(x){
          if (!arguments.length) return minSize;
          minSize = x;
          return matrix;
        }

        matrix.maxSize = function(x){
          if (!arguments.length) return maxSize;
          maxSize = x;
          return matrix;
        }
        matrix.colorField = function(x){
          if (!arguments.length) return colorField;
          colorField = x;
          return matrix;
        }
        matrix.selColor = function(x){
          if (!arguments.length) return selColor;
          selColor = x;
          return matrix;
        }
        matrix.colorStyle = function(x){
          if (!arguments.length) return colorStyle;
          colorStyle = x;
          return matrix;
        }
        matrix.colorArray = function(x){
          if (!arguments.length) return colorArray;
          colorArray = x;
          return matrix;
        }
        matrix.normalization = function(x){
          if (!arguments.length) return normalization;
          normalization = x;
          return matrix;
        }
        matrix.matrixStyle = function(x){
          if (!arguments.length) return matrixStyle;
          matrixStyle = x;
          return matrix;
        }

        matrix.sortFields = function(x){
          if (!arguments.length) return sortFields;
          sortFields = x;
          return matrix;
        }
        matrix.sortOrder = function(x){
          if (!arguments.length) return sortOrder;
          sortOrder = x;
          return matrix;
        }


        //d3.rebind(matrix, dispatch, 'on');

        return matrix;

    }

  })();
