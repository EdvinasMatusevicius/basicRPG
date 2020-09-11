<?php
if(isset($_POST['checkHiddenRegister'])){
    require 'dbHandler.inc.php';
    $userName = $_POST['userName'];
    $password1 = $_POST['password1'];
    $password2 = $_POST['password2'];
    // REGISTER ERROR HANDLERS
    if( empty($userName) || empty($password1) ||empty($password2)){
        header("Location: ../index.php?error=emptyfields");
        exit();
    } else if ($password1 !== $password2){
        header("Location: ../index.php?error=passwordsdontmatch");
        exit();
    } else{
        $sql = "SELECT userName FROM users WHERE userName=?";
        $stmt = mysqli_stmt_init($conn);
        if(!mysqli_stmt_prepare($stmt,$sql)){
            header("Location: ../index.php?error=sqlerror");
        exit();
        } else {
            mysqli_stmt_bind_param($stmt, "s",$userName);
            mysqli_stmt_execute($stmt);
            mysqli_stmt_store_result($stmt);
            $resultCheck = mysqli_stmt_num_rows($stmt);
            if($resultCheck > 0){
                header("Location: ../index.php?error=userexists");
        exit();
            }else{
                $sql = "INSERT INTO users (userName,psw) VALUES (?,?)";
                $stmt = mysqli_stmt_init($conn);
                if(!mysqli_stmt_prepare($stmt,$sql)){
                    header("Location: ../index.php?error=sqlerror");
                exit();
                }else{
                    $hashedPsw = password_hash($password1, PASSWORD_DEFAULT);
                    mysqli_stmt_bind_param($stmt, "ss",$userName,$hashedPsw);
                    mysqli_stmt_execute($stmt);
                    header("Location: ../index.php?signup=success");
        exit();
                }
            }
        }
    }
    mysqli_stmt_close($stmt);
    mysqli_close($conn);
}else{
    header("Location: ../index.php");
        exit();
}