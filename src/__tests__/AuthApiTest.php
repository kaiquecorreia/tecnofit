<?php
use App\__tests__\ApiTestCase;


// use App\App;

class AuthApiTest extends ApiTestCase
{
    /** @test */
    public function it_should_signin_app() {
        //Usuário e senha existente no banco de dados
        $userLogin = ['username'=>'kaique', 'password'=>'123456'];

        $this->request('POST', '/signIn', $userLogin);

        $this->assertThatResponseHasStatus(200);
        $this->assertThatResponseHasContentType('application/json');
        $this->assertTrue(is_array($this->responseData()));
    }

    /** @test */
    public function it_should_have_signin_error() {
      //Usuário e senha incorretos!
      $userLogin = ['username'=>'kaiqu', 'password'=>'12456'];

      $this->request('POST', '/signIn', $userLogin);

      $this->assertThatResponseHasStatus(401);
      $this->assertThatResponseHasContentType('application/json');
      $this->assertSame($this->responseData()['message'], 'Oops! Usuário e/ou senha incorretos.');
    }
}
