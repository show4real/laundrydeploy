<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Vendor;
use App\Models\Product;
use App\Models\Order;
use App\Models\Driver;
use App\Models\User;

class DashboardController extends Controller
{
    public function vendor(Request $request){
        $vendor = Vendor::where('user_id', auth()->user()->id)->first();
        $order = Order::where('vendor_id', $vendor->id)->count();
        $product = Product::where('shop_id', $vendor->id)->count();
        $driver = Driver::where('vendor_id', $vendor->id)->count();
        return response()->json(compact('order','product','driver'));
    }

     public function admin(Request $request){
      
        $order = Order::count();
        $vendor = Vendor::count();
        $product = Product::count();
        $driver = Driver::count();
        return response()->json(compact('order','vendor','product','driver'));
    }

    public function customer(Request $request){
       
        $order = Order::where('user_id', auth()->user()->id)->count();
        
        return response()->json(compact('order'));
    }

     public function profile(Request $request){
        $user= User::where('id', auth()->user()->id)->first();


        return response()->json(compact('user'));
    }
}
