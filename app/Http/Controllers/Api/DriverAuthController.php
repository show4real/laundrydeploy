<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Driver;
use App\Models\User;
use Str;
use Storage;

class DriverAuthController extends Controller
{
    public function login(Request $request){
     $credentials = ['email' => strtolower($request->get('username')), 'password' => $request->get('password')];
     $user= User::where('email', $request->username)->first();   
     $token = auth()->attempt($credentials);
     if($token){
        return response()->json([
        'user' => $user,
        'token' => $token,
    ]);
     } else {
         return response()->json(['error' => 'Unauthorized'], 401);
     }
    
  }

    public function profile(Request $request){
        $profile = Driver::where('driver_user_id', auth()->user()->id)->first();
        return response()->json(compact('profile'));
    }

  public function editImage($data, $driver_id)
    {

        $folder = "/drivers/";
        $img=preg_replace('#^data:image/[^;]+;base64,#', '', $data);
        $type=explode(';',$data)[0];
        $type=explode('/',$type)[1];
        $name=Str::random(7);
        $path = $folder . $name.'.'.$type;
        $url=url('/');

        $driver = Driver::where('id',$driver_id)->first();
        $driver->driver_image_url = $url."/storage".$path;
        $driver->driver_image_name = $name;
        $driver->save();
        
        Storage::disk('public')->put($path,base64_decode($img));
        
        return $driver;
        
    }

   public function update(Request $request){
         
            $user= User::where('id', auth()->user()->id)->first();
         
        
            $user->lastname = $request->name;
            $user->address = $request->address;
            $user->save();

            $driver= Driver::where('driver_user_id', $user->id)->first();
            $driver->name = $request->name;
            $driver->address = $request->address;
            $driver->save();
            if($request->image){
                $image=$request->image;
                $this->editImage($image, $driver->id);
                
            }
           
           
        return response()->json(compact('driver'));

    }


}
