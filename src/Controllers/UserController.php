<?php

namespace App\Controllers;

use App\Models\User;

class UserController extends Controller
{
    public function index($request, $response)
    {
      try {
        $users = User::All();
        return $response->withJson($users,200)->withHeader('Content-type', 'application/json');
      } catch (\Throwable $th) {
        return $response->withJson(['message'=>'Não foi possível buscar os usuários!'], 405)->withHeader('Content-type', 'application/json');
      }

    }

    public function show($request, $response,$args){
      try {
        $id = $args['id'];
        $user = User::find($id);

        return $response->withJson($user,200)->withHeader('Content-type', 'application/json');
      } catch (\Throwable $th) {
        return $response->withJson(['message'=>'Não foi possível encontrar o usuário!'], 405)->withHeader('Content-type', 'application/json');

      }

    }

    public function store($request, $response){
      try {

        if(!$this->ValidateUser($request->getParams()['username'])){
          return $response->withJson(['message'=>'Oops! Este usuário já existe!'],401)->withHeader('Content-type', 'application/json');
        }
        $data = $request->getParams();
        $data['password'] = md5($data['password']);

        $newUser = User::create($data);

        return $response->withJson($newUser,200)->withHeader('Content-type', 'application/json');
      } catch (\Throwable $th) {
        return $response->withJson(['message'=>'Não foi possível criar o novo usuário'],401)->withHeader('Content-type', 'application/json');
      }

    }

    public function update($request, $response){

      $data = $request->getParams();
      if (isset($data['password'])) {
        $data['password'] = md5($data['password']);
      }
      $oldeUser = User::find($data['id']);
      if (isset($request->getParams()['username'])) {
        if(!$this->ValidateUser($data['username'], $oldeUser)){
          return $response->withJson(['message'=>'Oops! Este usuário já existe!'],401)->withHeader('Content-type', 'application/json');
        }
      }
      try {
        $user= User::find($data['id']);
        $user->update($data);
        return $response->withJson($user, 200)->withHeader('Content-type', 'application/json');
      } catch (\Throwable $th) {
        return $response->withJson(['message'=>'Não foi possível atualizar o usuário!'], 405)->withHeader('Content-type', 'application/json');

      }


    }
    public function destroy($request, $response){
      try {
        $user= User::destroy($request->getParams()['id']);
        return $response->withJson(['message'=>'Usuário excluído com sucesso!'], 200)->withHeader('Content-type', 'application/json');

      } catch (\Throwable $th) {
        return $response->withJson(['message'=>'Não foi possível exlcuir o usuário!'], 405)->withHeader('Content-type', 'application/json');

      }
   }

    private function ValidateUser($username, $oldeUser = null){
      if (isset($oldeUser)) {
        $user = User::where('username',$username)->where('username','!=',$oldeUser->username)->first();
      if($user) return false;
      return true;
      }
      $user = User::where('username',$username)->first();
      if($user) return false;
      return true;
    }

}
