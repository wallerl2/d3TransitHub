/**
 * Created by Lawrence Waller.
 */

var express = require('express');
var app = express();
var path = require('path');
var cors = require('cors');

var whichDataSetIsDisplayed = 'A';

app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

// sample data being served by server
var myDataA = [[79, 1537, 2], [-43, 1421, 2], [1000,10,1]];
var myGaussA = [[-111, 0.00099630170368793149, 0], [-105, 0.001181582160059171, 0]];
var myDataB = [[40,50,0],[40,70,1],[80,90,2]];
var myGaussB = [[5, 0.0060526005604262809, 0], [7, 0.0060737484335979678, 0], [9, 0.0060892665598273523, 0], [13, 0.0061032555655659996, 0], [17, 0.0060944107814261128, 0], [17, 0.0060944107814261128, 0], [26, 0.0059919484468623219, 0], [29, 0.0059331293124212986, 0], [29, 0.0059331293124212986, 0], [35, 0.0057805711579219073, 0], [38, 0.0056877689190903804, 0], [48, 0.005307687254933067, 0], [48, 0.005307687254933067, 0], [48, 0.005307687254933067, 0], [49, 0.0052643237175761803, 0], [59, 0.0047876727069958418, 0], [60, 0.0047363475656998421, 0], [70, 0.0041980143218091669, 0], [74, 0.0039740914125315054, 0], [79, 0.0036914173184714521, 0], [95, 0.0028026757738768642, 0], [97, 0.002696439132886893, 0], [100, 0.0025401238254631614, 0], [120, 0.0016164804926530887, 0], [190, 0.00015899265753931314, 0], [210, 6.6393016865345247e-05, 0], [-69, 0.0019881347213616236, 1], [-47, 0.0028688826752636108, 1], [-27, 0.0037178310541490793, 1], [-15, 0.0041986589892422793, 1], [-11, 0.00434773828017717, 1], [-10, 0.0043838921025208654, 1], [-9, 0.0044195660282666102, 1], [2, 0.0047756811258674774, 1], [2, 0.0047756811258674774, 1], [4, 0.0048323404285081717, 1], [7, 0.004912082148674727, 1], [8, 0.0049372100070433252, 1], [9, 0.0049615901457134249, 1], [14, 0.0050718559653198571, 1], [16, 0.0051103243646010597, 1], [28, 0.0052686037626981071, 1], [30, 0.0052823804006961973, 1], [31, 0.0052878813292947923, 1], [32, 0.0052924532912020277, 1], [33, 0.0052960938679101534, 1], [33, 0.0052960938679101534, 1], [34, 0.0052988011326044167, 1], [36, 0.0053014104869199014, 1], [47, 0.0052490874806916683, 1], [52, 0.0051886939847589023, 1], [56, 0.0051245645911620766, 1], [56, 0.0051245645911620766, 1], [58, 0.0050874044648065173, 1], [70, 0.0047983263131174334, 1], [74, 0.0046791477161641955, 1], [91, 0.0040743103206227621, 1], [183, 0.00079468867455286115, 1], [383, 1.3109231996734232e-07, 1], [-110, 6.8386647216774849e-05, 2], [-86, 0.00028365692663499944, 2], [-39, 0.0022330271929615576, 2], [-19, 0.004019796334041416, 2], [13, 0.0071816262265810508, 2], [15, 0.0073380296865844822, 2], [24, 0.0079136131178749961, 2], [26, 0.0080092870621219659, 2], [26, 0.0080092870621219659, 2], [30, 0.0081615954711286107, 2], [30, 0.0081615954711286107, 2], [32, 0.008217452944376381, 2], [32, 0.008217452944376381, 2]];
app.get('/', function (req, res) {
    res.sendFile( __dirname + "/" + "transit.html" );
});

app.get('/getDatasetA', function (req, res) {
    console.log('sending ' + myDataA);
    res.end(JSON.stringify(myDataA));
});

app.get('/getGausssetA', function (req, res) {
    console.log('sending ' + myGaussA);
    res.end(JSON.stringify(myGaussA));
});

app.get('/getDatasetB', function (req, res) {
    console.log('sending ' + myDataB);
    res.end(JSON.stringify(myDataB));
});

app.get('/getGausssetB', function (req, res) {
    console.log('sending ' + myGaussB);
    res.end(JSON.stringify(myGaussB));
});

var server = app.listen(8080, function () {
    console.log("Server listening at http://localhost:8080");
});