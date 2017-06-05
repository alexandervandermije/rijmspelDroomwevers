<?php

$connection = mysql_connect("localhost", "root", "");
$db = mysql_select_db("droomweversrijmspel", $connection);

$result = mysql_query("SELECT * FROM questions"); 
$data = array();
while ( $row = mysql_fetch_row($result) )
{
  $data[] = $row;
}
echo json_encode($data);
mysql_close($connection);
?>