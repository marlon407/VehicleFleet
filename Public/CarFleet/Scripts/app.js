'use strict';

/* App Module */

var app = angular.module('FleetCar', [
  'ngRoute',//routes
  'CarFleetControllers',//Adding the controllers
	'fleetCarService',
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
        templateUrl: 'Views/newCar.html',
        controller: 'NewCarlCtrl'
      }).
      when('/fleet/update/:plate', {
        templateUrl: 'Views/updateCar.html',
        controller: 'NewCarlCtrl'
      }).
      when('/fleet/:plate', {
        templateUrl: 'Views/carDetails.html',
        controller: 'CarDetailCtrl'
      }).
      when('/home', {
        templateUrl: 'Views/home.html'
      }).
      otherwise({
        redirectTo: '/home'
      });
  }]);

