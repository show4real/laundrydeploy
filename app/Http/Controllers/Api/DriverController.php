<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Driver;
use App\Models\User;
use App\Models\Vendor;
use Validator;
use Str;
use Storage;

class DriverController extends Controller
{
    public function index(Request $request){
        $drivers = Driver::where('user_id', auth()->user()->id)
        ->paginate($request->rows, ['*'], 'page', $request->page);
        return response()->json(compact('drivers'));
    }

    public function index2(Request $request){
        $drivers = Driver::paginate($request->rows, ['*'], 'page', $request->page);
        return response()->json(compact('drivers'));
    }

    

   

   public function uploadImage($data)
    {

        $folder = "/drivers/";
        $img=preg_replace('#^data:image/[^;]+;base64,#', '', $data);
        $type=explode(';',$data)[0];
        $type=explode('/',$type)[1];
        $name=Str::random(7);
        $path = $folder . $name.'.'.$type;
        $url=url('/');
        $driver = new Driver();
        $driver->fleet_image_url = $url."/storage".$path;
        $driver->fleet_image_name = $name;
        $driver->save();
        
        Storage::disk('public')->put($path,base64_decode($img));
    
        return $driver;
        
    }

    public function editImage($data, $driver_id)
    {

        $folder = "/vendors/";
        $img=preg_replace('#^data:image/[^;]+;base64,#', '', $data);
        $type=explode(';',$data)[0];
        $type=explode('/',$type)[1];
        $name=Str::random(7);
        $path = $folder . $name.'.'.$type;
        $url=url('/');

        $driver = Driver::where('id',$driver_id)->first();
        $driver->fleet_image_url = $url."/storage".$path;
        $driver->fleet_image_name = $name;
        $driver->save();
        
        Storage::disk('public')->put($path,base64_decode($img));
        

        return $driver;
        
    }


    public function save(Request $request){
         $validator = Validator::make($request->all(), [
            'email' => 'required|unique:users,email',
        ]);

        if($validator->fails()){
          return response()->json($validator->messages(), 422);
        }
        $user= new User();
        $user->lastname = $request->name;
        $user->email = $request->email;
        $user->password = bcrypt($request->password);
        $user->driver = 1;
        $user->is_active = $request->is_active;
        $user->save();

        $image=$request->image;
        $upload_response = $this->uploadImage($image);

        $vendor = Vendor::where('user_id', auth()->user()->id)->first();

        if($upload_response){
            $driver= Driver::where('id', $upload_response->id)->first();
            $driver->user_id=auth()->user()->id;
            $driver->vendor_id=$vendor->id;
            $driver->driver_user_id=$user->id;
            $driver->name = $request->name;
            $driver->address = $request->address;
            $driver->fleet_number = $request->fleet_number;
            $driver->fleet_type = $request->fleet_type;
            $driver->email = $request->email;
            $driver->status = $request->is_active;
            $driver->save();

            
            return response()->json(compact('driver'));
        }
        
       
       
        return response()->json(compact('driver'));
    }

    public function update(Request $request, Driver $driver){
         
        $user= User::where('id', $driver->driver_user_id)->first();
         
         $validator = Validator::make($request->all(), [
            'email' => 'unique:users,email,'. $user->id
        ]);

        if($validator->fails()){
          return response()->json($validator->messages(), 422);
        }
            $user->lastname = $request->name;
            $user->email = $request->email;
            $user->password = bcrypt($request->password);
            $user->save();
            
            $driver->name = $request->name;
            $driver->address = $request->address;
            $driver->fleet_number = $request->fleet_number;
            $driver->fleet_type = $request->fleet_type;
            $driver->email = $request->email;
            $driver->status = $request->is_active;
            $driver->save();
            if($request->image){
                $image=$request->image;
                $this->editImage($image, $driver->id);
                
            }
           
           
        return response()->json(compact('driver'));

    }


    public function delete($id, Request $request){
        $driver = Driver::where('id', $id)->first();
        $driver->delete();
        return response()->json(true);
    }
}
