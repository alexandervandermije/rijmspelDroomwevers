var gameApp = angular.module('gameApp', []);
gameApp.controller('MainController', function MainController($scope, $http) {

	$scope.totalQuestions = 0;
	$scope.game = this;
	$scope.game.questions = [];
	$http.get('getQuestions.php')
		.then(function(result)
		{
			for(var i in result.data)
			{
				$scope.game.questions[i] = {};
				$scope.game.questions[i].id = result.data[i][0];
				$scope.game.questions[i].question = result.data[i][1];
				$scope.game.questions[i].is = result.data[i][2];
				$scope.game.questions[i].possibleAnswers = [result.data[i][3],result.data[i][4],result.data[i][5],result.data[i][6]];
				$scope.game.questions[i].correctAnswer = result.data[i][7];
				$scope.game.questions[i].een = result.data[i][8];
				$scope.game.questions[i].background = result.data[i][9];
				$scope.totalQuestions++;
			}
		})
	// Dialog window variables
	$scope.dialogActive = false;
	$scope.dialogState = '';
	
	// Main game Variables
	$scope.currentQuestion = 0;
	$scope.isTrue = '';
	$scope.isTrueorFalseFilledIn = true;
	$scope.score = 0;

	// Audio files
	var succesAudio = new Audio("sound/kidsCheering.mp3");
	succesAudio.volume = 0.1;
	var foutAudio = new Audio("sound/kidsAww.mp3");
	foutAudio.volume = 0.1;

	//game Rules
	$scope.showGameRules = false;

	$scope.checkAnswer = function(chosenAnswer)
	{
		if($scope.dialogActive == true)
		{
			return;
		}
		if($scope.isTrue != '')
		{
			if($scope.isTrue == $scope.game.questions[$scope.currentQuestion].is && $scope.isTrue != '')
			{
				if(chosenAnswer.possibleAnswer == $scope.game.questions[$scope.currentQuestion].correctAnswer)
				{
					succesAudio.play();
					$scope.score++;
					$scope.nextQuestion();
				}
				else
				{
					foutAudio.play();
					$scope.dialogActive = true;
					$scope.dialogState = 'wrongAnswer';
				}
			}
			else
			{
				foutAudio.play();
				$scope.dialogActive = true;
				$scope.dialogState = 'wrongAnswer';
			}
		}
		else
		{
			$scope.isTrueorFalseFilledIn = false;
		}
	}
	$scope.nextQuestion = function()
	{
		if($scope.currentQuestion + 1 >= $scope.totalQuestions)
		{
			$scope.dialogActive = true;
			$scope.dialogState = 'endGame';
		}
		else
		{
			$scope.dialogState = '';
			$scope.dialogActive = false;
			$scope.currentQuestion++;
			$scope.isTrue = '';
			$scope.$apply;
		}
	}
	$scope.restartGame = function()
	{
		$scope.dialogActive = false;
		$scope.dialogState = '';
		$scope.currentQuestion = 0;
		$scope.isTrue = '';
		$scope.$apply;
	}
	$scope.gameRules = function()
	{
		console.log('gameRules');
		if($scope.showGameRules)
		{
			$scope.showGameRules = false
		}
		else
		{
			$scope.showGameRules = true;
		}
	}
});
