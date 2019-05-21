<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
  protected $table = 'users';

  protected $fillable = [
    'username',
    'name',
    'password',
    'created_at',
    'updated_at'
  ];
}
