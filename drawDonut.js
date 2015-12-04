

function drawDonuts(year) {
  drawDonut('Europe', year);
  drawDonut('Africa', year);
  drawDonut('MiddleEast', year);
  drawDonut('NorthAmerica', year);
  drawDonut('SCAmerica', year);
  drawDonut('AsiaPacific', year);
}

function drawDonut(file, year) {

  var width = 150,
      height = 100,
      radius = Math.min(width, height) / 2;

  var arc = d3.svg.arc()
      .outerRadius(radius - 10)
      .innerRadius(radius - 30);

  var pie = d3.layout.pie()
      .sort(null)
      .value(function(d) { return d.total; });

  d3.select("#donut-"+file).select("svg").remove();
  var svg = d3.select("#donut-"+file).append("svg")
      .attr("width", width)
      .attr("height", height)
    .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

  d3.json("energyData/" + file + "/" + file + year + ".json" , function(error, json) {

    var g = svg.selectAll(".arc")
        .data(pie(json))
      .enter().append("g")
        .attr("class", "arc");

    g.append("path")
        .attr("d", arc)
        .style("fill", function(d) { return d.data.color; });
  });
}


