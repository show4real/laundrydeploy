<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\Driver;
use App\Models\Vendor;

class OrderController extends Controller
{

    public function driverOrders(Request $request){
        $driver = Driver::where('driver_user_id', auth()->user()->id)->first();
        $orders = Order::where('driver_id', $driver->id)
        ->search($request->search)
        ->order($request->filter)
        ->with('products')
        ->paginate($request->rows, ['*'], 'page', $request->page);

         return response()->json(compact('orders'));
    }

    public function queuedOrders(Request $request){
        $orders = Order::search($request->search)
        ->where('driver_id', null)
        ->paginate($request->rows, ['*'], 'page', $request->page);

         return response()->json(compact('orders'));
    }

    public function adminOrders(Request $request){

        $orders = Order::search($request->search)
        ->order($request->filter)
        ->with('products')
        ->paginate($request->rows, ['*'], 'page', $request->page);

        return response()->json(compact('orders'));
    }

    public function vendorOrders(Request $request){
        $vendor = Vendor::where('user_id', auth()->user()->id)->first();

        $orders = Order::where('vendor_id', $vendor->id)
        ->search($request->search)
        ->order($request->filter)
        ->with('products')
        ->paginate($request->rows, ['*'], 'page', $request->page);

        return response()->json(compact('orders'));
    }


    public function acceptOrder(Request $request){
        $driver= Driver::where('driver_user_id', auth()->user()->id)->first();

        $order = Order::where('id',$request->order_id)->first();
        $order->pending = 0;
        $order->accept = 1;
        $order->completed = 0;
        $order->cancel = 0;
        $order->driver_id = $driver->id;
        $order->save();
        return response()->json(compact('order'));
    }

     public function completeOrder(Request $request){
        $order = Order::where('id',$request->order_id)->first();
        $driver= Driver::where('driver_user_id', auth()->user()->id)->first();

        $order->pending = 0;
        $order->accept = 0;
        $order->cancel = 0;
        $order->completed = 1;
        $order->driver_id = $driver->id;
        $order->delivery_date = now();
        $order->save();
        $success= "success";
        return response()->json(compact('success'));
    }

     public function cancelOrder(Request $request){
        $order = Order::where('id',$request->order_id)->first();
        $driver= Driver::where('driver_user_id', auth()->user()->id)->first();

        $order->pending = 0;
        $order->accept = 0;
        $order->completed = 0;
        $order->cancel = 1;
        $order->driver_id = null;
        $order->save();
        $success= "success";
        return response()->json(compact('success'));
    }

    public function updateOrder(Request $request){
        $order = Order::where('id', $request->id)->first();
        $driver = Driver::where('vendor_id', $order->vendor_id)->first();
            
            $order->pending = 0;
            $order->accept = 0;
            $order->cancel = 0;
            $order->completed = 1;
            $order->driver_id = $driver->id;
            $order->delivery_date = now();
            $order->save();

    
    }


    
}
