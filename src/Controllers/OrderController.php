<?php

namespace App\Controllers;
use App\Models\Order;
use App\Models\Product;

class OrderController extends Controller
{
    public function index($request, $response)
    {
      try {
        $orders = Order::All();
        $orderCollection = [];
        foreach ($orders as $order) {
            $newOrder = Order::find($order->id);
            $orderCollection[$order->id] = $newOrder;
            foreach ($newOrder->products as $product) {
              $orderCollection[$order->id]['products'] = $product;
            }
        }
        return $response->withJson($orderCollection,200)->withHeader('Content-type', 'application/json');
      } catch (\Throwable $th) {
        return $response->withJson(['message'=>'Não foi possível buscar pedidos!'], 405)->withHeader('Content-type', 'application/json');
      }

    }

    public function show($request, $response,$args){
      try {
        $id = $args['id'];
        $order = Order::find($id);

        return $response->withJson($order,200)->withHeader('Content-type', 'application/json');
      } catch (\Throwable $th) {
        return $response->withJson(['message'=>'Não foi possível encontrar o pedido!'], 405)->withHeader('Content-type', 'application/json');

      }

    }

    public function store($request, $response){
      try {
        $data = $request->getParams();
        $products = $request->getParams()['products'];
        unset($data['products']);

        $order = Order::create($data);

        $order->products()->sync($products);
        return $response->withJson($order->products,200)->withHeader('Content-type', 'application/json');
      } catch (Exception $th) {
        var_dump($th);
        return $response->withJson(['message'=>'Não foi possível criar o novo pedido'],401)->withHeader('Content-type', 'application/json');
      }

    }

    public function update($request, $response){

      try {
        $data = $request->getParams();
        $products = $request->getParams()['products'];
        unset($data['products']);

        $order = Order::find($data['id']);

        $order->update($data);

        $order->products()->sync($products);

        return $response->withJson($order->products,200)->withHeader('Content-type', 'application/json');
      } catch (Exception $th) {
        var_dump($th);
        return $response->withJson(['message'=>'Não foi possível criar o novo pedido'],401)->withHeader('Content-type', 'application/json');
      }


    }
    public function destroy($request, $response){
      try {
        $order= Order::destroy($request->getParams()['id']);
        return $response->withJson(['message'=>'Pedido excluído com sucesso!'], 200)->withHeader('Content-type', 'application/json');

      } catch (\Throwable $th) {
        return $response->withJson(['message'=>'Não foi possível exlcuir o pedido!'], 405)->withHeader('Content-type', 'application/json');

      }
   }

}
