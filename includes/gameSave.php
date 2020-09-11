<?php
   @session_start();
//      if(isset(($_SESSION['userId'])) && isset($_POST['classType'])){
//  require 'dbHandler.inc.php';
// $sql="INSERT INTO `saves`(`userName`, `classType`, `health`, `maxHealth`, `strength`, `defence`, `agility`, `exp`, `lvl`, `coins`, `inventory`) VALUES
//  ('user','class','100h','200mx','50str','100def','30agil','1000exp','3lvl','444coin','[]');";
// mysqli_query($conn, $sql);

//      };


// if(isset(($_SESSION['userId'])) && isset($_POST['classType'])){
//      header("Location: index.php");
//      require 'dbHandler.inc.php';
//      $mysqliResult = $conn->execute("INSERT INTO `saves`(`userName`, `classType`, `health`, `maxHealth`, `strength`, `defence`, `agility`, `exp`, `lvl`,
//  `coins`, `inventory`) VALUES ('user','class','100h','200mx','50str','100def','30agil','1000exp','3lvl','444coin','[]');");
// // };




// if(isset(($_SESSION['userId'])) && isset($_POST['classType'])){
//     require 'dbHandler.inc.php';


//      $stmt=$conn->prepare("INSERT INTO saves (userName, classType, health, maxHealth, strength, defence, agility, exp, lvl, coins, inventory) VALUES
//    (?,?,?,?,?,?,?,?,?,?,?)");
//     $stmt->bind_param("ssiiiiiiiis", $userName,$classType,$health,$maxHealth,$strength,$defence,
//     $agility,$exp,$lvl,$coins,$inventory);

//     $userName = $_SESSION['user'];
//     $classType =  $_POST['classType'];
//     $health = $_POST['health'];
//     $maxHealth =  $_POST['maxHealth'];
//     $strength = $_POST['strength'];
//     $defence = $_POST['defence'];
//     $agility =  $_POST['agility'];
//     $exp = $_POST['exp'];
//     $lvl = $_POST['lvl'];
//     $coins =  $_POST['coins'];
//     $inventory =  $_POST['inventory'];

//     $stmt->execute();
//     echo"idejo";
//     $stmt->close();
//     $conn->colse();
// }

if(isset(($_SESSION['userId'])) && isset($_POST['classType'])){
     require 'dbHandler.inc.php';
     var_dump($_SESSION['user']);
    
     $userName = $_SESSION['user'];
     $classType =  $_POST['classType'];
     $health = $_POST['health'];
     $maxHealth =  $_POST['maxhealth'];
     $strength = $_POST['strength'];
     $defence = $_POST['defence'];
     $agility =  $_POST['agility'];
     $exp = $_POST['exp'];
     $lvl = $_POST['lvl'];
     $coins =  $_POST['coins'];
     $inventory =  $_POST['inventory'];
 
      $sql="INSERT INTO  `saves`(`userName`, `classType`, `health`, `maxHealth`, `strength`, `defence`, `agility`, `exp`, `lvl`, `coins`, `inventory`) VALUES
    (?,?,?,?,?,?,?,?,?,?,?)";
    $stmt = mysqli_stmt_init($conn);
    mysqli_stmt_prepare($stmt,$sql);
    mysqli_stmt_bind_param($stmt, "ssiiiiiiiis", $userName,$classType,$health,$maxHealth,$strength,$defence,
    $agility,$exp,$lvl,$coins,$inventory);
    mysqli_stmt_execute($stmt);
     mysqli_stmt_close($stmt);
    mysqli_close($conn);
 }
 



