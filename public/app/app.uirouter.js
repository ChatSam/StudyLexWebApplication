var blogApp = angular.module("blogApp", [
	'ui.router'
])
	.config(function ($stateProvider, $urlRouterProvider) {
		$stateProvider
			.state('blog', {
				url: '/blog',
				templateUrl: 'public/test.html',
				controller: 'BlogVwCtrl'

			})
			.state('post', {
				url: '/post',
				templateUrl: '/mod/blogpost/post.html',
				controller: 'BlogPostCtrl'
			});
		$urlRouterProvider.otherwise('/blog');
	});