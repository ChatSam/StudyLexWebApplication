
(function() {
  angular.module('myApp').controller('BlogVwCtrl', BlogVwCtrl)

  BlogVwCtrl.$inject = ['$scope', '$http'];
  function BlogVwCtrl ($scope, $http) {
	console.log("got the blog View");

	$scope.blog = {};

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

		$http.get("/flashcards").success(function(data){
			$scope.cardSet = data;
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
		$scope.newpost.time = now;
		console.log($scope.newpost);

		//var exist = $http.get("/flashcards/"+)

		$http.post("/flashcards/create", $scope.newpost)
			.success(function(data){
				$scope.getBlogPosts();

			})
			.error(function(){
				window.alert("Cannot save flashcard.")
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
					window.alert("Cannot save flashcard.");
				});
	}
	$scope.getBlogPosts();

}

})();
