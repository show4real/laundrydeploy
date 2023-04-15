<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\OrderProduct;
use App\Events\OrderCreated;
use App\Models\Category;
use App\Models\User;
use App\Models\Product;
use App\Models\Vendor;
use App\Models\Service;
use App\Jobs\CustomerJob;

class CustomerController extends Controller
{
    public function addOrder(Request $request){

        $check= User::where('email', $request->email)->first();
      
        
        $user = $check ? $check :new User();
        if(!$check){
            $user->firstname = $request->name;
            $user->email = $request->email;
            $user->phone = $request->phone;
            $user->address = $request->address;
            $user->admin=0;
            $user->vendor=0;
            $user->customer=1;
            $user->is_active =1;
            $user->password=bcrypt($request->phone);
            $user->save();
           
        }
        

        $order = new Order();
        $order->user_id = $user->id;
        $order->customer_name = $request->name;
        $order->customer_address = $request->address;
        $order->customer_phone = $request->phone;
        $order->customer_latitude = $request->latitude;
        $order->customer_longitude = $request->longitude;
        $order->vendor_id = $request->vendor;
        $order->total_price = $request->total_price;
        $order->order_date = now();
        $order->pending = 1;
        $order->completed = 0;
        $order->cancel = 0;
        $order->accept = 0;
        $order->save();
        
       
        foreach($request->carts as $cart){
            $order_product = new OrderProduct();
            $order_product->product_id = $cart['id'];
            $order_product->price = $cart['price'];
            $order_product->order_id = $order->id;
            $order_product->vendor_id = $request->vendor;
            $order_product->save();
        }
        
        //event(new OrderCreated());
         CustomerJob::dispatch($user);

        return response()->json(compact('order'));
    }

    public function category(Request $request){
        $category = Category::where('id', $request->category_id)->first();
        return response()->json(compact('category'));
    }

    public function service(Request $request){
        $service = Service::where('id', $request->service_id)->first();
        return response()->json(compact('service'));
    }

    public function categories(Request $request){
        $categories = Category::has('products')->withCount('products')
        ->get();
        return response()->json(compact('categories'));
    }

     public function products(Request $request){
        $products = Product::where('shop_id', $request->vendor)
        ->where('status', 1)
        ->paginate($request->rows, ['*'], 'page', $request->page);
        return response()->json(compact('products'));
    }

    public function shops(Request $request){
       
        $shops = Vendor::with('products')->get()->map(function($shops) {
             $shops->setRelation('products', $shops->products->take(4));
             return $shops;
        });

        return response()->json(compact('shops'));
    }

    public function vendors(Request $request){
        $vendors = User::search($request->search)
        ->where('vendor', 1)
        ->where('is_active', 1)->with('vendor')
        ->paginate($request->rows, ['*'], 'page', $request->page);
       
        // $vendors = Vendor::search($request->search)
        // ->paginate($request->rows, ['*'], 'page', $request->page);
           
        return response()->json(compact('vendors'));
    }

    public function categoryProducts(Request $request){
        $products = Product::where('shop_id', $request->vendor)
        ->filter($request->category_id)
           ->paginate($request->rows, ['*'], 'page', $request->page);
        return response()->json(compact('products'));
    }



    public function serviceProducts(Request $request){
        $products = Product::where('shop_id', $request->vendor)
        ->where('status', 1)
        ->service($request->service_id)
           ->paginate($request->rows, ['*'], 'page', $request->page);
        return response()->json(compact('products'));
    }

    public function search(Request $request){
        $searches = Product::search($request->search)
            ->where('status', 1)
            ->with('vendor')
            ->paginate($request->rows, ['*'], 'page', $request->page);
        return response()->json(compact('searches'));
    }

    public function product(Product $product){
        $product->load('vendor');

        return response()->json(compact('product'));
    }
}


 

