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

if (mysqli_connect_errno()) {
  printf('Connect failed: %s\n', mysqli_connect_error());
  exit();
}
$query = "INSERT INTO `rijmspelquestions` (question, optionIs, answer1, answer2, answer3, answer4, correctAnswer, extraWord) VALUES ('$SendQuestion', '$SendOptionIs', '$SendPossibleAnswer1', '$SendPossibleAnswer2','$SendPossibleAnswer3', '$SendPossibleAnswer4','$SendCorrectAnswer','$SendExtraWord' )";

if (mysqli_query($connection, $query)) {
               echo "New record created successfully";
            } else {
               echo "Error: " . $query . "" . mysqli_error($connection);
            }
mysqli_close($connection);
?>