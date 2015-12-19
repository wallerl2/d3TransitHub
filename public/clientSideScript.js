/**
 * Created by Lawrence Waller.
 */

/* wrote this for a class, comes in handy all the time cause my memory's not fantastic */
/* AJAX request function that requires response */

function getPageWithCallback(url, callback) {
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function() {
        if (httpRequest.readyState == 4 && httpRequest.status == 200)
            callback(httpRequest.responseText);
    }

    httpRequest.open("GET", url, true);
    httpRequest.send(null);
}

function nullFunc(whichDataset){
    var myData = undefined;
    var myGauss = undefined;
    var myColorArray = undefined;
    var colorTransformArray = undefined;

    d3.selectAll('svg').remove();

    var arg1 = "/getDatasetA", arg2 = "/getGausssetA";

    if(whichDataset==='B'){
        arg1 = "/getDatasetB", arg2 = "/getGausssetB";
    }
    else if(whichDataset==='C'){
        mainFunc(JSON.parse(document.getElementById('input1').value), JSON.parse(document.getElementById('input2').value));
        return;
    }

        getPageWithCallback(arg1, function (data) {
            getPageWithCallback(arg2, function (gauss) {
                mainFunc(JSON.parse(data), JSON.parse(gauss));
            });
        });
}

function mainFunc(myData, myGauss, colorArray, colorTransformArray) {
    var padding = 50;
    //sample scatterplot dataset
    // data format: [x coord, y coord, color group]
    if(myData===undefined) {
        var myData = [[79, 1537, 2], [-43, 1421, 2], [49, 1305, 0], [24, 1121, 0], [58, 939, 1], [-27, 800, 1], [52, 708, 1], [-5, 1648, 2], [-30, 1451, 2], [30, 1309, 0], [53, 1151, 0], [74, 1001, 1], [9, 905, 1], [4, 1628, 2], [-87, 1457, 2], [7, 1731, 2], [74, 1628, 2], [-2, 1648, 2], [-43, 1508, 2], [52, 1351, 0], [32, 1209, 0], [52, 1031, 0], [-10, 921, 1], [47, 753, 1], [120, 1856, 2], [49, 1528, 2], [38, 1421, 2], [26, 1251, 0], [72, 1109, 0], [14, 951, 1], [183, 821, 1], [2, 708, 1], [-110, 1035, 0], [29, 1457, 2], [97, 1612, 2], [2, 1423, 2], [60, 1657, 2], [26, 1517, 2], [-86, 1351, 0], [117, 1221, 0], [88, 1051, 0], [16, 901, 1], [31, 738, 1], [-6, 1856, 2], [210, 1528, 2], [3, 1409, 2], [39, 1239, 0], [30, 1109, 0], [-15, 951, 1], [30, 818, 1], [-69, 708, 1], [17, 1617, 2], [-30, 1439, 2], [37, 1309, 0], [32, 1139, 0], [13, 1021, 0], [56, 839, 1], [7, 713, 1], [5, 1637, 2], [17, 1457, 2], [-73, 1739, 2], [13, 1557, 2], [48, 1423, 2], [95, 1657, 2], [59, 1517, 2], [-39, 1339, 0], [32, 1221, 0], [81, 1051, 0], [383, 909, 1], [56, 808, 1], [-8, 1856, 2], [100, 1548, 2], [-7, 1435, 2], [89, 1239, 0], [50, 1109, 0], [28, 939, 1], [32, 821, 1], [8, 708, 1], [-14, 1451, 2], [87, 1309, 0], [-19, 1139, 0], [2, 1001, 1], [4, 848, 1], [33, 709, 1], [-38, 1637, 2], [-50, 1508, 2], [35, 1731, 2], [29, 1628, 2], [190, 1423, 2], [48, 1648, 2], [-4, 1517, 2], [51, 1351, 0], [63, 1235, 0], [88, 1051, 0], [91, 921, 1], [33, 749, 1], [-105, 1856, 2], [70, 1537, 2], [-23, 1435, 2], [15, 1251, 0], [96, 1109, 0], [-47, 939, 1], [36, 800, 1], [34, 708, 1], [-91, 1632, 2], [48, 1439, 2], [26, 1321, 0], [74, 1139, 0], [-9, 1001, 1], [-11, 851, 1], [70, 728, 1], [-111, 1637, 2], [-25, 1457, 2], [-98, 1739, 2], [9, 1557, 2], [-2, 1423, 2]];
    }
    // graph supports up to five different colors of data by default
    // provide your own color schema by argument
    if(colorArray===undefined) {
        colorArray = ["red", "blue", "green", "black", "gold"];
    }

    // these make the lines in the gauss graph slightly lighter than their dots
    // provide your own line color schema by argument
    if(colorTransformArray===undefined) {
       colorTransformArray = ["orange", "lightblue", "lightgreen", "gray", "khaki"];
    }

    //Width and height of parent svg boxes
    var w = 500;
    var h = 500;

    // Define x and y scales
    var xScale = d3.scale.linear()
        .domain([d3.min(myData, function (d) {
            return d[0];
        })
            , d3.max(myData, function (d) {
                return d[0];
            })])
        .range([padding, w - padding]);

    var yScale = d3.scale.linear()
        .domain([d3.min(myData, function (d) {
            return d[1];
        })
            , d3.max(myData, function (d) {
                return d[1];
            })])
        .range([h - padding, padding]);

    /* Code to create the axes */
    var xAxis = d3.svg.axis();
    xAxis.scale(xScale);
    xAxis.orient("bottom");

    var yAxis = d3.svg.axis();
    yAxis.scale(yScale);
    yAxis.orient("left");

    /* This code creates a parent svg element for scatterplot with height and width determined by above variables */
    var svg = d3.select("body")
        .append("svg")
        .attr("width", w)
        .attr("height", h);

    // create first scatterplot
    svg.selectAll("circle")
        .data(myData)
        .enter()
        .append("circle")
        .attr("cx", function (d) {
            return xScale(d[0]);
        })
        .attr("cy", function (d) {
            return yScale(d[1]);
        })
        .attr("r", function (d) {
            return 3;
        })
        .attr("fill", function (d) {

            //references colorArray above for applicable colors
            return colorArray[d[2]];
        });

    svg.append("g").attr("class", "axis").attr("transform", "translate(0," + (h - padding) + ")").call(xAxis);

    svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(" + padding + ",0)")
        .call(yAxis);

    //add click events to first svg
    addEvents(svg);

    var svgSpace = d3.select("body")
        .append("svg")
        .attr("width", 50)
        .attr("height", 500);

    // sample gauss dataset
    if(myGauss===undefined) {
        myGauss = [[-111, 0.00099630170368793149, 0], [-105, 0.001181582160059171, 0], [-98, 0.0014264527972348477, 0], [-91, 0.0017024329960902561, 0], [-87, 0.0018738147470415453, 0], [-73, 0.002545170735525269, 0], [-50, 0.0038102090182948428, 0], [-43, 0.0042034605697322284, 0], [-43, 0.0042034605697322284, 0], [-38, 0.0044774175833101129, 0], [-30, 0.0048934458791548901, 0], [-30, 0.0048934458791548901, 0], [-25, 0.0051336724232604342, 0], [-23, 0.0052244664866364339, 0], [-14, 0.0055882051503906346, 0], [-8, 0.0057834237510354701, 0], [-7, 0.0058118538445824314, 0], [-6, 0.0058390568560436965, 0], [-5, 0.0058650142794507256, 0], [-4, 0.0058897084008905191, 0], [-2, 0.0059352399624631727, 0], [-2, 0.0059352399624631727, 0], [2, 0.0060104564978046959, 0], [3, 0.0060258820534486402, 0], [4, 0.006039933337352036, 0], [5, 0.0060526005604262809, 0], [7, 0.0060737484335979678, 0], [9, 0.0060892665598273523, 0], [13, 0.0061032555655659996, 0], [17, 0.0060944107814261128, 0], [17, 0.0060944107814261128, 0], [26, 0.0059919484468623219, 0], [29, 0.0059331293124212986, 0], [29, 0.0059331293124212986, 0], [35, 0.0057805711579219073, 0], [38, 0.0056877689190903804, 0], [48, 0.005307687254933067, 0], [48, 0.005307687254933067, 0], [48, 0.005307687254933067, 0], [49, 0.0052643237175761803, 0], [59, 0.0047876727069958418, 0], [60, 0.0047363475656998421, 0], [70, 0.0041980143218091669, 0], [74, 0.0039740914125315054, 0], [79, 0.0036914173184714521, 0], [95, 0.0028026757738768642, 0], [97, 0.002696439132886893, 0], [100, 0.0025401238254631614, 0], [120, 0.0016164804926530887, 0], [190, 0.00015899265753931314, 0], [210, 6.6393016865345247e-05, 0], [-69, 0.0019881347213616236, 1], [-47, 0.0028688826752636108, 1], [-27, 0.0037178310541490793, 1], [-15, 0.0041986589892422793, 1], [-11, 0.00434773828017717, 1], [-10, 0.0043838921025208654, 1], [-9, 0.0044195660282666102, 1], [2, 0.0047756811258674774, 1], [2, 0.0047756811258674774, 1], [4, 0.0048323404285081717, 1], [7, 0.004912082148674727, 1], [8, 0.0049372100070433252, 1], [9, 0.0049615901457134249, 1], [14, 0.0050718559653198571, 1], [16, 0.0051103243646010597, 1], [28, 0.0052686037626981071, 1], [30, 0.0052823804006961973, 1], [31, 0.0052878813292947923, 1], [32, 0.0052924532912020277, 1], [33, 0.0052960938679101534, 1], [33, 0.0052960938679101534, 1], [34, 0.0052988011326044167, 1], [36, 0.0053014104869199014, 1], [47, 0.0052490874806916683, 1], [52, 0.0051886939847589023, 1], [56, 0.0051245645911620766, 1], [56, 0.0051245645911620766, 1], [58, 0.0050874044648065173, 1], [70, 0.0047983263131174334, 1], [74, 0.0046791477161641955, 1], [91, 0.0040743103206227621, 1], [183, 0.00079468867455286115, 1], [383, 1.3109231996734232e-07, 1], [-110, 6.8386647216774849e-05, 2], [-86, 0.00028365692663499944, 2], [-39, 0.0022330271929615576, 2], [-19, 0.004019796334041416, 2], [13, 0.0071816262265810508, 2], [15, 0.0073380296865844822, 2], [24, 0.0079136131178749961, 2], [26, 0.0080092870621219659, 2], [26, 0.0080092870621219659, 2], [30, 0.0081615954711286107, 2], [30, 0.0081615954711286107, 2], [32, 0.008217452944376381, 2], [32, 0.008217452944376381, 2], [32, 0.008217452944376381, 2], [37, 0.0082956675226868969, 2], [39, 0.0083019567559423132, 2], [49, 0.0081197319055346991, 2], [50, 0.0080824570807094265, 2], [51, 0.0080418700397613396, 2], [52, 0.0079980224724301233, 2], [52, 0.0079980224724301233, 2], [53, 0.0079509700215844043, 2], [63, 0.0073189877832307805, 2], [72, 0.0065463396899826569, 2], [74, 0.0063556870926247304, 2], [81, 0.0056534308295793437, 2], [87, 0.0050279520876842995, 2], [88, 0.0049231837706213838, 2], [88, 0.0049231837706213838, 2], [89, 0.0048185113936798666, 2], [96, 0.0040955735331689135, 2], [117, 0.0022142495993488229, 2]];
    }

    var svg2 = d3.select("body")
        .append("svg")
        .attr("width", w)
        .attr("height", h);

    xScale = d3.scale.linear()
        .domain([d3.min(myGauss, function (d) {
            return d[0];
        })
            , d3.max(myGauss, function (d) {
                return d[0];
            })])
        .range([padding, w - padding]);

    yScale = d3.scale.linear()
        .domain([d3.min(myGauss, function (d) {
            return d[1];
        })
            , d3.max(myGauss, function (d) {
                return d[1];
            })])
        .range([h - padding, padding]);

    xAxis = d3.svg.axis();
    xAxis.scale(xScale);
    xAxis.orient("bottom");

    yAxis = d3.svg.axis();
    yAxis.scale(yScale);
    yAxis.orient("left");

    svg2.append("g").attr("class", "axis").attr("transform", "translate(0," + (h - padding) + ")").call(xAxis);

    svg2.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(" + padding + ",0)")
        .call(yAxis);

    /* DRAW LINES FIRST */
    /* CITATION: read this tutorial http://code.tutsplus.com/tutorials/building-a-multi-line-chart-using-d3js--cms-22935 */
    var colorRed = [];
    var colorGreen = [];
    var colorBlue = [];

    for (var i=0; i<myGauss.length; i++){
        if(myGauss[i][2] === 1){
            colorBlue.push(myGauss[i]);
        }
        else if(myGauss[i][2] === 0){
            colorRed.push(myGauss[i]);
        }
        else{
            colorGreen.push(myGauss[i]);
        }
    }

    drawLine("lightgreen", colorGreen, svg2);
    drawLine("orange", colorRed, svg2);
    drawLine("lightblue", colorBlue, svg2);

    /* Function to draw a line, given color, the array of points to connect in order, and the svg parent element */
    function drawLine(color, array, svgElemToAppend){
        var lineGen = d3.svg.line()
            .x(function(d){return xScale(d[0]);})
            .y(function(d){return yScale(d[1]);})
            .interpolate("linear");

        svgElemToAppend.append('svg:path')
            .attr('d', lineGen(array))
            .attr('stroke', color)
            .attr('stroke-width', 2)
            .attr('fill', 'none');
    }

    svg2.selectAll("circle")
        .data(myGauss)
        .enter()
        .append("circle")
        .attr("cx", function (d) {
            return xScale(d[0]);
        })
        .attr("cy", function (d) {
            return yScale(d[1]);
        })
        .attr("r", function (d) {
            return 3;
        })
        .attr("fill", function (d) {
            if (d[2] === 0) {
                return "red";
            }
            else if (d[2] === 1) {
                return "blue";
            }
            else return "green";
        });

    //add click events to datapoints
    addEvents(svg2);

    //CITATION: got this code from http://stackoverflow.com/questions/10805184/d3-show-data-on-mouseover-of-circle
    var tooltip = d3.select("body")
        .append("div")
        .style("position", "absolute")
        .style("z-index", "10")
        .style("visibility", "hidden")
        .style("background-color", "rgb(255,255,255")
        .style("border-radius", "1px")
        .style("border-style", "dotted")
        .style("border-color", "black")
        .text("a simple tooltip");

    //event trigger for both svgs

    //when we mouse over a circle, change mouse to crosshair
    d3.selectAll("circle").style("cursor", "crosshair");
    function addEvents(mySvg){
        //CITATION: modified off of example at http://stackoverflow.com/questions/10805184/d3-show-data-on-mouseover-of-circle
        d3.selectAll("circle").on("mouseover", function(){
        tooltip.style("color", colorArray[d3.select(this).data()[0][2]]);
        tooltip.text("x= " + d3.select(this).data()[0][0] + ", y= " + d3.select(this).data()[0][1]);
        return tooltip.style("visibility", "visible");
    })
            .on("mousemove", function(){return tooltip.style("top",
                (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+30)+"px");})
            .on("mouseout", function(){return tooltip.style("visibility", "hidden");});

    }

}