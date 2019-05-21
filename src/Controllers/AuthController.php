<?php

namespace App\Controllers;

use App\Models\User;
class AuthController extends Controller
{
  public function signIn($request, $response, $args)
  {
      $auth = $this->auth->attempt(
        $request->getParam('username'),
        $request->getParam('password')
      );
      if (!$auth) {
        return $response
        ->withJson(['message'=>'Oops! Usuário e/ou senha incorretos.'],401)
        ->withHeader('Content-type', 'application/json');
      }
      return $response->withJson($auth,200)->withHeader('Content-type', 'application/json');
  }

}
