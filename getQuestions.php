<?php

include "connection.php";

$result = mysqli_query($connection, "SELECT * FROM rijmspelquestions"); 
$data = array();
while ( $row = mysqli_fetch_row($result) )
{
  $data[] = $row;
}
echo json_encode($data);
mysqli_close($connection);
?>