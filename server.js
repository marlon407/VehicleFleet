var express  = require('express');

var app      = express();
var port  	 = process.env.PORT || 5000;
var ip  	 = process.env.ip;

app.use(express.static('./Public/VehicleFleet'));

app.listen(port, ip);
console.log("App listening on port " + port);