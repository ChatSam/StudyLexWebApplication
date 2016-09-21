
(function() {
  angular.module('myApp').controller('CreateViewCtrl', CreateViewCtrl)

  CreateViewCtrl.$inject = ['$scope', '$http', '$stateParams', '$state', '$rootScope'];
  function CreateViewCtrl ($scope, $http, $stateParams, $state, $rootScope) {

  $scope.chooseCreationSkill = true;
  $scope.createInstruction = false;
  $scope.createLearning = false;
  $scope.createInstructionSkill = createInstructionSkill;
  $scope.createLearningSkill = createLearningSkill;
  $scope.createAnotherSkill = createAnotherSkill;
  $scope.selectSkill = selectSkill;
  $scope.addInstruction = addInstruction;
  $scope.submitInstructionApp = submitInstructionApp;

	$scope.newCard = {
		time: "",
		subject:"",
		question:"",
		hint:"",
		answer:"",
		more:""
	}
  $scope.newStep = {
    stepnumber: 1,
    instruction: '',
    helplevelone: '',
    helpleveltwo: ''
  }

  $scope.newInstructionApp = {
    date: "",
    appName:"",
    appDescription: "",
    steps: [
      angular.copy($scope.newStep)
    ]
  }

  function addInstruction() {
    var temp = angular.copy($scope.newStep);
    temp.stepnumber = $scope.newInstructionApp.steps.length + 1;
    $scope.newInstructionApp.steps.push(temp);
    console.log($scope.newInstructionApp)
  }

  $scope.editState = !!$stateParams.id;

  $scope.editState = !!$stateParams.type;
  console.log($stateParams.id);

	$scope.card="";

function createInstructionSkill() {
  $scope.chooseCreationSkill = false;
  $scope.createInstruction = true;
}

function createLearningSkill() {
  $scope.chooseCreationSkill = false;
  $scope.createLearning = true;
}

function createAnotherSkill() {
  $scope.chooseCreationSkill = false;
}

function selectSkill() {
  $scope.chooseCreationSkill = true;
  $scope.createInstruction = false;
  $scope.createLearning = false;
}

	function deleteRemoveCard(id) {

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

  function submitLearningApp(form) {
		var now = new Date().getTime();
		var thisCard = $scope.newCard;
    thisCard.time = now;

		$http.post("/flashcards/create", thisCard)
			.success(function(data) {
        $state.go('skill', { type: 'learning'});
			})
			.error(function(){
        console.log("Cannot save flashcard.")
			});
	};

  function submitInstructionApp(form) {
    var now = new Date().getTime();
    var thisInstruction = $scope.newInstructionApp;
    thisInstruction.date = now;

    $http.post("/instructions/create", thisInstruction)
      .success(function(data){
        $state.go('skill', { type: 'instruction'});
      })
      .error(function(){
        console.log("Cannot save flashcard.")
      });
  };

	// $scope.updateCard = function(){
	// 		$http.post("/flashcards/update/", $scope.newCard)
	// 			.success(function(data){
  //         $state.go('skill', { type: 'learning'});
	// 				console.log("post success")
	// 			})
	// 			.error(function(){
	// 				console.log("Cannot save flashcard.");
	// 			});
	// }
  //
  // $scope.updateInstruction = function(){
  //     $http.post("/instructions/update/", $scope.newCard)
  //       .success(function(data){
  //         $state.go('skill', { type: 'instruction'});
  //         console.log("post success")
  //       })
  //       .error(function(){
  //         console.log("Cannot save flashcard.");
  //       });
  // }

  function getLearningApp(id) {
      $http.get("/flashcards/" + id)
        .success(function(data){
          console.log(data);
          $scope.newCard = data[0];
          console.log("post success");
        })
        .error(function(){
          console.log("Cannot save flashcard.");
        });
  }

  function getInstructionApp(id) {
      $http.get("/instructions/" + id)
        .success(function(data){
          console.log(data);
          $scope.newInstruction = data[0];
          console.log("post success");
        })
        .error(function(){
          console.log("Cannot save flashcard.");
        });
  }

  // if($scope.editState){
  //   switch($stateParams.type) {
  //     case 'instruction': {
  //       $scope.chooseCreationSkill = false;
  //       $scope.createInstruction = true;
  //       $scope.getInstruction($stateParams.id);
  //       break;
  //     }
  //     default: {
  //       $scope.chooseCreationSkill = false;
  //       $scope.createLearning = true;
  //       $scope.getCard($stateParams.id);
  //     }
  //   }
  //
  // }
}

})();
