var width = 1060,
  height = 600;

var svg = d3.select("#map").append("svg")
    .attr("width", width)
    .attr("height", height);

var g = svg.append("g");

var rect = g.append( "rect" )
        .attr("width",width)
        .attr("height",height)
        .attr("fill","steelblue");

//beginning map info for drawing
var projection = d3.geo.mercator()
    .scale((width + 1) / 2 / Math.PI)
    .translate([width / 2, height / 2])
    .precision(.1);

var map = g.append("g")
    .attr("id","map");

var path = d3.geo.path()
    .projection(projection);

// load data and display the map on the canvas with country geometries
d3.json("json/world-110m.json", function(data) {
    map.selectAll("path")
      .data(topojson.object(data, data.objects.countries)
          .geometries)
    .enter()
      .append("path")
      .attr("d", path)
      .attr("fill","lightgreen")
      .attr("stroke", "lightgreen")

      d3.csv("energyData/totalEnergy.csv", function(error, data) {
       g.selectAll("circle")
          .data(data)
          .enter()
          .append("circle")
          .attr("cx", function(d) {
                  return projection([d.lon, d.lat])[0];
          })
          .attr("cy", function(d) {
                  return projection([d.lon, d.lat])[1];
          })

          .attr("r", function (d) {
                  return (parseInt(d.value));
          })
          .style("fill", "black");

       });


});
//end map info for drawing

function oceanTemp(year, ocean) {
  $.getJSON( "energyData/Oceans/" + ocean + ".json", function(mydata) {
    for(var i = 0; i < mydata.length; i++) {
      var obj = mydata[i];
      if (obj['year'] == year)
         $("#" + ocean + "Ocean").html(ocean + " " + obj['temperature']);
    }
  })
}

function oceanTemps(year) {
  oceanTemp(year, "Pacific");
  oceanTemp(year, "Indian");
  oceanTemp(year, "Atlantic");
}


d3.select('#slider-div').call(d3.slider().axis(true).min(2004).max(2014).step(1)
  .on("slide",function(evt, value) {
    drawDonuts(value);
    oceanTemps(value);
  }));



drawDonuts(2004);
oceanTemps(2004);
