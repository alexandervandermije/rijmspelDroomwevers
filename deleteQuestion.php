<?php

$deleteID = $_POST['deleteID'];
include "connection.php";


$result = mysqli_query($connection, "DELETE FROM `rijmspelquestions` WHERE `rijmspelquestions`.`id` = '$deleteID'"); 

mysqli_close($connection);
?>