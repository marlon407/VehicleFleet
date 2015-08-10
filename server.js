var express  = require('express'),
		app      = express();

app.use(express.static('./Public/VehicleFleet'));

app.listen(process.env.PORT, process.env.ip);
console.log("App listening on port ");