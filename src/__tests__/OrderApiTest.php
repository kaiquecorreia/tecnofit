<?php
use App\__tests__\ApiTestCase;


// use App\App;

class OrderApiTest extends ApiTestCase
{
    /** @test */
    public function it_should_search_all_orders() {
        $this->request('GET', '/orders');

        $this->assertThatResponseHasStatus(200);
        $this->assertThatResponseHasContentType('application/json');
        $this->assertTrue(is_array($this->responseData()));
    }
    /** @test */
    public function it_should_search_one_order() {
        $this->request('GET', '/orders/1');

        $this->assertThatResponseHasStatus(200);
        $this->assertThatResponseHasContentType('application/json');
        $this->assertTrue(is_array($this->responseData()));
        $this->assertNotEmpty($this->responseData());
    }
    /** @test */
    public function it_should_create_order() {
        $order = ['user_id'=>1, 'description'=>'teste', 'total'=> 20.00, 'products' => ['1'=> ['amount' => 5],'3'=> ['amount' => 20]] ];

        $this->request('POST', '/orders', $order);

        $this->assertThatResponseHasStatus(200);
        $this->assertThatResponseHasContentType('application/json');
        $this->assertTrue(is_array($this->responseData()));
        $this->assertNotEmpty($this->responseData());
    }
    /** @test */
    public function it_should_update_order() {

        $order = ['id'=> 2,'user_id'=>1, 'description'=>'teste', 'total'=> 20.00, 'products' => ['1'=> ['amount' => 5],'3'=> ['amount' => 20]] ];

        $this->request('PUT', '/orders', $order);

        $this->assertThatResponseHasStatus(200);
        $this->assertThatResponseHasContentType('application/json');
        $this->assertTrue(is_array($this->responseData()));
        $this->assertNotEmpty($this->responseData());
    }
    /** @test */
    public function it_should_delete_order() {
        $order = ['id'=>'30'];

        $this->request('DELETE', '/orders', $order);

        $this->assertThatResponseHasStatus(200);
        $this->assertThatResponseHasContentType('application/json');
        $this->assertSame($this->responseData()['message'], 'Pedido excluído com sucesso!');
    }


}
