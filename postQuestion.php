<?php
$SendQuestion = $_POST['question'];
$SendOptionIs = $_POST['optionIs'];
$SendExtraWord = $_POST['extraWord'];
$SendPossibleAnswer1 = $_POST['possibleAnswer1'];
$SendPossibleAnswer2 = $_POST['possibleAnswer2'];
$SendPossibleAnswer3 = $_POST['possibleAnswer3'];
$SendPossibleAnswer4 = $_POST['possibleAnswer4'];
$SendCorrectAnswer = $_POST['correctAnswer'];

echo $SendQuestion;

include "connection.php";

$query = mysqli_query($connection,"INSERT INTO rijmspelquestions(question, answer1, answer2, answer3, answer4, correctAnswer,optionIs, een) VALUES ('$SendQuestion', '$SendPossibleAnswer1','$SendPossibleAnswer2','$SendPossibleAnswer3','$SendPossibleAnswer4','$SendCorrectAnswer','$SendOptionIs','$SendExtraWord' )"); 
mysqli_close($connection);
?>