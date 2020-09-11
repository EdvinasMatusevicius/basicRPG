<?php
@session_start();
if (isset($_SESSION['user']) && isset($_GET['saves'])) {
    require 'dbHandler.inc.php';
    $userName = $_SESSION['user'];
    $query = mysqli_query($conn,'SELECT `id`, `userName`, `classType`, `health`, `maxHealth`, `strength`,`defence`, `agility`, `exp`, `lvl`, `coins`, `inventory` FROM `saves` WHERE `userName`= "' . $userName.'";');
    if (mysqli_num_rows($query) > 0) {
        $rows=mysqli_fetch_all($query);
        $saves=[];
        foreach ($rows as $row) {
            array_push($saves,$row);
        }
        echo json_encode($saves);
    }else{echo "There are no saves.";};
};