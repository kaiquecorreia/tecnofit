<?php
use App\__tests__\ApiTestCase;


// use App\App;

class ProductApiTest extends ApiTestCase
{
    /** @test */
    public function it_should_create_product() {
      $product = ['name'=> ((String)mt_rand()), 'description'=>'teste', 'sku'=>'tet213', 'price'=> 20.00, 'stock', 30 ];
      $this->request('POST', '/products', $product);
      $_SESSION['model_id'] = $this->responseData()['id'];
      $this->assertThatResponseHasStatus(200);
      $this->assertThatResponseHasContentType('application/json');
      $this->assertTrue(is_array($this->responseData()));
      $this->assertNotEmpty($this->responseData());
  }
    /** @test */
    public function it_should_search_all_products() {
        $this->request('GET', '/products');

        $this->assertThatResponseHasStatus(200);
        $this->assertThatResponseHasContentType('application/json');
        $this->assertTrue(is_array($this->responseData()));
    }
    /** @test */
    public function it_should_search_one_product() {
        $this->request('GET', "/products/{$_SESSION['model_id']}");

        $this->assertThatResponseHasStatus(200);
        $this->assertThatResponseHasContentType('application/json');
        $this->assertTrue(is_array($this->responseData()));
        $this->assertNotEmpty($this->responseData());
    }

    /** @test */
    public function it_should_update_product() {
      $product = ['id'=> $_SESSION['model_id'] ,'name'=> ((String)mt_rand()), 'description'=>'teste', 'sku'=>'tet213', 'price'=> 20.00, 'stock', 30 ];

        $this->request('PUT', '/products', $product);

        $this->assertThatResponseHasStatus(200);
        $this->assertThatResponseHasContentType('application/json');
        $this->assertTrue(is_array($this->responseData()));
        $this->assertNotEmpty($this->responseData());
    }
    /** @test */
    public function it_should_delete_product() {
        $product = ['id'=> $_SESSION['model_id'] ];

        $this->request('DELETE', '/products', $product);

        $this->assertThatResponseHasStatus(200);
        $this->assertThatResponseHasContentType('application/json');
        $this->assertSame($this->responseData()['message'], 'Produto excluído com sucesso!');
    }


}
