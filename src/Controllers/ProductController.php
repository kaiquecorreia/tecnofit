<?php

namespace App\Controllers;

use App\Models\Product;

class ProductController extends Controller
{
    public function index($request, $response)
    {
      try {
        $products = Product::All();
        return $response->withJson($products,200)->withHeader('Content-type', 'application/json');
      } catch (\Throwable $th) {
        return $response->withJson(['message'=>'Não foi possível buscar produtos!'], 405)->withHeader('Content-type', 'application/json');
      }

    }

    public function show($request, $response,$args){
      try {
        $id = $args['id'];
        $product = Product::find($id);

        return $response->withJson($product,200)->withHeader('Content-type', 'application/json');
      } catch (\Throwable $th) {
        return $response->withJson(['message'=>'Não foi possível encontrar o produto!'], 405)->withHeader('Content-type', 'application/json');

      }

    }

    public function store($request, $response){
      try {

        if(!$this->ValidateProduct($request->getParams()['name'])){
          return $response->withJson(['message'=>'Oops! Este produto já existe!'],401)->withHeader('Content-type', 'application/json');
        }
        $product = Product::create($request->getParams());

        return $response->withJson($product,200)->withHeader('Content-type', 'application/json');
      } catch (Exception $th) {
        var_dump($th);
        return $response->withJson(['message'=>'Não foi possível criar o novo produto'],401)->withHeader('Content-type', 'application/json');
      }

    }

    public function update($request, $response){

      $data = $request->getParams();
      if (isset($data['password'])) {
        $data['password'] = md5($data['password']);
      }
      $oldProduct = Product::find($data['id']);
      if (isset($request->getParams()['name'])) {
        if(!$this->ValidateProduct($request->getParams()['name'], $oldProduct)){
          return $response->withJson(['message'=>'Oops! Este produto já existe!'],401)->withHeader('Content-type', 'application/json');
        }
      }
      try {
        $product= Product::find($data['id']);
        $product->update($data);
        return $response->withJson($product, 200)->withHeader('Content-type', 'application/json');
      } catch (Exception $th) {
        var_dump($th);
        return $response->withJson(['message'=>'Não foi possível atualizar o produto!'], 405)->withHeader('Content-type', 'application/json');

      }


    }
    public function destroy($request, $response){
      try {
        $product= Product::destroy($request->getParams()['id']);
        return $response->withJson(['message'=>'Produto excluído com sucesso!'], 200)->withHeader('Content-type', 'application/json');

      } catch (\Throwable $th) {
        return $response->withJson(['message'=>'Não foi possível exlcuir o produto!'], 405)->withHeader('Content-type', 'application/json');

      }
   }

    private function ValidateProduct($name, $oldProduct = null){
    if (isset($oldProduct)) {
      $product = Product::where('name',$name)->where('name','!=',$oldProduct->name)->first();
    if($product) return false;
    return true;
    }{
      $product = Product::where('name',$name)->first();
      if($product) return false;
      return true;
    }
  }

}
