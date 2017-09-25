<?php
$SendId = $_POST['id'];
$SendQuestion = $_POST['question'];
$SendOptionIs = $_POST['optionIs'];
$SendPossibleAnswer1 = $_POST['possibleAnswer1'];
$SendPossibleAnswer2 = $_POST['possibleAnswer2'];
$SendPossibleAnswer3 = $_POST['possibleAnswer3'];
$SendPossibleAnswer4 = $_POST['possibleAnswer4'];
$SendCorrectAnswer = $_POST['correctAnswer'];
$SendBackground = $_POST['background'];

include "connection.php";

if (mysqli_connect_errno()) {
  printf('Connect failed: %s\n', mysqli_connect_error());
  exit();
}
$query = "UPDATE `rijmspelquestions` SET question = '$SendQuestion', optionIs = '$SendOptionIs', answer1 = '$SendPossibleAnswer1', answer2 = '$SendPossibleAnswer2', answer3 = '$SendPossibleAnswer3', answer4 = '$SendPossibleAnswer4', correctAnswer = '$SendCorrectAnswer', background = '$SendBackground' WHERE id = '$SendId'";

if (mysqli_query($connection, $query)) {
               echo "Record edited successfully";
            } else {
               echo "Error: " . $query . "" . mysqli_error($connection);
            }
mysqli_close($connection);
?>