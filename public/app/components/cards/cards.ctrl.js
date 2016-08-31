
(function() {
  angular.module('myApp').controller('CardsCtrl', CardsCtrl)

  CardsCtrl.$inject = ['$scope', '$http'];
  function CardsCtrl ($scope, $http) {
	console.log("CardsCtrl");

	$scope.cardSet = [];

	$scope.newpost= {
		time: "",
		subject:"",
		question:"",
		hint:"",
		answer:"",
		more:""
	}

	$scope.card="";

	$scope.getBlogPosts = function() {

		$http.get("/flashcards/cards").then(function(result){
			$scope.cardSet = result.data;
		}, function () {
      $scope.cardSet = [];
    });
	};

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

	$scope.updatePost = function(){
			console.log('go to update posts');
	}
	$scope.getBlogPosts();

}

})();
