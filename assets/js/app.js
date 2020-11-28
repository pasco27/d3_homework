// @TODO: YOUR CODE HERE!
// "Boilerplate"
// Starting from 16.3.2 example ... copying directly the arrangement for svg setup
// Define SVG area dimensions, basically chart sizing from here to 30
var svgWidth = 960;
var svgHeight = 660;

// Define the chart's margins as an object
var chartMargin = {
    top: 30,
    right: 30,
    bottom: 60,
    left: 60
};


// Define dimensions of the chart area
var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

// Select body, append SVG area to it, and set the dimensions
var svg = d3
    .select("#scatter")
    .append("svg")
    .attr("height", svgHeight)
    .attr("width", svgWidth);


// Append a group to the SVG area and shift ('translate') it to the right and down to adhere
// to the margins set in the "chartMargin" object.
var chartGroup = svg.append("g")
    .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);

// Load data 
d3.csv("assets/data/data.csv").then(function (Data) {
    // console.log(Data);

    Data.forEach(function (State) {

        // Parse data
        // State.obesity = +State.obesity;
        State.poverty = +State.poverty;
        State.smokes = +State.smokes;

        console.log(State)

    });


    // set up X scale
    var xScale = d3.scaleLinear()
        .domain(d3.extent(Data, d => d.obesity))
        .range([0, chartWidth]);


    // set up y scale 
    var yScale = d3.scaleLinear()
        .domain(d3.extent(Data, d => d.smokes))
        .range([chartHeight, 0]);


    // ==============================
    // axis bottom / left actually draws the line for the axis 
    var bottomAxis = d3.axisBottom(xScale);
    var leftAxis = d3.axisLeft(yScale);

    // ==============================
    // append = create new element, create another g within it (go to the bottom of the chart)
    chartGroup.append("g")
        .attr("transform", `translate(0, ${chartHeight})`)
        .call(bottomAxis);

    // do not need to move Y axis left/right, only (maybe) flip
    chartGroup.append("g")
        .call(leftAxis);

    // ==============================
    var circlesGroup = chartGroup.selectAll("circles")
        .data(Data)
        // since there are none, we've created 52 placeholders that are now 'append-able'
        .enter()

    circlesGroup
        .append("circle")
        .attr("cx", d => xScale(d.obesity))
        .attr("cy", d => yScale(d.smokes))
        .attr("r", "15")
        .attr("fill", "blue")
        .attr("opacity", ".5");


    // creating the state text within bubble
    var circlesGroupText = circlesGroup
        .append("text")
        .text(d => d.abbr)
        .attr("dx", d => xScale(d.obesity))
        .attr("dy", d => yScale(d.smokes))
        .classed("stateText", true);


    // Initialize tool tip
    // ==============================
    var toolTip = d3.tip()
        .attr("class", "tooltip")
        .offset([80, -60])
        .html(function (d) {
            return (`${d.obesity}<br>State: ${d.state}<br>Smokes: ${d.smokes}`);
        });


    // Create tooltip in the chart
    // ==============================
    chartGroup.call(toolTip);


    // // Create event listeners to display and hide the tooltip
    // // ==============================
    // circlesGroup.on("click", function (Data) {
    //     toolTip.show(Data, this);
    // })
    // // on-mouseout event
    // circlesGroup.on("mouseout", function (Data, index) {
    //     toolTip.hide(Data);
    // });


    // Create axes labels
    chartGroup.append("g")
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - chartMargin.left + 20)
        .attr("x", 0 - (chartHeight / 2))
        // .attr("dy", "1em")
        .attr("class", "aText")
        .text("Percentage of Smokers");

    chartGroup.append("g")
        .append("text")
        .attr("transform", `translate(${chartWidth / 2}, ${chartHeight + chartMargin.top + 20})`)
        .attr("class", "aText")
        .text("Obesity Percentage");


}).catch(function (error) {
    console.log(error);
});