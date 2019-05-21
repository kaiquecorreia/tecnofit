<?php
use App\App;

require './vendor/autoload.php';

$app = (new App())->get();

$app->run();
