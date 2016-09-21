'use strict';

angular.module('myApp', [
    'ui.router'
])

.config(['$stateProvider','$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/');

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
            .state("skills", {
              url: "/skills",
              templateUrl: './app/components/skill/skill.html',
              controller: 'SkillCtrl'
            })
            .state("skill-view", {
              url: "/skill/:type",
              templateUrl: './app/components/skill-view/skill-view.html',
              controller: 'SkillViewCtrl'
            })
            .state("create", {
              url: "/create",
              templateUrl: './app/components/create/create.html',
              controller: 'CreateCtrl'
            })
            .state("create-view", {
              url: "/create/:type",
              templateUrl: './app/components/create-view/create-view.html',
              controller: 'CreateViewCtrl'
            })
            .state("edit", {
              url: "/edit/:type/:id",
              templateUrl: './app/components/create-view/create-view.html',
              controller: 'CreateViewCtrl'
            })
            .state("logout", {
                url: "/logout",
                templateUrl: "./app/components/logout/logout.html",
                controller: 'LogoutCtrl'
            })
            .state("register", {
              url: "/register",
              templateUrl: './app/components/register/register.html',
              controller: 'RegisterCtrl'
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
