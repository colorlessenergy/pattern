var alphabet = "abcedefghijklmnopqrstuvwxyz".split("");


var svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height"),
    g = svg.append("g").attr("transform", "translate(32," + (height / 2) + ")");

function update(data) {

  var t = d3.transition()
      .duration(750);

  var text = g.selectAll("text").data(data, function (d) { return d; });

  text.attr("class", "update")
    .attr("y", 0)
    .style("fill-opacity", 1)
  .transition(t)
    .attr("x", function(d, i) { return i * 32; });

  text.enter().append("text")
      .attr("class", "enter")
      .attr("dy", ".35em")
      .attr("y", -60)
      .attr("x", function (d, i) { return i * 32;})
      .style("fill-opacity", 1e-6)
      .text(function (d) { return d; })
      .transition(t)
      .attr("y", 0)
      .style("fill-opacity", 1)



  text.exit()
  .attr("class", "exit")
  .transition(t)
  .attr("y", 60)
  .style("fill-opacity", 1e-6)
  .remove();

}

update(alphabet);


d3.interval(function () {
  update(d3.shuffle(alphabet)
        .slice(0, Math.floor(Math.random() * 26))
        .sort());
}, 1500);
