<?php
include_once __DIR__ . '/../vendor/autoload.php';

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__.'/..');
$dotenv->load();

$servername = $_ENV['DB_HOST'];
$dbName =$_ENV['DB_DATABASE'];
$dbUsername = $_ENV['DB_USERNAME'];
$dbPassword = $_ENV['DB_PASSWORD'];
$conn = mysqli_connect($servername,$dbUsername,$dbPassword,$dbName);

// if (!$conn){
//     die("Connection failed: ". mysqli_connect_error());
// }