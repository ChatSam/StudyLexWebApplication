
(function() {
  angular.module('myApp').controller('RegisterCtrl', RegisterCtrl)

  RegisterCtrl.$inject = ['$scope', '$http'];
  function RegisterCtrl ($scope, $http) {
    console.log("RegisterCtrl");

  	$scope.newAccount= {
  		username: "",
  		password:""
  	}
    $scope.registerAccount = function(){
  		console.log('this is a test');
  		console.log($scope.newAccount);

  		$http.post("/flashcards/register", $scope.newAccount)
  		  .success(function(data){
  			     console.log("post success")
  			})
  			.error(function(){
  				console.log("Cannot save newAccount.");
  			});
  	}
}

})();
