angular.module("blogApp", [])
.controller('BlogVwCtrl', function ($scope,$http) {
	console.log("got the blog View");

	$scope.blog = {}; 

	$scope.newpost= {
		blogmsg: "",
		time: ""
	}

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

		$http.post("/flashcards/create", $scope.newpost)
			.success(function(data){
				$scope.getBlogPosts();
			})
			.error(function(){
				window.alert("Cannot save flashcard.")
			});
	};

	// $scope.editCard = function(id){
	// 	$.get("/flashcards/"+id, function(data){
	// 		$scope.newpost.blogmsg = data;
	// 		$scope.$apply();
	// 	});
    //
	// };

	$scope.getBlogPosts();
	
});