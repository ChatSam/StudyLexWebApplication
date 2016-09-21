
(function() {
  angular.module('myApp').controller('CreateCtrl', CreateCtrl)

  CreateCtrl.$inject = ['$scope', '$http', '$stateParams', '$state', '$rootScope'];
  function CreateCtrl ($scope, $http, $stateParams, $state, $rootScope) {

  $scope.chooseCreationSkill = true;
  $scope.createInstruction = false;
  $scope.createLearning = false;
  $scope.createInstructionSkill = createInstructionSkill;
  $scope.createLearningSkill = createLearningSkill;
  $scope.createAnotherSkill = createAnotherSkill;
  $scope.selectSkill = selectSkill;

function createInstructionSkill() {
  $state.go('create-view', { type: 'instruction'});
}

function createLearningSkill() {
  $state.go('create-view', { type: 'learning'});
}

function createAnotherSkill() {
  $scope.chooseCreationSkill = false;
}

function selectSkill() {
  $scope.chooseCreationSkill = true;
  $scope.createInstruction = false;
  $scope.createLearning = false;
}

  $scope.submitInstruction = function(form) {
    var now = new Date().getTime();
    var thisInstruction = $scope.newInstruction;
    thisInstruction.time = now;

    $http.post("/instructions/create", thisInstruction)
      .success(function(data){
        $state.go('skill', { type: 'instruction'});
      })
      .error(function(){
        console.log("Cannot save flashcard.")
      });
  };

	$scope.updateCard = function(){
			$http.post("/flashcards/update/", $scope.newCard)
				.success(function(data){
          $state.go('skill', { type: 'learning'});
					console.log("post success")
				})
				.error(function(){
					console.log("Cannot save flashcard.");
				});
	}

  $scope.updateInstruction = function(){
      $http.post("/instructions/update/", $scope.newCard)
        .success(function(data){
          $state.go('skill', { type: 'instruction'});
          console.log("post success")
        })
        .error(function(){
          console.log("Cannot save flashcard.");
        });
  }

  $scope.getCard = function(id){
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

  $scope.getInstruction = function(id){
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
