(function(window, document, angular, undefined) {
 	'use strict';

	angular.module('pricing', [])

	.controller('PricingCtrl', ['$scope', function($scope) {

		console.log('hey!');

		$scope.activeUsers = 1;
		$scope.maxUsers = 1;
		$scope.usedStorage = 0.1;
		$scope.maxStorage = 1;
		$scope.cost = 0;
		$scope.groupLevel = 0;


		// Add User - Increase Admin cap
		$scope.addUser = function() {
		    $scope.maxUsers++;
		    $scope.updateAll();

		    if ( $scope.groupLevel == 0 ) {
		        $scope.groupLevel = 1;
		        $scope.updateAll();
		    }
		};


		// Remove User - Decrease Admin cap
		$scope.removeUser = function() {
		    if ( $scope.maxUsers !== 1 ) {
		        $scope.maxUsers--;
		        $scope.updateAll();
		    }
		};


		// Update All - for calling on all of the abstracted update-functions
		$scope.updateAll = function() {
		    $scope.updatePlan();
		    $scope.updateStorage();
		    $scope.updateCost();
		};


		// Update storage value based on group level
		$scope.updateStorage = function() {
		    if ( $scope.groupLevel == 1 ) {
		        $scope.maxStorage = $scope.maxUsers * 5;
		    } else if ( $scope.groupLevel == 2 ) {
		        $scope.maxStorage = $scope.maxUsers * 10;
		    }
		};


		// Update cost value based on group level
		$scope.updateCost = function() {
		    if ( $scope.groupLevel == 1 ) {
		        $scope.cost = $scope.maxUsers * 3;
		    } else if ( $scope.groupLevel == 2 ) {
		        $scope.cost = $scope.maxUsers * 8;
		    }
		};


		// Update plan
		$scope.updatePlan = function() {
		    // Reset the values if the free plan was selected
		    if ( $scope.groupLevel == 0 ) {
		        $scope.cost = 0;
		        $scope.maxStorage = 1;
		        $scope.maxUsers = 1;
		    }
		};
	}]);

})(window, document, angular, undefined);