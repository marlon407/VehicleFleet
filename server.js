var express  = require('express');

var app      = express();

app.use(express.static('./Public/VehicleFleet'));

app..listen(process.env.PORT || 5000)
console.log("App listening on port " + port);