 <?php

/**
 * AUTHENTICATION ROUTES
 */
$app->post('/signIn','AuthController:signIn');

/**
 * USER ROUTES
 */
$app->get('/users','UserController:index');
$app->get('/users/{id}','UserController:show');
$app->post('/users','UserController:store');
$app->put('/users','UserController:update');
$app->delete('/users','UserController:destroy');

/**
 * PRODUCT ROUTES
 */
$app->get('/products','ProductController:index');
$app->get('/products/{id}','ProductController:show');
$app->post('/products','ProductController:store');
$app->put('/products','ProductController:update');
$app->delete('/products','ProductController:destroy');
/**
 * ORDER ROUTES
 */
$app->get('/orders','OrderController:index');
$app->get('/orders/{id}','OrderController:show');
$app->post('/orders','OrderController:store');
$app->put('/orders','OrderController:update');
$app->delete('/orders','OrderController:destroy');


