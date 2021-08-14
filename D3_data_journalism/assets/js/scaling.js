//updating x-scale
function xScale(stateData, chosenXAxis) {
    // create scales
    var xLinearScale = d3.scaleLinear()
      .domain([d3.min(stateData, d => d[chosenXAxis]) * 0.9,
        d3.max(stateData, d => d[chosenXAxis]) * 1.1
      ])
      .range([0, width]);
  
    return xLinearScale;
  }
  
  //updating y-scale
  function yScale(stateData, chosenYAxis) {
    // create scales
    var yLinearScale = d3.scaleLinear()
      .domain([d3.min(stateData, d => d[chosenYAxis]) - 1,
        d3.max(stateData, d => d[chosenYAxis]) + 1
      ])
      .range([height, 0]);
  
    return yLinearScale;
  }
  
  // updating xAxis
  function renderXAxes(newXScale, xAxis) {
    var bottomAxis = d3.axisBottom(newXScale);
  
    xAxis.transition()
      .duration(1000)
      .call(bottomAxis);
  
    return xAxis;
  }
  
  //updating yAxis
  function renderYAxes(newYScale, yAxis) {
    var leftAxis = d3.axisLeft(newYScale);
  
    yAxis.transition()
      .duration(1000)
      .call(leftAxis);
  
    return yAxis;
  }
  
  //updating circles group
  function renderXCircles(circlesGroup, newXScale, chosenXaxis) {
  
    circlesGroup.transition()
      .duration(1000)
      .attr("cx", d => newXScale(d[chosenXAxis]));
  
    return circlesGroup;
  }
  
  function renderYCircles(circlesGroup, newYScale, chosenYaxis) {
  
    circlesGroup.transition()
      .duration(1000)
      .attr("cy", d => newYScale(d[chosenYAxis]));
  
    return circlesGroup;
  }
  
  //updating circles text
  function renderXText(circlesGroup, newXScale, chosenXaxis) {
  
    circlesGroup.transition()
      .duration(1000)
      .attr("dx", d => newXScale(d[chosenXAxis]));
  
    return circlesGroup;
  }
  
  function renderYText(circlesGroup, newYScale, chosenYaxis) {
  
    circlesGroup.transition()
      .duration(1000)
      .attr("dy", d => newYScale(d[chosenYAxis])+5);
  
    return circlesGroup;
  }
  
  //number to USD
  var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });
  
  //updating circles group with new tooltip
  function updateToolTip(circlesGroup, chosenXAxis, chosenYAxis) {
  
    var xpercentsign = "";
    var xlabel = "";
    if (chosenXAxis === "poverty") {
      xlabel = "Poverty";
      xpercentsign = "%";
    } else if (chosenXAxis === "age"){
      xlabel = "Age";
    } else {
      xlabel = "Income";
    }
  
    var ypercentsign = "";
    var ylabel = "";
    if (chosenYAxis === "healthcare") {
      ylabel = "Healthcare";
      ypercentsign = "%";
    } else if (chosenYAxis === "smokes"){
      ylabel = "Smokes";
      ypercentsign = "%";
    } else {
      ylabel = "Obesity";
      ypercentsign = "%";
    }
  
    var toolTip = d3.tip()
      .attr("class", "d3-tip")
      .offset([50, -75])
      .html(function(d) {
        if (chosenXAxis === "income"){
          var incomelevel = formatter.format(d[chosenXAxis]);
  
          return (`${d.state}<br>${xlabel}: ${incomelevel.substring(0, incomelevel.length-3)}${xpercentsign}<br>${ylabel}: ${d[chosenYAxis]}${ypercentsign}`)
        } else {
          return (`${d.state}<br>${xlabel}: ${d[chosenXAxis]}${xpercentsign}<br>${ylabel}: ${d[chosenYAxis]}${ypercentsign}`)
        };
      });
  
    circlesGroup.call(toolTip);
  
    // mouseover event
    circlesGroup.on("mouseover", function(data) {
        toolTip.show(data, this);
    })
      // onmouseout event
      .on("mouseout", function(data) {
          toolTip.hide(data, this);
      });
  
  return circlesGroup;
  }