<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Vendor;
use App\Models\ShopImage;
use Validator;

class AdminVendorController extends Controller
{
     public function index(Request $request){
        $vendors = Vendor::search($request->search)
        ->with('user')
        ->paginate($request->rows, ['*'], 'page', $request->page);
       
        return response()->json(compact('vendors'));
    }

     private function extense($extension){
        $allowedfileExtension=['jpg','doc','docx','JPG','PNG','png','jpeg','jPG','pdf'];
       
        $check=in_array($extension,$allowedfileExtension);
        if($check){
            return true;
        }else{
           return false;
        }
    }

    private function uploadImage($file, $vendor_id, $user_id){
        if($this->extense($extension)){
            $image_name = time().$file->getClientOriginalName();
            $image = new ShopImage();
            $image->user_id= $user_id;
             $image->vendor_id= $vendor_id;
            $image->type=$file->getClientOriginalExtension();
            $path = 'vendors/'.$image_name;
            $url=url('/');
            $image->url = $url."/storage/".$path;
            $image->name = $file->getClientOriginalName();
            $image->save();
            $file->move(public_path('storage/vendors'), $image_name);

            } else {
            $errors="Invalid file type";
            return response()->json(compact('errors'), 422);
        }
    }

    public function save(Request $request){
        
        $vendor=  Vendor::where('user_id', $request->user_id)->first();
        $vendor->user_id=$request->user_id;
        $vendor->country_code=$request->country_code;
        $vendor->order_types =$request->order_types;
        $vendor->shop_name = $request->shop_name;
         $vendor->delivery_fee = $request->delivery_fee;
        $vendor->opening_time = $request->opening_time;
        $vendor->closing_time = $request->closing_time;
        $vendor->longitude = $request->longitude;
        $vendor->latitude=$request->latitude;
        $vendor->description=$request->description;
        $vendor->distance=$request->distance;
        $vendor->save();
        if($request->file('image')){
            $image=$request->file('image');
            $this->uploadImage($image, $vendor->id, $vendor->user_id);
            
        }
        return response()->json(compact('vendor'));
    }

    public function update(Request $request, Vendor $vendor){
        
        $vendor->user_id=$request->user_id;
        $vendor->address=$request->address;
        $vendor->country_code=$request->country_code;
        $vendor->order_types =$request->order_types;
        $vendor->shop_name = $request->shop_name;
        $vendor->opening_time = $request->opening_time;
        $vendor->closing_time = $request->closing_time;
        $vendor->longitude = $request->longitude;
        $vendor->latitude=$request->latitude;
        $vendor->description=$request->description;
        $vendor->distance_range=$request->distance_range;
        $vendor->order_types=$request->order_types;
        $vendor->save();

        return response()->json(compact('vendor'));
    }
}
