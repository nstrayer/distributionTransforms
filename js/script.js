//just some nonsense to move objects to front easily.
d3.selection.prototype.moveToFront = function() {
  return this.each(function(){
    this.parentNode.appendChild(this);
  });
};

var width = parseInt(d3.select("#viz").style("width").slice(0, -2)),
    height = $(window).height() - 120;


// d3.csv("data/normalData.csv", function(orig_data){
normal_descrips = ["Start with some points drawn from the normal distribution.",
                  "Drop those points (transform them) onto the CDF of the normal...",
                  "...and end up with uniformly distributed points." ]

chi2_descrips = ["Start with some points drawn from the normal distribution.",
                "Drop those points (transform them) onto the equation y = x^2...",
                "...and end up with chi_squared distributed points." ]

function runViz(fileName, descrips){
    d3.csv("data/" + fileName, function(orig_data){
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

        var states = [{"desc": descrips[0], "data": state1},
                      {"desc": descrips[1], "data":orig_data},
                      {"desc": descrips[2], "data":state3}
                     ]

        var updatableChart = scatter()
            .width(width).height(height)
            .data(state1)
            .animationDuration(800);

        d3.select('#viz')
          .call(updatableChart);

        var i = 1;

        function nextButton(){
            updatableChart.data(states[i].data);
            d3.select("#text").text(states[i].desc)
            i = (i+1) % 3 ;
        }
        d3.select("#text").text(states[0].desc)
        d3.select("#next").on("click",nextButton)
    })
}

//initialize the viz
runViz("chiSquaredVals.csv", chi2_descrips)

//allow the user to change which transform they see.
d3.selectAll(".typeChoose").on("click", function(d){
    var selection = d3.select(this)
    console.log(selection.attr("fileName"))
    d3.selectAll(".typeChoose").classed("selected", false)
    selection.classed("selected", true)
    d3.select("svg").remove()
    if(selection.attr("id") == "normal"){ //grab the correct descrips for the viz
        var descrips = normal_descrips
    } else {
        var descrips = chi2_descrips
    }
    runViz(selection.attr("fileName"), descrips)
})
