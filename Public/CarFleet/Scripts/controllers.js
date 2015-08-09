'use strict';

/* Controllers */
var fleetCarControllers = angular.module('CarFleetControllers', []);

fleetCarControllers.controller('FleetListCtrl', ['$scope','$http', 'carFactory', function($scope, $http, carFactory){
    $scope.orderProp = 'modelo';//Set the property for sort
		$scope.currentPage = 0;
    $scope.pageSize = 3;
		$scope.fleetList = [];
	
		if(carFactory.getAll().length == 0){
			$http.get('Data/Fleet.json').success(function(data){
				$scope.fleetList = data;
				carFactory.setArray(data);
			});
		}
		else{
			 $scope.fleetList = carFactory.getAll();
		}
	
		$scope.numberOfPages=function(){
			return Math.ceil($scope.fleetList.length/$scope.pageSize);                
		}
  }]);

fleetCarControllers.controller('CarDetailCtrl', ['$window', '$scope', '$http', '$routeParams', 'carFactory',
  function($window, $scope, $http, $routeParams, carFactory) {
  	//Get a specific Patient 
		$scope.car = carFactory.getById($routeParams.plate);
		
		$scope.delete = function(car){
			var can_delete = confirm("Deseja mesmo excluir?")
			if (can_delete){
				carFactory.delete(car);
				window.location.href = "#/fleet/";
			}
		}
  }]);

fleetCarControllers.controller('NewCarlCtrl', ['$window', '$scope','$http', '$routeParams', 'carFactory',
  function($window, $scope, $http, $routeParams, carFactory) {
		$scope.brands = []
		$http.get('Data/Brands.json').success(function(data){
				$scope.brands = data;
			});
		
		if ($routeParams.plate)
			$scope.car = carFactory.getById($routeParams.plate);
		else
			$scope.car = {};
		
		$scope.newTemplate = "Views/_carTemplate.html" 
		
		var valideteImg = function(car){
			if (car.image === "" || car.image === undefined){
				car.image = carFactory.selectBrandImg(car.brand, $scope.brands);
			}
		}
		
		$scope.create = function(car){
			valideteImg(car);
			carFactory.create(car);
			window.location.href = "#/fleet/"+car.plate;
		}
		
		$scope.update = function(new_car){
			valideteImg(new_car);
			var old_car = carFactory.getById($routeParams.plate);
			carFactory.update(old_car, new_car);
			window.location.href = "#/fleet/"+new_car.plate;
		}
}]);
