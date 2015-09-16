//just some nonsense to move objects to front easily.
d3.selection.prototype.moveToFront = function() {
  return this.each(function(){
    this.parentNode.appendChild(this);
  });
};

var width = parseInt(d3.select("#viz").style("width").slice(0, -2)),
    height = $(window).height() - 85;
//

d3.csv("data/normalData.csv", function(orig_data){
    orig_data.forEach(function(d){
        d.x = +d.x
        d.y = +d.y
    })

    //set up data with the different states of the visualization.

    var state1 = JSON.parse(JSON.stringify(orig_data)); //it's hard to clone an object!
    state1.forEach(function(d){ d.y = 1 })

    //state 2 is just the original data

    var state3 = JSON.parse(JSON.stringify(orig_data)); //it's hard to clone an object!
    state3.forEach(function(d){ d.x = 1 })

    var states = [state1, orig_data, state3]

    var updatableChart = scatter()
        .width(width).height(height)
        .data(state1)
        .animationDuration(800);

    d3.select('#viz')
      .call(updatableChart);

    var i = 1;
    window.setTimeout(function() {
        updatableChart.data(states[i]);
        i = i+1
    }, 500);

    window.setInterval(function() {
        updatableChart.data(states[i]);
        i = (i+1) % 3 ;
    }, 5500);
})
