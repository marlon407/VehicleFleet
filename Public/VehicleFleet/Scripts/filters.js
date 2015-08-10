angular.module('fleetFilters', [])

//Pagination filter
.filter('startFrom', function() {
	return function(input, start) {
			start = +start; //parse to int
			return input.slice(start);
	}
})
//Valid plae filter
.filter('plate', function() {
	return function(input) {
		input = input.slice(0, 3) + '-' + input.slice(3);
		return input;
	}
});