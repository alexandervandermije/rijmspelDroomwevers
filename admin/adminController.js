var gameApp = angular.module('gameApp', []);
gameApp.controller('AdminController', function MainController($scope, $http) {

	$scope.totalQuestions = 0;
	$scope.game = this;
	$scope.game.questions = [];
	$http.get('../getQuestions.php')
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
	// Input Form & = Form validation variables
	$scope.newQuestion = '';
	$scope.optionIsEmpty = false;
	$scope.answersEmpty = false;
	$scope.questionEmpty = false;
	
	$scope.editingQuestion = false;

	$scope.adminWindow = 'manageQuestions'; 
	
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
				if(typeof $scope.newQuestion.possibleAnswer1 == 'undefined' || typeof $scope.newQuestion.possibleAnswer2 == 'undefined' || typeof $scope.newQuestion.possibleAnswer3 == 'undefined' || typeof $scope.newQuestion.possibleAnswer4 == 'undefined')
				{
					$scope.answersEmpty = true;
				}
				else if(typeof $scope.newQuestion.correctAnswer == 'undefined')
				{
					$scope.answersEmpty = false;
					$scope.correctAnswerEmpty = true;
				}
				else
				{
					if(typeof $scope.newQuestion.extraWord == 'undefined')
					{
						$scope.newQuestion.extraWord = false;
					}
					$scope.answersEmpty = false;
					$scope.correctAnswerEmpty = false;
				
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
					$http.post("../postQuestion.php",data, config)
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
			}
		}
	}
	$scope.editQuestion = function(question)
	{
		console.log(question);
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
		$http.post("../deleteQuestion.php",data, config)
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
});