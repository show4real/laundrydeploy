<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Driver extends Model
{
    use HasFactory;
    protected $appends = ['vendor_name','user_name'];

    public function getVendorNameAttribute(){
        $vendor = Vendor::where('user_id', $this->user_id)->first();
        if($vendor){
            return $vendor->shop_name;
        }
    }

     public function getUserNameAttribute(){
        $vendor = User::where('id', $this->user_id)->first();
        if($vendor){
            return $vendor->firstname." ".$vendor->lastname;
        }
    }
}
