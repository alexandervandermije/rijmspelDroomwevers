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
				$scope.totalQuestions++;
			}
		})

	// Temporary Local questions
	
	// $scope.game.questions = [
	// 	{question:"In het midden",possibleAnswers:["egaal", "fataal", "ideaal", "centraal"],is:'is',correctAnswer:"centraal", een: false},
	// 	{question:"Een oor", possibleAnswers:["loog","zoog","boog","oog"], is:'is niet',correctAnswer:"oog",een:true},
	// 	{question:"Snel", possibleAnswers:["vandaag","maag","traag","vraag"], is:'is niet', correctAnswer:"traag", een: false},
	// 	{question:"Laag", possibleAnswers:["oog", "hoog", "boog","droog"], is:'is niet', correctAnswer:"hoog", een:false},
	// 	{question:"Hersens", possibleAnswers:["trein", "plein", "brein","rein"], is:'is', correctAnswer:"brein", een:false},
	// 	{question:"Groot", possibleAnswers:["klein", "lijn", "pijn","mijn"], is:'is niet', correctAnswer:"klein", een:false},
	// 	{question:"Een meer", possibleAnswers:["tonijn", "zelfbewustzijn", "welzijn","woestijn"], is:'is niet', correctAnswer:"woestijn", een:true},
	// 	{question:"Een cirkel", possibleAnswers:["lijn", "plein", "trein","mijn"], is:'is niet', correctAnswer:"lijn", een:false},
	// 	{question:"Een grapje", possibleAnswers:["gein", "gordijn", "fontein","terrein"], is:'is', correctAnswer:"gein", een:true},
	// 	{question:"Onweer", possibleAnswers:["weer", "meneer", "verkeer","studeer"], is:'is', correctAnswer:"weer", een:false},
	// 	{question:"Pijnlijk", possibleAnswers:["zeer", "meer", "neer","ongeveer"], is:'is', correctAnswer:"zeer", een:false},
	// 	{question:"Noord", possibleAnswers:["zuid", "kruid", "vanuit","spruit"], is:'is niet', correctAnswer:"zuid", een:false}
	// ];

	// Input Form & = Form validation variables
	$scope.newQuestion = '';
	$scope.optionIsEmpty = false;
	$scope.answersEmpty = false;
	$scope.questionEmpty = false;

	// Dialog window variables
	$scope.dialogActive = false;
	$scope.dialogState = '';

	$scope.adminWindow = 'manageQuestions'; 
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

	$scope.enterNewQuestion = function()
	{
		console.log($scope.newQuestion);
		if(typeof $scope.newQuestion.question == 'undefined')
		{
			$scope.questionEmpty = true;
		}
		else
		{
			$scope.questionEmpty = false;
			if(typeof $scope.newQuestion.optionIs == 'undefined')
			{
				$scope.optionIsEmpty = true;
			}
			else
			{
				$scope.optionIsEmpty = false;
				if(typeof $scope.newQuestion.possibleAnswer1 == 'undefined')
				{
					$scope.answersEmpty = true;
				}
				else if(typeof $scope.newQuestion.possibleAnswer2 == 'undefined')
				{
					$scope.answersEmpty = true;
				}
				else if(typeof $scope.newQuestion.possibleAnswer3 == 'undefined')
				{
					$scope.answersEmpty = true;
				}
				else if(typeof $scope.newQuestion.possibleAnswer4 == 'undefined')
				{
					$scope.answersEmpty = true;
				}
				else
				{
					if(typeof $scope.newQuestion.extraWord == 'undefined')
					{
						$scope.newQuestion.extraWord = false;
					}
					$scope.answersEmpty = false;
				
					var config = 
					{
			            headers : {
			                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
			            }
			        }
					var data = $.param({
			                question:$scope.newQuestion.question,
			                optionIs:$scope.newQuestion.optionIs,
			                extraWord:$scope.newQuestion.extraWord,
			                possibleAnswer1:$scope.newQuestion.possibleAnswer1,
			                possibleAnswer2:$scope.newQuestion.possibleAnswer2,
			                possibleAnswer3:$scope.newQuestion.possibleAnswer3,
			                possibleAnswer4:$scope.newQuestion.possibleAnswer4,
			                correctAnswer:$scope.newQuestion.correctAnswer
			            });
					$http.post("postQuestion.php",data, config)
						.then(
								function(response)
								{
									console.log('succes!');
								},
								function(response)
								{
									console.log('failure');
								}
							)
					//location.reload();
				}
			}
		}
	}
	$scope.deleteQuestion = function(question)
	{
		var config = 
		{
            headers : {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
            }
        }
		var data = $.param({
                deleteID: question.questionData.id
            });
		$http.post("deleteQuestion.php",data, config)
			.then(
					function(response)
					{
						console.log('succes!');
					},
					function(response)
					{
						console.log('failure');
					}
				)

		location.reload();
	}
	$scope.checkAnswer = function(chosenAnswer)
	{
		if($scope.isTrue != '')
		{
			if($scope.isTrue == $scope.game.questions[$scope.currentQuestion].is && $scope.isTrue != '')
			{
				if(chosenAnswer.possibleAnswer == $scope.game.questions[$scope.currentQuestion].correctAnswer)
				{
					console.log("vraag correct beantwoord!");
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
});
