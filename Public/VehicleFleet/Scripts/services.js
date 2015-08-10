var fleetVehicleService = angular.module('fleetVehicleService', []);

var wholeData = [];//Array that simulates a database

fleetVehicleService.factory("vehicleFactory", function(){
	return{
		// Get an old data and update it with user's new value
		update: function(old_vehicle, new_vehicle){
			old_vehicle.plate = new_vehicle.plate;
			old_vehicle.model = new_vehicle.model;
			old_vehicle.brand = new_vehicle.brand;
			old_vehicle.color = new_vehicle.color;
			old_vehicle.fuel = new_vehicle.fuel;
			old_vehicle.image = new_vehicle.image;
			return new_vehicle;
		},
		//Set the list of vehicles into the array
		setArray: function(data){
			wholeData = data;
			return wholeData;
		},
		//Returns all vehicles into the array
		getAll: function(){
			return wholeData;
		},
		//Add a new vehicle to the array
		create: function(vehicle){
			wholeData.push(vehicle);
			return wholeData;
		},
		//delete vehicle to the array
		delete: function(vehicle){
			var index = wholeData.indexOf(vehicle);
			if (index > -1)
					wholeData.splice(index, 1);
			else
				alert("Ocorreu um erro, solicite suporte!")
			return wholeData;
			
		},
		// Get a specific vehicle by the plate
		getById: function(plate){
			var arr = wholeData;
			for (var d = 0; d < arr.length; d += 1) {
				if(arr[d].plate == plate){
					return arr[d];
				}	
			}
		},
		//If the vehicle has no image, upload it from json file
		selectBrandImg: function(brand, brands){
			for (var b = 0; b < brands.length; b += 1) {
				if(brands[b].name == brand){
					return brands[b].image;
				}	
			}
		}
	}
});