
(function() {
  angular.module('myApp').controller('CreateCtrl', CreateCtrl)

  CreateCtrl.$inject = ['$scope', '$http', '$stateParams', '$state', '$rootScope'];
  function CreateCtrl ($scope, $http, $stateParams, $state, $rootScope) {
	console.log("got the blog View");

	$scope.cardSet = [];

	$scope.newpost= {
		time: "",
		subject:"",
		question:"",
		hint:"",
		answer:"",
		more:""
	}

  $scope.editState = !!$stateParams.id;
  console.log($stateParams.id);

	$scope.card="";

	$scope.deletePost = function(id) {

		$http.delete(
			"/flashcards/delete/"+id
			).then(
			function success(){
				$scope.getBlogPosts()
			},
			function error(){
				console.log("Error. Cannot delete flashcard")
			});
	};

	$scope.submitPost = function(form) {
		var now = new Date().getTime();
		var thisCard = $scope.newpost;
    thisCard.time = now;
		console.log($scope.newpost);

		$http.post("/flashcards/create", thisCard)
			.success(function(data){
        $state.go('cards');
			})
			.error(function(){
        console.log("Cannot save flashcard.")
			});
	};

  $scope.checkSession = function() {

    $http.post("/flashcards/loggedin")
      .then( function(data) {
        console.log(data);
      },
      function(data) {
        console.log(data);
        $rootScope.state = false;
        $state.go('login');
        console.log("Error. Cannot delete flashcard")
      });
  };


	$scope.editCard = function(index){

		$scope.newpost = $scope.cardSet[index];

		console.log("Print output ");

	}

	$scope.updatePost = function(){
			$http.post("/flashcards/update/", $scope.newpost)
				.success(function(data){
					$state.go('cards');
					console.log("post success")
				})
				.error(function(){
					console.log("Cannot save flashcard.");
				});
	}

  $scope.getCard = function(id){
      $http.get("/flashcards/" + id)
        .success(function(data){
          console.log(data);
          $scope.newpost = data[0];
          console.log("post success");
        })
        .error(function(){
          console.log("Cannot save flashcard.");
        });
  }

  if($scope.editState){
    $scope.getCard($stateParams.id);
  }

  // $scope.checkSession();

}

})();
