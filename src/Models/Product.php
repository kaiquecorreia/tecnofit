<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
  protected $table = 'products';

  protected $fillable = [
    'name',
    'description',
    'sku',
    'price',
    'stock',
    'created_at',
    'updated_at',
  ];

  public function orders(){
    return $this->belongsToMany('App\Models\Order')->using('App\Models\OrderProduct');
  }
}
