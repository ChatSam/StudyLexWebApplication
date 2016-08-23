'use strict';

angular.module('myApp', [
    'ui.router'
])

.config(['$stateProvider',
    function($stateProvider) {
        $stateProvider
            .state("home", {
                url: "/",
                views: {
                    "home": {
                      templateUrl: "../views/home/home.html",
                      controller: function() {
                                    // new WOW().init();
                                    // $.backstretch([
                                    //   "images/bg/bg1.jpg",
                                    // ], {
                                    //   fade: 950,
                                    //   duration: 10000
                                    // });
                                    // $('.counter').counterUp({
                                    //   delay: 100,
                                    //   time: 2000
                                    // });
                                  }
                    }
                }
            })
            .state("newcard", {
                url: "/newcard",
                views: {
                    "newcard": {
                      templateUrl: "../views/newcard/flcards.html",
                      controller: 'BlogVwCtrl'
                    }
                }
            })
            .state("signin", {
                url: "/signin",
                views: {
                    "signin": {
                        templateUrl: "../views/signin/signin.html",
                        controller: function($scope) {
                            // $scope.now = new Date().toString();
                            //
                            // $("#click-me").click(function() {
                            //     alert("you clicked me!");
                            // });
                        }
                    }
                }
            })
            .state("signup", {
                url: "/signup",
                views: {
                    "signup": { templateUrl: "../views/signup/signup.html" }
                }
            });
}])

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
