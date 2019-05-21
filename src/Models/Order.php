<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
  protected $table = 'orders';

  protected $fillable = [
    'user_id',
    'description',
    'status',
    'total',
    'created_at',
    'updated_at',
  ];

  public function products(){
    return $this->belongsToMany('App\Models\Product');
    // return $this->belongsToMany('App\Models\Product', 'product_orders', 'product_id', 'order_id');
  }
}
