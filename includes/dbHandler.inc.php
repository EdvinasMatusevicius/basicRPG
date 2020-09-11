<?php

$servername = getenv('DB_HOST');
$dbName =getenv('DB_DATABASE');
$dbUsername = getenv('DB_USERNAME');
$dbPassword = getenv('DB_PASSWORD');

$conn = mysqli_connect($servername,$dbUsername,$dbPassword,$dbName);

// if (!$conn){
//     die("Connection failed: ". mysqli_connect_error());
// }