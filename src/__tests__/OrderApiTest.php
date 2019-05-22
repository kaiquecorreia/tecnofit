<?php
use App\__tests__\ApiTestCase;


// use App\App;

class OrderApiTest extends ApiTestCase
{
   /** @test */
    public function it_should_create_order() {
        $order = ['user_id'=>1, 'description'=>'teste', 'total'=> 20.00, 'products' => ['1'=> ['amount' => 5] ] ];
        $this->request('POST', '/orders', $order);
        $_SESSION['model_id'] = $this->responseData()[0]['pivot']['order_id'];
        $this->assertThatResponseHasStatus(200);
        $this->assertThatResponseHasContentType('application/json');
        $this->assertTrue(is_array($this->responseData()));
        $this->assertNotEmpty($this->responseData());
    }
    /** @test */
    public function it_should_search_all_orders() {
        $this->request('GET', '/orders');
        $this->assertThatResponseHasStatus(200);
        $this->assertThatResponseHasContentType('application/json');
        $this->assertTrue(is_array($this->responseData()));
    }
    /** @test */
    public function it_should_search_one_order() {
        $this->request('GET', "/orders/{$_SESSION['model_id']}");

        $this->assertThatResponseHasStatus(200);
        $this->assertThatResponseHasContentType('application/json');
        $this->assertTrue(is_array($this->responseData()));
        $this->assertNotEmpty($this->responseData());
    }

    /** @test */
    public function it_should_update_order() {

        $order = ['id'=> $_SESSION['model_id'] ,'user_id'=>1, 'description'=>'teste', 'total'=> 20.00, 'products' => ['1'=> ['amount' => 5] ] ];

        $this->request('PUT', '/orders', $order);

        $this->assertThatResponseHasStatus(200);
        $this->assertThatResponseHasContentType('application/json');
        $this->assertTrue(is_array($this->responseData()));
        $this->assertNotEmpty($this->responseData());
    }
    /** @test */
    public function it_should_delete_order() {
        $order = ['id'=> $_SESSION['model_id'] ];

        $this->request('DELETE', '/orders', $order);

        $this->assertThatResponseHasStatus(200);
        $this->assertThatResponseHasContentType('application/json');
        $this->assertSame($this->responseData()['message'], 'Pedido excluído com sucesso!');
    }


}
