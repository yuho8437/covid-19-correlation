


// The svg
var svg = d3.select("svg").
          call(d3.zoom()
          .scaleExtent([1, 50])  
          .on("zoom", function () {
          svg.attr("transform", d3.event.transform)
          }))
          .append("g"),
  width = +svg.attr("width"),
  height = +svg.attr("height");

// Map and projection
var path = d3.geoPath();
var projection = d3.geoMercator()
  .scale(100)
  .center([-160,81])
  .translate([width / 2, height / 2]);

// Data and color scale
var data = d3.map();
var colorScale = d3.scaleThreshold()
  .domain([100000, 1000000, 10000000, 30000000, 100000000, 500000000])
  .range(d3.schemeBlues[7]);

var tooltip = d3.select("body").append("div") 
  .attr("class", "tooltip")       
  .style("opacity", 0);

// Load external data and boot
d3.queue()
  .defer(d3.json, "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson")
  .defer(d3.csv, "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world_population.csv", function(d) { data.set(d.code, +d.pop); })
  .await(ready);

function ready(error, topo) {
  // console.log(topo)
  // console.log(topo.features)
  // Draw the map
  svg.append("g")
    .selectAll("path")
    .data(topo.features)
    .enter()
    .append("path")
      // draw each country
      .attr("d", d3.geoPath()
        .projection(projection)
      )
      .on("mouseover", function(d) {    
          tooltip.transition()    
          .duration(200)    
          .style("opacity", .9);    
          tooltip.html(d.properties.name)  
          .style("left", (d3.event.pageX) + "px")   
          .style("top", (d3.event.pageY - 28) + "px");  
        })
      .on("mouseout", function(d) {   
            tooltip.transition()    
            .duration(500)    
            .style("opacity", 0); 
          })
      // set the color of each country
      .attr("fill", function (d) {
        d.total = data.get(d.id) || 0;
        return colorScale(d.total);
      });
    }

window.onload = function() {
 document.getElementById('item1').onclick = changeFunc;
 document.getElementById('item2').onclick = changeFunc;
 document.getElementById('item3').onclick = changeFunc;
 document.getElementById('item4').onclick = changeFunc;
 document.getElementById('item5').onclick = changeFunc;
 document.getElementById('item6').onclick = changeFunc;
 document.getElementById('item7').onclick = changeFunc;
 document.getElementById('item8').onclick = changeFunc;
 document.getElementById('item9').onclick = changeFunc;
 document.getElementById('item10').onclick = changeFunc;
 document.getElementById('item11').onclick = changeFunc;
 document.getElementById('item12').onclick = changeFunc;
 document.getElementById('item13').onclick = changeFunc;
};

var changeFunc =  function(itemNumber) {
  console.log(itemNumber.target.id)
  var d3Colors=d3.schemeReds[7];
  switch(itemNumber.target.id){
    case "item1":
      d3Colors = d3.schemeBlues[7];
      break;
    case "item2":
      d3Colors = d3.schemeReds[7];
      break;
    case "item3":
      d3Colors = d3.schemeGreens[7];
      break;
    case "item4":
      d3Colors = d3.schemeOranges[7];
      break;
    case "item5":
      d3Colors = d3.schemeGreys[7];
      break;
    default:
      d3Colors = d3.schemePurples[7];
  }
  colorScale = d3.scaleThreshold()
  .domain([100000, 1000000, 10000000, 30000000, 100000000, 500000000])
  .range(d3Colors);
  d3.queue()
  .defer(d3.json, "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson")
  .defer(d3.csv, "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world_population.csv", function(d) { data.set(d.code, +d.pop); })
  .await(ready);
  };