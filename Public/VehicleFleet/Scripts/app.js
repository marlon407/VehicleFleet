'use strict';

/* App Module */

var app = angular.module('VehicleFleet', [
  'ngRoute',//routes
  'vehicleFleetControllers',//Adding the controllers
	'fleetVehicleService',
	'fleetFilters'
]);

//Providing routes for the whole applicarion so far
//I am not using Express at this point.
app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/fleet', {
        templateUrl: 'Views/fleetList.html',
        controller: 'FleetListCtrl'
      }).
			when('/fleet/new', {
        templateUrl: 'Views/newVehicle.html',
        controller: 'NewVehicleCtrl'
      }).
      when('/fleet/update/:plate', {
        templateUrl: 'Views/updateVehicle.html',
        controller: 'NewVehicleCtrl'
      }).
      when('/fleet/:plate', {
        templateUrl: 'Views/vehicleDetails.html',
        controller: 'VehicleDetailCtrl'
      }).
      when('/home', {
        templateUrl: 'Views/home.html'
      }).
      otherwise({
        redirectTo: '/home'
      });
  }]);

