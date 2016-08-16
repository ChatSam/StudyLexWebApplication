'use strict';

angular.module('myApp.voice', ['ui.router'])

.config(['$stateProvider', function($stateProvider) {
    $stateProvider.state("voice", {
        url: "/voice",
        views: {
            "viewA": { 
                templateUrl: "app/voice/top.html"
            },
            "viewB": { 
                templateUrl: "app/voice/bottom.html",
                controller: function($scope) {
                    $scope.something = "hello, world";
                }
            }
        }
    });
}]);