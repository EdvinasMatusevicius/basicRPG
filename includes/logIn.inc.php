<?php
if (isset($_POST['checkHiddenLogIn'])) {
    require "dbHandler.inc.php";
    $user = $_POST['user'];
    $password = $_POST['password'];
    if (empty($user) || empty($password)) {
        header("Location: ../index.php?errorin=emtyfields");
        exit();
    } else {
        $sql = "SELECT * FROM users WHERE userName=?";
        $stmt = mysqli_stmt_init($conn);
        if (!mysqli_stmt_prepare($stmt, $sql)) {
            header("Location: ../index.php?errorin=sqlerrorNamecheck");
            exit();
        } else {
            mysqli_stmt_bind_param($stmt, "s", $user);
            mysqli_stmt_execute($stmt);
            $result = mysqli_stmt_get_result($stmt);
            if($row = mysqli_fetch_assoc($result)) {
                $pswCheck = password_verify($password,$row['psw']);
                if($pswCheck == false){
                    header("Location: ../index.php?errorin=wrongpasword");
                exit();
                } else if($pswCheck === true){
                    session_start();
                    $_SESSION['userId']= $row['id'];
                    $_SESSION['user'] = $row['userName'];
                    header("Location: ../index.php?login=successs");
                    exit();
                }else{
                    header("Location: ../index.php?errorin=booleanfail");
                    exit();
                }
            } else{
                header("Location: ../index.php?errorin=nouser");
                exit();
        exit();
            }
        }
    }
} else {
    header("Location: ../index.php");
    exit();
}
