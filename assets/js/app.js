// @TODO: YOUR CODE HERE!

// Starting from 16.3.2 example ... copying directly the arrangement for svg setup
// Define SVG area dimensions, basically chart sizing from here to 30
var svgWidth = 960;
var svgHeight = 660;

// Define the chart's margins as an object
var chartMargin = {
    top: 30,
    right: 30,
    bottom: 30,
    left: 30
};

// Define dimensions of the chart area
var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

// Select body, append SVG area to it, and set the dimensions
var svg = d3
    .select("body")
    .append("svg")
    .attr("height", svgHeight)
    .attr("width", svgWidth);

// Append a group to the SVG area and shift ('translate') it to the right and down to adhere
// to the margins set in the "chartMargin" object.
var chartGroup = svg.append("g")
    .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);

// Load data 
d3.csv("assets/data/data.csv").then(function (Data) {
    console.log(Data);

}).catch(function (error) {
    console.log(error);
});



    // // log a list of names
    // var names = Data.map(data => data.name);
    // console.log("names", names);

    // // Cast each hours value in tvData as a number using the unary + operator
    // Data.forEach(function (data) {
    //     data.hours = +data.hours;
    //     console.log("Name:", data.name);
    //     console.log("Hours:", data.hours);
    // });
// }).catch(function (error) {
//     console.log(error);
// });
