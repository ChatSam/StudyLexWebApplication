var blogApp = angular.module('blogApp', ['blogApp.filters', 'blogApp.services', 'blogApp.directives']).
  config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'test.html',
        controller: IndexCtrl
      }).
      when('/blog', {
        templateUrl: 'mod/blogpost/blog.html',
        controller: BlogVwCtrl
      }).
      when('/post', {
        templateUrl: 'mod/blogpost/post.html',
        controller: BlogPostCtrl
      }).
      otherwise({
        redirectTo: '/'
      });

  }]).run();