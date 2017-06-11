<?php

$deleteID = $_POST['deleteID'];
$connection = new mysqli("localhost", "root", "", "droomwevers");


$result = mysqli_query($connection, "DELETE FROM `rijmspelquestions` WHERE `rijmspelquestions`.`id` = '$deleteID'"); 

mysqli_close($connection);
?>