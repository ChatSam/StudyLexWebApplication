
(function() {
  angular.module('myApp').controller('SkillCtrl', SkillCtrl)


  SkillCtrl.$inject = ['$scope', '$http', '$stateParams', '$state', '$rootScope'];
  function SkillCtrl ($scope, $http, $stateParams, $state, $rootScope) {

	console.log("SkillCtrl");

	$scope.cardSet = [];
  $scope.chooseSkill = true;
	$scope.viewCards = false;
	$scope.viewInstruction = false;
  $scope.selectSkill = selectSkill;
  $scope.viewSetSkill = viewSetSkill;
  $scope.viewLearningSkill = viewLearningSkill;
  $scope.viewAnotherSkill = viewAnotherSkill;

  $scope.typeState = !!$stateParams.type;

	$scope.model="";

  function viewSetSkill(){
    $scope.chooseSkill = false;
    $scope.viewInstruction = true;
  }

  function viewLearningSkill(){
    $scope.chooseSkill = false;
    $scope.viewCards = true;
  }

  function viewAnotherSkill(){
    $scope.chooseSkill = false;
  }

  function selectSkill() {
    $scope.chooseSkill = true;
  	$scope.viewCards = false;
  	$scope.viewInstruction = false;
  }
}

})();
