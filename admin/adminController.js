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

	$scope.dialogActive = false;
	$scope.savedDeletedQuestion = '';

	$scope.adminWindow = 'manageQuestions'; 

	$scope.config = 
	{
        headers : {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
        }
    }

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
					$http.post("../postQuestion.php",data, $scope.config)
						.then(
								function(response)
								{
									console.log(response);
								}
							)
					location.reload();
				}
			}
		}
	}
	$scope.saveEditedQuestion = function(question)
	{
		var data = $.param({
				id:question.questionData.id,
                question:question.questionData.question,
                optionIs:question.questionData.is,
                possibleAnswer1:question.questionData.possibleAnswers[0],
                possibleAnswer2:question.questionData.possibleAnswers[1],
                possibleAnswer3:question.questionData.possibleAnswers[2],
                possibleAnswer4:question.questionData.possibleAnswers[3],
                correctAnswer:question.questionData.correctAnswer
        });
        $http.post("../editQuestion.php",data,$scope.config)
        	.then(
        		function(response)
        		{
        			console.log(response);
        		},
        		function(response)
        		{
        			console.log(response);
        		}
        	)   
	}
	$scope.saveToBeDeletedQuestion = function(question)
	{
		$scope.dialogActive = true;
		$scope.savedDeletedQuestion = question;
	}
	$scope.deleteQuestion = function()
	{
		var data = $.param({
                deleteID: $scope.savedDeletedQuestion.questionData.id
            });
		$http.post("../deleteQuestion.php",data, $scope.config)
			.then(
					function(response)
					{
						console.log(response);
					}
				)
		$scope.savedDeletedQuestion = '';
		$scope.dialogActive = false;
		location.reload();
	}
});