/**
 * Created by Chat on 9/10/16.
 */
(function(){
    angular.module('myApp').controller('HomeCtrl', HomeCtrl)

    HomeCtrl.$inject = ['$scope','$http','$stateParams','$state','$rootScope'];

    function HomeCtrl($scope, $http, $stateParams, $state, $rootScope){

        $scope.emailList ={
            mailAddress:"",
            joined:""
        }

        $scope.submitEmail = function(form){
            var now = new Date().getTime();

            var contact = $scope.emailList;
            contact.joined = now;
            console.log(contact);

            $http.post("/flashcards/savemail", contact)
                .success(function(res,data,err){
                    $state.go('home');
                })
                .error(function(err){
                    console.log("Cannot save email");
                });
        }
    }

})();