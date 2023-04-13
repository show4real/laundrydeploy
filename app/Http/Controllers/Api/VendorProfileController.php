<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Vendor;
use Str;
use Storage;

class VendorProfileController extends Controller
{
    public function profile(Request $request){
        $user= User::where('id', auth()->user()->id)->first();

        $vendor = Vendor::where('user_id', auth()->user()->id)->first();

        return response()->json(compact('user','vendor'));
    }

    public function editImage(Request $request)
    {
        $data= $request->image;
        $vendor = Vendor::where('user_id', auth()->user()->id)->first();

        $folder = "/vendors/";
        $img=preg_replace('#^data:image/[^;]+;base64,#', '', $data);
        $type=explode(';',$data)[0];
        $type=explode('/',$type)[1];
        $name=Str::random(7);
        $path = $folder . $name.'.'.$type;
        $url=url('/');

        $vendor = Vendor::where('id',$vendor->id)->first();
        $vendor->shop_image_url = $url."/storage".$path;
        $vendor->shop_image_name = $name;
        $vendor->save();
        
        Storage::disk('public')->put($path,base64_decode($img));
        

        return $vendor;
        
    }

    public function update(Request $request){
        

        /* User section */
        $user= User::where('id', auth()->user()->id)->first();
        $user->firstname= $request->firstname;
        $user->lastname= $request->lastname;
        $user->phone= $request->phone;
        $user->address= $request->address;
        $user->save();

        /* Vendor Profile */

        $vendor = Vendor::where('user_id', auth()->user()->id)->first();
        $vendor->country_code=$request->country_code;
        $vendor->delivery_fee =$request->delivery_fee;
        $vendor->shop_name = $request->shop_name;
        $vendor->opening_time = $request->opening_time;
        $vendor->closing_time = $request->closing_time;
        $vendor->longitude = $request->longitude;
        $vendor->latitude=$request->latitude;
        $vendor->description=$request->description;
        $vendor->distance=$request->distance;   
        $vendor->save();
       
        return response()->json(compact('vendor'));

    }

}
