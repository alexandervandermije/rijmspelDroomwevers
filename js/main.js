var gameApp = angular.module('gameApp', []);
gameApp.controller('MainController', function MainController($scope) {

	$scope.questions = [
	{question:"In het midden",possibleAnswers:["egaal", "fataal", "ideaal", "centraal"],is:'is',correctAnswer:"centraal", een: false},
	{question:"Een oor", possibleAnswers:["loog","zoog","boog","oog"], is:'is niet',correctAnswer:"oog",een:true},
	{question:"Snel", possibleAnswers:["vandaag","maag","traag","vraag"], is:'is niet', correctAnswer:"traag", een: false},
	{question:"Laag", possibleAnswers:["oog", "hoog", "boog","droog"], is:'is niet', correctAnswer:"hoog", een:false}
	];

	$scope.currentQuestion = 0;
	$scope.isTrue;
	$scope.score = 0;

	$scope.checkAnswer = function(chosenAnswer)
	{
		console.log($scope.isTrue);
		if($scope.isTrue == $scope.questions[$scope.currentQuestion].is && $scope.isTrue != '')
		{
			if(chosenAnswer.possibleAnswer == $scope.questions[$scope.currentQuestion].correctAnswer)
			{
				console.log("vraag correct beantwoord!");
				$scope.score++;
			}
			else
			{
				console.log("is/is niet goed beantwoord,verkeerde woord gekozen!");
			}
		}
		else
		{
			console.log("is/is niet fout beantwoord");
		}
		
		$scope.currentQuestion++;
		$scope.$apply;
		$scope.isTrue = '';

	}
});
