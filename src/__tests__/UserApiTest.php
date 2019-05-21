<?php
use App\__tests__\ApiTestCase;


// use App\App;

class UserApiTest extends ApiTestCase
{
    /** @test */
    public function it_should_search_all_users() {
        $this->request('GET', '/users');

        $this->assertThatResponseHasStatus(200);
        $this->assertThatResponseHasContentType('application/json');
        $this->assertTrue(is_array($this->responseData()));
    }
    /** @test */
    public function it_should_search_one_user() {
        $this->request('GET', '/users/1');

        $this->assertThatResponseHasStatus(200);
        $this->assertThatResponseHasContentType('application/json');
        $this->assertTrue(is_array($this->responseData()));
        $this->assertNotEmpty($this->responseData());
    }
    /** @test */
    public function it_should_create_user() {
        $user = ['name'=>'teste','username'=> ((String)mt_rand()), '123456' ];

        $this->request('POST', '/users', $user);

        $this->assertThatResponseHasStatus(200);
        $this->assertThatResponseHasContentType('application/json');
        $this->assertTrue(is_array($this->responseData()));
        $this->assertNotEmpty($this->responseData());
    }
    /** @test */
    public function it_should_update_user() {
        $user = ['id'=>'3','name'=>'teste','username'=> ((String)mt_rand()),'password'=> md5('123456') ];

        $this->request('PUT', '/users', $user);

        $this->assertThatResponseHasStatus(200);
        $this->assertThatResponseHasContentType('application/json');
        $this->assertTrue(is_array($this->responseData()));
        $this->assertNotEmpty($this->responseData());
    }
    /** @test */
    public function it_should_delete_user() {
        $user = ['id'=>'2'];

        $this->request('DELETE', '/users', $user);

        $this->assertThatResponseHasStatus(200);
        $this->assertThatResponseHasContentType('application/json');
        $this->assertSame($this->responseData()['message'], 'Usuário excluído com sucesso!');
    }


}
