<?php require 'header.php';
$registerOpen=true;
$logInOpen=true;

?>
<main>
  <div class="nav-bar">
    <div class="nav-logo">
  <a class="home" href="index.php"><img class="logo" src="img/logo.png" alt=""><span class="logo-text">BASIC  RPG</span></a>
</div>
  <div clas="nav-buttons">
  <ul class="nav-buttons-list">
    <li><button class="btn btn-stats">Stats info</button></li>
    <li><button class="btn btn-graphics">Game graphics</button></li>
  <?php if (isset($_SESSION['userId'])) {
    //Load 
    echo '
    <li><form action="game.php"><button class="btn btn-open-game" type="submit">Open Game</button></form></li>
    <li><div><form id="logOut" action="includes/logOut.inc.php" method="post">
      <button class="btn btn-log-out" type="submit" name ="logOut" >Log out</button></form></div>
    </li>';
  } else {
    echo '
    <li>
      <button class="btn btn-register" type="button" data-toggle="collapse" data-target="#register">Register</button>
      <form class="js-register-collapse collapse" id="register" action="includes/register.inc.php" method="post">
        <div class="form-group">
          <label class="lables" for="userName">Username</label>
          <input type="text" class="form-control" id="userName" name="userName">
        </div>
        <div class="form-group">
          <label class="lables" for="password1">Password</label>
          <input type="password" class="form-control" id="password1" name="password1">
        </div>
        <div class="form-group">
          <label class="lables" for="password2">Repeat password</label>
          <input type="password" class="form-control" id="password2" name="password2">
        </div>'; if(isset($_GET['error'])){
          if($_GET['error']=="emptyfields"){
            echo '<p class="text-danger">Fill in all fields!</p>';
          } else if ($_GET['error']=="passwordsdontmatch"){
            echo '<p class="text-danger">Passwords don\'t match.</p>';
          }else if ($_GET['error']=="sqlerror"){
            echo '<p class="text-danger">Can\'t reach database.</p>';
          }else if ($_GET['error']=="userexists"){
            echo '<p class="text-danger">User name already taken.</p>';
          }
        };
        echo '
        <button type="submit" class="btn btn-done" name="register">Done</button>
        <input type="hidden" name="checkHiddenRegister">
      </form>
    </li>
      <li>
      <button class="btn btn-log-in" type="button" data-toggle="collapse" data-target="#logIn" aria-expanded="false" aria-controls="logIn">Sign in</button>
      <form class="js-log-in-collapse collapse" id="logIn" action="includes/logIn.inc.php" method="post">
        <div class="form-group">
          <label class="lables" for="user">Username</label>
          <input type="text" class="form-control" id="user" name="user">
        </div>
        <div class="form-group">
          <label class="lables" for="password">Password</label>
          <input type="password" class="form-control" id="password" name="password">
        </div>'; if(isset($_GET['errorin'])){
          if($_GET['errorin']=="emptyfields"){
            echo '<p class="text-danger">Fill in all fields!</p>';
          }else if($_GET['errorin']=="wrongpasword"){
            echo '<p class="text-danger">Wrong password!</p>';
          }else if($_GET['errorin']=="nouser"){
            echo '<p class="text-danger">User name not found.</p>';
          }else if($_GET['errorin']=="sqlerrorNamecheck"){
            echo '<p class="text-danger">Can\'t reach database.</p>';
          };
        };
        echo '
        <button type="submit" class="btn btn-done" name="login">Done</button>
        <input type="hidden" name="checkHiddenLogIn">
      </form>
    </li>';
  } ?>
  </ul>
</div>
</div>
  <div id="content-box" class="content-box">
   
</div>
  <!-- <form id="logOut" action="includes/logOut.inc.php" method="post">
    <button class="btn btn-danger" type="submit" name ="logOut" >Log out</button>
  </form> -->
  
</main>
<?php require 'footer.php' ?>