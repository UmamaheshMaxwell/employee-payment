var app = angular.module("myApp",[]);

app.controller("myController", ["$scope","$http", function($scope, $http){

	var refresh = function() {	
		$http.get("/employeeData").success(function(response){			
			$scope.employeeData = response;			
		});
	}

	refresh();	

	$scope.clear = function(){
		$scope.employee ="";
		$scope.employeePayslip=null;
	}
	
	$scope.getPaySlip = function(){
		$http.post("/getPaySlip", $scope.employee).success(function(response){
			if(!angular.equals(response, {})){
				$scope.employeePayslip = response;	
			}		
		});
	}
}]);
