'use strict';

angular.module('myApp', [
    'ui.router'
])


.config(['$stateProvider',
    function($stateProvider) {
        $stateProvider
            .state("index", {
                url: "/",
                views: {
                    "viewA": {templateUrl: "../home/flcards.html"}
                }
            })
            .state("state1", {
                url: "/state1",
                views: {
                    "viewA": {
                        templateUrl: "../state1/view.html",
                        controller: function($scope) {
                            $scope.now = new Date().toString();

                            $("#click-me").click(function() {
                                alert("you clicked me!");
                            });
                        }
                    }
                }
            })
            .state("state2", {
                url: "/state2",
                views: {
                    "viewA": { templateUrl: "../state2/view1.html" },
                    "viewB": { templateUrl: "../state2/view2.html" }
                }
            });
}])

.controller('BlogVwCtrl', function ($scope,$http) {
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

		// $http.get("/flashcards").success(function(data){
		// 	$scope.cardSet = data;
		// });
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

})


// Debugging ui-router
.run(['$rootScope', function($rootScope) {
    $rootScope.$on('$stateChangeStart',function(event, toState, toParams, fromState, fromParams){
        console.log('$stateChangeStart to '+toState.to+'- fired when the transition begins. toState,toParams : \n',toState, toParams);
    });
    $rootScope.$on('$stateChangeError',function(event, toState, toParams, fromState, fromParams, error){
        console.log('$stateChangeError - fired when an error occurs during transition.');
        console.log(arguments);
    });
    $rootScope.$on('$stateChangeSuccess',function(event, toState, toParams, fromState, fromParams){
        console.log('$stateChangeSuccess to '+toState.name+'- fired once the state transition is complete.');
    });
    // $rootScope.$on('$viewContentLoading',function(event, viewConfig){
    //   // runs on individual scopes, so putting it in "run" doesn't work.
    //   console.log('$viewContentLoading - view begins loading - dom not rendered',viewConfig);
    // });
    $rootScope.$on('$viewContentLoaded',function(event){
        console.log('$viewContentLoaded - fired after dom rendered',event);
    });
    $rootScope.$on('$stateNotFound',function(event, unfoundState, fromState, fromParams){
        console.log('$stateNotFound '+unfoundState.to+'  - fired when a state cannot be found by its name.');
        console.log(unfoundState, fromState, fromParams);
    });
}]);
