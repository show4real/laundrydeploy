<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Order;

class CustomerOrderController extends Controller
{
     public function orders(Request $request){
        $orders = Order::where('user_id', auth()->user()->id)
        ->with('products')
        ->paginate($request->rows, ['*'], 'page', $request->page);
        return response()->json(compact('orders'));
    }

   

}
