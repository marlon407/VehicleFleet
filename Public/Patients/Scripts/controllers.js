'use strict';

/* Controllers */

var patientControllers = angular.module('patientControllers', []);

patientControllers.controller('PatientListCtrl', ['$scope','$http', function($scope, $http){
  	
  	$http.get('Data/Patient.json').success(function(data){
        $scope.patients = data;
        $scope.orderProp = 'LastName';
    });

  	$scope.reset = function(){
  		this.patient = {};
  	}
    $scope.update = function(patient) {
    	$scope.patients.push(patient);
      };
  }]);

patientControllers.controller('PatientDetailCtrl', ['$scope', '$routeParams','$http',
  function($scope, $routeParams, $http) {
    $http.get('Data/Patient.json').success(function(data){
       $scope.patient = getById(data, $routeParams.PatientId);
    });

    function getById(arr, id) {
    	for (var d = 0, len = arr.length; d < len; d += 1) {
        	if (arr[d].PatientId == id) {
            	return arr[d];
        	}
    	}
	}

  }]);

