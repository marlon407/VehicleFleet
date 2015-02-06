'use strict';

/* Controllers */

var patientControllers = angular.module('patientControllers', []);

var wholeData = [];
var setArray = function(data)
{
	wholeData = data;
};

var GetArray = function()
{
	return wholeData;
}

var AddNewObj = function(patient)
{
	wholeData.push(patient);
}

var getById = function(id) {
	var arr = GetArray();
	for (var d = 0; d < arr.length; d += 1) {
    	if (arr[d].PatientId == id) {
        	return arr[d];
    	}
	}
}

var findMaxId = function(){
	var maxid = 0;
	GetArray().map(function(obj){     
    	if (obj.PatientId > maxid) maxid = obj.PatientId;    
	});
	return maxid;
}

patientControllers.controller('PatientListCtrl', ['$scope','$http', function($scope, $http){
    $scope.orderProp = 'LastName';
  	if(GetArray().length == 0){
  	$http.get('Data/Patient.json').success(function(data){
        $scope.patients = data;
        setArray(data);
    });
  }
  else
  	 $scope.patients = GetArray();
  }]);

patientControllers.controller('PatientDetailCtrl', ['$window', '$scope', '$routeParams',
  function($window,$scope, $routeParams) {
    
	$scope.patient = getById($routeParams.PatientId);

    $scope.reset = function(){
  		this.patient = {};
  	}
    $scope.update = function(patient) {
    	if(patient.PatientId == undefined){
	    	patient.PatientId = findMaxId() + 1;
	    	AddNewObj(patient);    	
	    }
	    else{
	    	var tempPatient = getById($routeParams.PatientId);
	    	tempPatient.FirstName = patient.FirstName;
	    	tempPatient.LasttName = patient.LasttName;
	    	tempPatient.Status = patient.Status;
	    	tempPatient.lastVisitDate = patient.lastVisitDate;
	    	tempPatient.PhoneNo = patient.PhoneNo;
	    }
	    $window.alert("Successful operation");
      };



  }]);



patientControllers.filter('tel', function () {
    return function (tel) {
        if (!tel) { return ''; }

        var value = tel.toString().trim().replace(/^\+/, '');

        if (value.match(/[^0-9]/)) {
            return tel;
        }

        var country, city, number;

        switch (value.length) {
            case 10: // +1PPP####### -> C (PPP) ###-####
                country = 1;
                city = value.slice(0, 3);
                number = value.slice(3);
                break;

            case 11: // +CPPP####### -> CCC (PP) ###-####
                country = value[0];
                city = value.slice(1, 4);
                number = value.slice(4);
                break;

            case 12: // +CCCPP####### -> CCC (PP) ###-####
                country = value.slice(0, 3);
                city = value.slice(3, 5);
                number = value.slice(5);
                break;

            default:
                return tel;
        }

        if (country == 1) {
            country = "";
        }

        number = number.slice(0, 3) + '-' + number.slice(3);

        return (country + " (" + city + ") " + number).trim();
    };
});