<?php
use App\__tests__\ApiTestCase;

class UserApiTest extends ApiTestCase
{
  /** @test */
  public function it_should_create_user() {

    $user = ['name'=>'teste','username'=> ((String)mt_rand()), 'password' => '123456' ];
    $this->request('POST', '/users', $user);
    $_SESSION['model_id'] = $this->responseData()['id'];
    $this->assertThatResponseHasStatus(200);
    $this->assertThatResponseHasContentType('application/json');
    $this->assertTrue(is_array($this->responseData()));
    $this->assertNotEmpty($this->responseData());
}
    /** @test */
    public function it_should_search_all_users() {
        $this->request('GET', '/users');
        $this->assertThatResponseHasStatus(200);
        $this->assertThatResponseHasContentType('application/json');
        $this->assertTrue(is_array($this->responseData()));
    }
    /** @test */
    public function it_should_search_one_user() {

        $this->request('GET', "/users/{$_SESSION['model_id']}");
        $this->assertThatResponseHasStatus(200);
        $this->assertThatResponseHasContentType('application/json');
        $this->assertTrue(is_array($this->responseData()));
        $this->assertNotEmpty($this->responseData());
    }

    /** @test */
    public function it_should_update_user() {
        $user = ['id'=> $_SESSION['model_id'],'name'=>"teste_{$_SESSION['model_id']}",'username'=> ((String)mt_rand()),'password'=> ((String)mt_rand()) ];

        $this->request('PUT', '/users', $user);

        $this->assertThatResponseHasStatus(200);
        $this->assertThatResponseHasContentType('application/json');
        $this->assertTrue(is_array($this->responseData()));
        $this->assertNotEmpty($this->responseData());
    }
    /** @test */
    public function it_should_delete_user() {
        $user = ['id'=>$_SESSION['model_id']];

        $this->request('DELETE', '/users', $user);

        $this->assertThatResponseHasStatus(200);
        $this->assertThatResponseHasContentType('application/json');
        $this->assertSame($this->responseData()['message'], 'Usuário excluído com sucesso!');
    }


}
