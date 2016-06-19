angular.module("blogApp", [])
.controller('BlogVwCtrl', function ($scope) {
	console.log("got the blog View");

	$scope.blog = {}; 

	$scope.newpost= {
		blogmsg: "",
		time: ""
	}

	$scope.getBlogPosts = function() {
		$.get( "/blog/posts", function( data ) {

  			$scope.blog = data;
  			$scope.$apply();
		});
	};

	$scope.deletePost = function(id) {
		// console.log("delete post " + id + ".");
		// $.delete( "/blog/deletepost/" +id, function( data ) {
  // 			$scope.getBlogPosts();
		// });

		$.ajax({
		    url: "/blog/deletepost/" +id,
		    type: 'DELETE',
		    success: $scope.getBlogPosts(),
		    error: console.log("error")
		});
	};

	$scope.submitPost = function(form) {
		var now = new Date().getTime();
		$scope.newpost.time = now;
		console.log($scope.newpost);

		$.post( "/blog/addpost", $scope.newpost,function( data ) {

  			$scope.getBlogPosts();
		});
	};

	$scope.getBlogPosts();
	
});