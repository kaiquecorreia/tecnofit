# INSTRUÇÕES

## Deve estar instalado

** composer https://getcomposer.org/
** node https://nodejs.org/en/
** servidor apache
** PHP 7.1 +


## BackEnd

Clonar a pasta do projeto em um servidor apache ou semelhante para iniciar a aplicação.

Após clonar a pasta, acessa a mesma em um terminal e execute composer install

```
~/pastaclonada composer install
```

Criar uma nova base de dados a partir do arquivo dentro da pasta banco-de-dados.

Configurar as informações de banco de dados dentro do arquivo src/env.php
com as informações do servidor em que o banco está rodando

```
<?php
// DATABASE CONFIGS
define("DB_DRIVER",'mysql');
define("DB_HOST",'locahost');
define("DB_NAME",'tecnofit');
define("DB_USERNAME",'root');
define("DB_PASSWORD",'root');
define("DB_CHARSET",'utf8');
define("DB_COLLATION",'utf8_general_ci');
define("DB_PREFIX",'');
// CORS CONFIGS
define("CORS_ORIGIN",'http://localhost:3000') ;

```
Caso o frontend seja testado em outro caminho configurar também a linha, caso contrário matenha como está

```
<?php
// CORS CONFIGS
define("CORS_ORIGIN",'http://localhost:3000') ;
```

### FrontEnd

Acessar pasta frontend, rodar o comando npm install para instalar as dependencias

Acessar o arquivo frontend/services/api.js e configurar a baseURL com a url do servidor que está rodando a aplicação.

```
const api = axios.create({
  baseURL: 'http://caminho/do/servidor',
  });
```

Executar o comando npm start dentro da pasta /frontend e aguardar uma página web abrir.

## Testar a aplicação

Para realizar os testes, na raiz do projeto execute o comando:
```
.\vendor\bin\phpunit para windows ./vendor/bin/phpunit para mac ou linux
```
Os testes serão realizados

## Acesso ao app web

Usuário e senha padrão para acessar o sistema
usuário: kaique
senha: 123456
