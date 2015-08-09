angular.module('fleetFilters', [])

.filter('startFrom', function() {
	return function(input, start) {
			start = +start; //parse to int
			return input.slice(start);
	}
})
.filter('plate', function() {
	return function(input) {
		input = input.slice(0, 3) + '-' + input.slice(3);
		return input;
	}
});