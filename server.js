var express  = require('express');

var app      = express();

app.use(express.static('./Public/VehicleFleet'));

app..listen(process.env.PORT, process.env.ip)
console.log("App listening on port " + port);