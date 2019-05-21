<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Relations\Pivot;
class ProductOrder extends Pivot
{
  protected $table = 'order_product';

  protected $fillable = [
    'product_id',
    'order_id',
    'amount',
    'created_at',
    'updated_at',
  ];

  // public function ordersProduct(){
  //   return $this->belongsTo('App\Models\Order');
  // }
  // public function Product(){
  //   return $this->hasOne('App\Models\Product');
  // }
}
