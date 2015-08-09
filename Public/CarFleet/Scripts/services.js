var fleetCarService = angular.module('fleetCarService', []);

var wholeData = [];//Array that simulates a database

fleetCarService.factory("carFactory", function(){
	return{
		// Get an old data and update it with user's new value
		update: function(old_car, new_car){
			old_car.plate = new_car.plate;
			old_car.model = new_car.model;
			old_car.brand = new_car.brand;
			old_car.color = new_car.color;
			old_car.fuel = new_car.fuel;
			old_car.image = new_car.image;
			return new_car;
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
		create: function(car){
			wholeData.push(car);
			return wholeData;
		},
		//delete vehicle to the array
		delete: function(car){
			var index = wholeData.indexOf(car);
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