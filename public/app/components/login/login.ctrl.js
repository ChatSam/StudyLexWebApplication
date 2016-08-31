
(function() {
  angular.module('myApp').controller('LoginCtrl', LoginCtrl)

  LoginCtrl.$inject = ['$scope', '$http'];
  function LoginCtrl ($scope, $http) {

	$scope.account= {
		username: "",
		password:""
	}

	$scope.login = function(){
			console.log($scope.account);

			$http.post("/flashcards/login/", $scope.account)
				.success(function(data){
					console.log("post success")

				})
				.error(function(){
					console.log("Cannot save newAccount.");
				});
	}

}

})();
