var express  = require('express'),
		app      = express();

app.use(express.static('./Public/VehicleFleet'));

app.listen(process.env.PORT || 5000, process.env.ip);
console.log("App listening on port ");