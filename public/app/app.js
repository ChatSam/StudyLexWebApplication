'use strict';

angular.module('myApp', [
    'ui.router'
])
.config(['$stateProvider', '$urlRouterProvider', '$httpProvider',
    function($stateProvider, $urlRouterProvider, $httpProvider) {

        $stateProvider
            .state("home", {
                url: "/",
                templateUrl: "./app/components/home/home.html"
            })
            .state("login", {
                url: "/login",
                templateUrl: "./app/components/login/login.html",
                controller: 'LoginCtrl'
            })
            .state("cards", {
              url: "/cards",
              templateUrl: './app/components/cards/flcards.html',
              controller: 'CardsCtrl'
            })
            .state("create", {
              url: "/create",
              templateUrl: './app/components/create/create.html',
              controller: 'CreateCtrl'
            })
            .state("logout", {
              url: "/logout",
              templateUrl: './app/components/logout/logout.html',
              controller: 'LogoutCtrl'
            })
            .state("register", {
              url: "/register",
              templateUrl: './app/components/register/register.html',
              controller: 'RegisterCtrl'
            });
            $urlRouterProvider.otherwise('/');
            $httpProvider.interceptors.push('APIInterceptor');
}])
.service('UserService', function(store) {
    var service = this,
        currentUser = null;
    service.setCurrentUser = function(user) {
        currentUser = user;
        store.set('user', user);
        return currentUser;
    };
    service.getCurrentUser = function() {
        if (!currentUser) {
            currentUser = store.get('user');
        }
        return currentUser;
    };
})
.service('APIInterceptor', function($rootScope) {
    var service = this;
    service.request = function(response) {
      console.log('*** success');
      console.log(response);
        $rootScope.statue = true;
        return response;
    };
    service.responseError = function(response) {
      console.log('*** error');
      console.log(response);
        if (response.status === 401) {
            $rootScope.statue = false;
           $state.go('login');
        }
        return response;
    };
})
// Debugging ui-router
.run(['$rootScope', function($rootScope) {
    $rootScope.state = false;

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

var checkLoggedin = function($q, $timeout, $http, $state, $rootScope) {
  // Initialize a new promise
  var deferred = $q.defer();
  // Make an AJAX call to check if the user is logged in
  $http.get('/flashcards/loggedin')
    .success(function(user){
      // Authenticated
      if (user !== '0') {
        $rootScope.state = true;
        deferred.resolve();
      // Not Authenticated
      } else {
        $rootScope.state = false;
        $rootScope.message = 'You need to log in.';
        deferred.reject();
        $state.state('login');
      }
    });
return deferred.promise;
};
