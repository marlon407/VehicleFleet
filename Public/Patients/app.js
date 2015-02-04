'use strict';

/* App Module */

var app = angular.module('Patient', [
  'ngRoute',
  'patientControllers'
]);

app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/patients', {
        templateUrl: 'Views/PatientList.html',
        controller: 'PatientListCtrl'
      }).
      when('/patients/:PatientId', {
        templateUrl: 'Views/PatientDetails.html',
        controller: 'PatientDetailCtrl'
      }).
      otherwise({
        redirectTo: '/patients'
      });
  }]);

