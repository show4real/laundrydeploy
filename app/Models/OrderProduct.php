<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderProduct extends Model
{
    use HasFactory;
    protected $table = 'orders_products';

    protected $appends = ['product_name','price'];

      public function getProductNameAttribute()
    {
        $product = Product::where('id', $this->product_id)->first();
        if($product){
            return $product->cloth_name;
        }
       return null;
    }

     public function getPriceAttribute()
    {
        $product = Product::where('id', $this->product_id)->first();
        if($product){
            return $product->price;
        }
       return null;
    }
}
