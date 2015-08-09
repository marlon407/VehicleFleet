var express  = require('express');

var app      = express();
var port  	 = process.env.PORT || 8080;

app.use(express.static('./Public/CarFleet'));

app.listen(port);
console.log("App listening on port " + port);