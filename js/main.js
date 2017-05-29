var gameApp = angular.module('gameApp', []);
gameApp.controller('MainController', function MainController($scope) {

	$scope.questions = [
	{question:"In het midden",possibleAnswers:["egaal", "fataal", "ideaal", "centraal"],is:'is',correctAnswer:"centraal", een: false},
	{question:"Een oor", possibleAnswers:["loog","zoog","boog","oog"], is:'is niet',correctAnswer:"oog",een:true},
	{question:"Snel", possibleAnswers:["vandaag","maag","traag","vraag"], is:'is niet', correctAnswer:"traag", een: false},
	{question:"Laag", possibleAnswers:["oog", "hoog", "boog","droog"], is:'is niet', correctAnswer:"hoog", een:false},
	{question:"Hersens", possibleAnswers:["trein", "plein", "brein","rein"], is:'is', correctAnswer:"brein", een:false},
	{question:"Groot", possibleAnswers:["klein", "lijn", "pijn","mijn"], is:'is niet', correctAnswer:"klein", een:false},
	{question:"Een meer", possibleAnswers:["tonijn", "zelfbewustzijn", "welzijn","woestijn"], is:'is niet', correctAnswer:"woestijn", een:true},
	{question:"Een cirkel", possibleAnswers:["lijn", "plein", "trein","mijn"], is:'is niet', correctAnswer:"lijn", een:false},
	{question:"Een grapje", possibleAnswers:["gein", "gordijn", "fontein","terrein"], is:'is', correctAnswer:"gein", een:true},
	{question:"Onweer", possibleAnswers:["weer", "meneer", "verkeer","studeer"], is:'is', correctAnswer:"weer", een:false},
	{question:"Pijnlijk", possibleAnswers:["zeer", "meer", "neer","ongeveer"], is:'is', correctAnswer:"zeer", een:false},
	{question:"Noord", possibleAnswers:["zuid", "kruid", "vanuit","spruit"], is:'is niet', correctAnswer:"zuid", een:false}
	];

	$scope.currentQuestion = 0;
	$scope.totalQuestions = $scope.questions.length;
	$scope.isTrue = '';
	$scope.isTrueorFalseFilledIn = true;
	$scope.score = 0;

	var succesAudio = new Audio("sound/kidsCheering.mp3");
	succesAudio.volume = 0.1;
	var foutAudio = new Audio("sound/kidsAww.mp3");
	foutAudio.volume = 0.1;
	$scope.checkAnswer = function(chosenAnswer)
	{
		if($scope.isTrue != '')
		{
			if($scope.isTrue == $scope.questions[$scope.currentQuestion].is && $scope.isTrue != '')
			{
				if(chosenAnswer.possibleAnswer == $scope.questions[$scope.currentQuestion].correctAnswer)
				{
					console.log("vraag correct beantwoord!");
					succesAudio.play();
					$scope.score++;
				}
				else
				{
					foutAudio.play();
					console.log("is/is niet goed beantwoord,verkeerde woord gekozen!");
				}
			}
			else
			{
				foutAudio.play();
				console.log("is/is niet fout beantwoord");
			}
			
			$scope.currentQuestion++;
			$scope.$apply;
			$scope.isTrue = '';
		}
		else
		{
			$scope.isTrueorFalseFilledIn = false;
		}
		

	}
});
