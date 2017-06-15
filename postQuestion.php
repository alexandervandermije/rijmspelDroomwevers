<?php
$SendQuestion = $_POST['question'];
$SendOptionIs = $_POST['optionIs'];
$SendExtraWord = $_POST['extraWord'];
$SendPossibleAnswer1 = $_POST['possibleAnswer1'];
$SendPossibleAnswer2 = $_POST['possibleAnswer2'];
$SendPossibleAnswer3 = $_POST['possibleAnswer3'];
$SendPossibleAnswer4 = $_POST['possibleAnswer4'];
$SendCorrectAnswer = $_POST['correctAnswer'];


include "connection.php";

$query = mysqli_query($connection,"insert into rijmspelquestions(question, answer1, answer2, answer3, answer4, correctAnswer,optionIs, een) values ('$SendQuestion', '$SendPossibleAnswer1','$SendPossibleAnswer2','$SendPossibleAnswer3','$SendPossibleAnswer4','$SendCorrectAnswer','$SendOptionIs','$SendExtraWord' )"); 
	echo "Form Submitted succesfully";
mysqli_close($connection);
?>