angular.module("blogApp", [])
.controller('BlogVwCtrl', function ($scope) {
	console.log("got the blog View");

	$scope.blog = {}; 

	$scope.newpost= {
		blogmsg: "",
		time: ""
	}

	$scope.getBlogPosts = function() {

		$.get("/flashcards/",function(data){
			$scope.cardSet = data;
			$scope.$apply();
		});
	};

	$scope.deletePost = function(id) {

		$.ajax({
			url:"/flashcards/delete/"+id,
			type:'DELETE',
			success: $scope.getBlogPosts(),
			error: console.log("Error. Cannot delete flashcard")
		});
	};

	$scope.submitPost = function(form) {
		var now = new Date().getTime();
		$scope.newpost.time = now;
		console.log($scope.newpost);

		$.post("/flashcards/create", $scope.newpost)
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