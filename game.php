<?php session_start();
include "includes/dbHandler.inc.php";
include "includes/gameLoad.php";
include "includes/gameSave.php";
?>
<!DOCTYPE html>
<html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Game World</title>
        <link rel="stylesheet" href="CSS/game.css">
        <link rel="stylesheet" href="CSS/inventoryShop.css">
        <link rel="stylesheet" href="CSS/characterSelection.css">
        <link rel="stylesheet" href="CSS/battlefield.css">
    </head>
    
    <body>
    <div id="container">
        <div id="above-map"></div>
        <div id="map-section"></div>
        <div id="actions"></div>
        <div id="warrior-section"> </div>
        <div id="battle-actions"></div>
        <div id="enemy-section"></div>
    </div>
    <div id="character-select"></div>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"
    integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1"
    crossorigin="anonymous"></script>
    <script src="js/gameManager.js"></script>
    <script src="js/map.js"></script>
    <script src="js/Player.js"></script>
    <script src="js/inventory.js"></script>
    <script src="js/Enemy.js"></script>
    <script src="js/battleLogic.js"></script>
    <script src="js/arena.js"></script>
    <script src="js/saveLoad.js"></script>
</body>

</html>