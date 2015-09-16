//just some nonsense to move objects to front easily.
d3.selection.prototype.moveToFront = function() {
  return this.each(function(){
    this.parentNode.appendChild(this);
  });
};

var width = parseInt(d3.select("#viz").style("width").slice(0, -2)),
    height = $(window).height() - 85;
// 
// var svg = d3.select("#viz").append("svg")
//     .attr("height", height)
//     .attr("width", width)

d3.csv("data/normalData.csv", function(data){
    data.forEach(function(d){
        d.x = +d.x
        d.y = +d.y
    })

    var updatableChart = scatter().width(width).height(height).data(data);

    d3.select('#viz')
            .call(updatableChart);
})
