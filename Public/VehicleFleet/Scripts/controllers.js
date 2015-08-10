'use strict';

/* Controllers */
var vehicleFleetControllers = angular.module('vehicleFleetControllers', []);

/* List of Vehicles' controller */
vehicleFleetControllers.controller('FleetListCtrl', ['$scope','$http', 'vehicleFactory', function($scope, $http, vehicleFactory){
		$scope.currentPage = 0;
    $scope.pageSize = 3;
		$scope.fleetList = [];
	
		if(vehicleFactory.getAll().length == 0){
			$http.get('Data/Fleet.json').success(function(data){
				$scope.fleetList = data;
				vehicleFactory.setArray(data);
			});
		}
		else{
			 $scope.fleetList = vehicleFactory.getAll();
		}
	
		$scope.numberOfPages=function(){
			return Math.ceil($scope.fleetList.length/$scope.pageSize);                
		}
  }]);

/* Vehicles' detail controller */
vehicleFleetControllers.controller('VehicleDetailCtrl', ['$window', '$scope', '$http', '$routeParams', 'vehicleFactory',
  function($window, $scope, $http, $routeParams, vehicleFactory) {
		$scope.vehicle = vehicleFactory.getById($routeParams.plate);
		
		$scope.delete = function(vehicle){
			var can_delete = confirm("Deseja mesmo excluir?")
			if (can_delete){
				vehicleFactory.delete(vehicle);
				window.location.href = "#/fleet/";
			}
		}
  }]);

/* Create and Update controller */
vehicleFleetControllers.controller('NewVehicleCtrl', ['$window', '$scope','$http', '$routeParams', 'vehicleFactory',
  function($window, $scope, $http, $routeParams, vehicleFactory) {
		$scope.brands = []
		$http.get('Data/Brands.json').success(function(data){
				$scope.brands = data;
			});
		
		if ($routeParams.plate)
			$scope.vehicle = vehicleFactory.getById($routeParams.plate);
		else
			$scope.vehicle = {};
		
		$scope.newTemplate = "Views/_vehicleTemplate.html" 
		
		//Verify if there is an image uploaded, if not, load from the images json file.
		var valideteImg = function(vehicle){
			if (vehicle.image === "" || vehicle.image === undefined){
				vehicle.image = vehicleFactory.selectBrandImg(vehicle.brand, $scope.brands);
			}
		}
		
		$scope.create = function(vehicle){
			valideteImg(vehicle);
			vehicleFactory.create(vehicle);
			window.location.href = "#/fleet/"+vehicle.plate;
		}
		
		$scope.update = function(new_vehicle){
			valideteImg(new_vehicle);
			var old_vehicle = vehicleFactory.getById($routeParams.plate);
			vehicleFactory.update(old_vehicle, new_vehicle);
			window.location.href = "#/fleet/"+new_vehicle.plate;
		}
}]);
