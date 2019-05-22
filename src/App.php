<?php
namespace App;
use Tuupola\Middleware\CorsMiddleware;
class App {

  private $app;

  public function __construct(){
    require __DIR__ . ('/env.php');
    $app = new \Slim\App([
      'debug'=> true,
      'settings' => [
          'displayErrorDetails' => true,
          'addContentLengthHeader' => false,
          'db'=>[
            'driver'=> DB_DRIVER,
            'host' => DB_HOST,
            'database' => DB_NAME,
            'username' => DB_USERNAME,
            'password' => DB_PASSWORD,
            'charset' => DB_CHARSET,
            'collation' => DB_COLLATION,
            'prefix' => DB_PREFIX,
          ]
      ],

  ]);
  $app->add(new CorsMiddleware([
    "origin" => [CORS_ORIGIN],
    "methods" => ["GET", "POST","PUT", "PATCH", "DELETE", "OPTIONS"],
    "headers.allow" => ["Origin", "Content-Type", "Authorization", "Accept", "ignoreLoadingBar", "X-Requested-With", "Access-Control-Allow-Origin"],
    "headers.expose" => [],
    "credentials" => true,
    "cache" => 0,
]));;
//   $app->add(new Tuupola\Middleware\CorsMiddleware([
//     "origin" => ["http://dominio.com.br"],
//     "methods" => ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
//     "headers.allow" => ["Origin", "Content-Type", "Authorization", "Accept", "ignoreLoadingBar", "X-Requested-With", "Access-Control-Allow-Origin"],
//     "headers.expose" => [],
//     "credentials" => true,
//     "cache" => 0,
// ]));
  $container = $app->getContainer();

  $capsule = new \Illuminate\Database\Capsule\Manager;
  $capsule->addConnection($container['settings']['db']);
  $capsule->setAsGlobal();
  $capsule->bootEloquent();

  $container['db'] = function ($container) use ($capsule) {
    return $capsule;
  };

  $container['AuthController'] = function ($container) {
      return new \App\Controllers\AuthController($container);
  };

  $container['UserController'] = function ($container) {
      return new \App\Controllers\UserController($container);
  };

  $container['ProductController'] = function ($container) {
    return new \App\Controllers\ProductController($container);
  };
  $container['OrderController'] = function ($container) {
    return new \App\Controllers\OrderController($container);
  };


  $container['auth'] = function ($container) {
    return new \App\Auth\auth;
  };
  require __DIR__ . '/routes/routes.php';
  $this->app = $app;
  }

  public function get(){
    return $this->app;
  }
}







