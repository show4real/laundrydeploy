<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Vendor;
use App\Models\Product;
use App\Models\Service;
use App\Models\Category;
use Storage;
use Str;

class VendorProductController extends Controller
{
    public function index(Request $request){
        $vendor = Vendor::where('user_id', auth()->user()->id)->first();
        $products = Product::where('shop_id', $vendor->id)->search($request->search)
        ->paginate($request->rows, ['*'], 'page', $request->page);
       $categories = Category::get();
       $services = Service::get();
        return response()->json(compact('products','categories','services'));
    }

    public function uploadImage($data)
    {

        $folder = "/vendors/";
        $img=preg_replace('#^data:image/[^;]+;base64,#', '', $data);
        $type=explode(';',$data)[0];
        $type=explode('/',$type)[1];
        $name=Str::random(7);
        $path = $folder . $name.'.'.$type;
        $url=url('/');

        $product = new Product();
        $product->image_url = $url."/storage".$path;
        $product->image_name = $name;
        $product->save();
        
        Storage::disk('public')->put($path,base64_decode($img));
        

        return $product;
        
    }


    public function editImage($data, $product_id)
    {

        $folder = "/vendors/";
        $img=preg_replace('#^data:image/[^;]+;base64,#', '', $data);
        $type=explode(';',$data)[0];
        $type=explode('/',$type)[1];
        $name=Str::random(7);
        $path = $folder . $name.'.'.$type;
        $url=url('/');

        $product = Product::where('id',$product_id)->first();
        $product->image_url = $url."/storage".$path;
        $product->image_name = $name;
        $product->save();
        
        Storage::disk('public')->put($path,base64_decode($img));
        

        return $product;
        
    }


    public function save(Request $request){
        $vendor_id = Vendor::where('user_id', auth()->user()->id)->first()->id;
        $image=$request->image;
        $upload_response = $this->uploadImage($image);
        if($upload_response){
            $product= Product::where('id', $upload_response->id)->first();
            $product->service_id=$request->service;
            $product->cloth_name=$request->name;
            $product->category_id=$request->category;
            $product->price=$request->price;
            $product->status = 1;
            $product->shop_id = $vendor_id;
            $product->save();
            return response()->json(compact('product'));
        }
    }

    public function update(Request $request, Product $product){

        $vendor_id = Vendor::where('user_id', auth()->user()->id)->first()->id;
        $product->service_id=$request->service_id;
        $product->cloth_name=$request->cloth_name;
        $product->price=$request->price;
        $product->category_id=$request->category_id;
        $product->status = 1;
        $product->shop_id = $vendor_id;
        $product->save();
        if($request->image){
            $image=$request->image;
            $this->editImage($image, $product->id);
            
        }

        return response()->json(compact('product'));
    }



    public function show(Product $product){

        return response()->json(compact('product'));
    }

     public function delete($id, Request $request){
        $product = Product::where('id', $id)->first();
        $product->delete();
        return response()->json(true);
    }
}
