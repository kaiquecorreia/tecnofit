<?php

namespace App\Auth;

use App\Models\User;

class auth{

  public function attempt($username, $password){

    $user = User::where('username', $username)->first();

    if (!$user){
      return false;
    }
    if(md5($password) == $user->password){
      return $user;
    }
  }
}
