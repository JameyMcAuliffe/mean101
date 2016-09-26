'use strict'

angular
	.module('mean101', [])
	.controller('main', function($scope, $http) {
		//$scope.title = 'Mean 101 from Angular'
		$http
			.get('/api/title')
			.then(({data: {title}}) => {
				$scope.title = title
			})
	})

