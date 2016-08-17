
(function() {
  angular.module('myApp').controller('BlogVwCtrl', BlogVwCtrl)

  BlogVwCtrl.$inject = ['$scope', '$http'];
  function BlogVwCtrl ($scope, $http) {
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

	$scope.submitPost = function(form) {
		var now = new Date().getTime();
		var thisCard = $scope.newpost;
    thisCard.time = now;
		console.log($scope.newpost);

		$http.post("/flashcards/create", thisCard)
			.success(function(data){
				$scope.getBlogPosts();

			})
			.error(function(){
        console.log("Cannot save flashcard.")
			});
	};


	$scope.editCard = function(index){

		$scope.newpost = $scope.cardSet[index];

		console.log("Print output ");

	}

	$scope.updatePost = function(){
			console.log($scope.newpost);
			console.log($scope.newPost);

			$http.post("/flashcards/update/", $scope.newpost)
				.success(function(data){
					$scope.getBlogPosts();
					console.log("post success")

					//updateButton.toggle();
					//mainButton.toggle();
				})
				.error(function(){
					console.log("Cannot save flashcard.");
				});
	}
	$scope.getBlogPosts();

}

})();
