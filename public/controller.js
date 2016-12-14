var app = angular.module("myApp",[]);

app.controller("myController", ["$scope","$http", function($scope, $http){

	var refresh = function() {	
		$http.get("/employeeData").success(function(response){
			console.log(response);
			$scope.employeeData = response;			
		});
	}

	refresh();	

	$scope.clear = function(){
		$scope.employee ="";
	}
	$scope.getPaySlip = function(){
		$http.post("/getPaySlip").success(function(response){
			console.log(response);
			//$scope.employeeData = response;			
		});
	}

}]);
