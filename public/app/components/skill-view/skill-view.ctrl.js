
(function() {
  angular.module('myApp').controller('SkillViewCtrl', SkillViewCtrl)


  SkillViewCtrl.$inject = ['$scope', '$http', '$stateParams', '$state', '$rootScope'];
  function SkillViewCtrl ($scope, $http, $stateParams, $state, $rootScope) {

	console.log("SkillCtrl");

	$scope.cardSet = [];
  $scope.chooseSkill = true;
	$scope.viewCards = false;
	$scope.viewInstruction = false;
  $scope.selectSkill = selectSkill;
  $scope.viewSetSkill = viewSetSkill;
  $scope.viewLearningSkill = viewLearningSkill;
  $scope.viewAnotherSkill = viewAnotherSkill;
  $scope.addInstruction = addInstruction;

	$scope.newCardPost= {
		time: "",
		subject:"",
		question:"",
		hint:"",
		answer:"",
		more:""
	}

  $scope.newStep = {
    stepnumber: '',
    instruction: '',
    helplevelone: '',
    helpleveltwo: ''
  }

  $scope.newInstruction = {
    time: "",
    manual:"",
    appDescription: "",
    steps: [
      $scope.newStep,
      $scope.newStep
    ]
  }

  $scope.typeState = !!$stateParams.type;

	$scope.model="";

  function addInstruction() {
    $scope.newInstructionPost.steps.push($scope.newInstructionPost);
  }

  function viewSetSkill(){
    $scope.getInstruction();
    $scope.chooseSkill = false;
    $scope.viewInstruction = true;
  }

  function viewLearningSkill(){
    $scope.getCards();
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

	$scope.getInstruction = function() {

		$http.get("/instructions/steps").then(function(result){
			$scope.instructionSet = result.data;
		}, function () {
      $scope.cardSet = [];
      $rootScope.state = false;
      $state.go('login');

    });
	};

  $scope.getCards = function() {

		$http.get("/flashcards/cards").then(function(result){
			$scope.cardSet = result.data;
		}, function () {
      $scope.cardSet = [];
      $rootScope.state = false;
      $state.go('login');

    });
	};

	$scope.deletePost = function(id) {

		$http.delete(
			"/flashcards/delete/"+id
			).then(
			function success(){
				$scope.getCards()
			},
			function error(){
				console.log("Error. Cannot delete flashcard")

        $state.go('home');

			});
	};

	$scope.editCard = function(card_id){
    console.log(card_id);
    $state.go('edit', { type: 'learning', id: card_id});
	}

  $scope.editStep = function(instruction_id){
    console.log(instruction_id);
    $state.go('edit', { type: 'instruction', id: instruction_id});
  }

  $scope.deleteStep = function(id) {

    $http.delete(
      "/instructions/delete/"+id
      ).then(
      function success(){
        $scope.getInstruction()
      },
      function error(){
        console.log("Error. Cannot delete flashcard")

        $state.go('home');

      });
  };

  // if($scope.typeState){
  //   switch ($stateParams.type) {
  //     case 'instruction': {
  //       $scope.chooseSkill = false;
  //       $scope.viewInstruction = true;
  //       $scope.getInstruction($stateParams.id);
  //       break;
  //     }
  //     default: {
  //       $scope.chooseSkill = false;
  //       $scope.viewCards = true;
  //       $scope.getCards($stateParams.id);
  //     }
  //   }
  // }
}

})();
