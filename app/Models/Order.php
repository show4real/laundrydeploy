<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Order extends Model
{
    use HasFactory;

    protected $appends = ['vendor_name','driver_name','vendor_latitude',
    'vendor_longitude','status'];

    public function scopeOrder($query, $filter){
        if($filter == null){
         return $query->latest();
        } else if($filter == 'Pending') {
            return $query->where("pending", 1)->latest();
        } else if($filter == 'Completed'){
            return $query->where("completed", 1)->latest();
        } else if($filter == 'Cancelled'){  
             return $query->where("cancel", 1)->latest();
        }else if($filter == 'Transit'){  
             return $query->where("accept", 1)->latest();
        }
    }

    public function scopeSearch($query, $filter)
    {
    	$searchQuery = trim($filter);
    	$requestData = ['name'];
    	$query->when($filter!='', function ($query) use($requestData, $searchQuery) {
    		return $query->where(function($q) use($requestData, $searchQuery) {
    			foreach ($requestData as $field)
    				$q->orWhere($field, 'like', "%{$searchQuery}%");
    			});
    	});
    }

     public function getStatusAttribute()
    {
       if($this->pending == 1){
        return "Pending";
       } else if ($this->completed == 1){
        return "Completed";
       } else if ($this->accept ==1){
        return "Intransit";
       } else if ($this->cancel == 1){
        return "Cancelled";
       } else if ($this->driver_id == null){
        return "Awaiting Driver";
       }
    }

    public function getVendorNameAttribute()
    {
        $vendor = Vendor::where('id', $this->vendor_id)->first();
        if($vendor){
            return $vendor->shop_name;
        }
       return null;
    }

     public function getVendorLatitudeAttribute()
    {
        $vendor = Vendor::where('id', $this->vendor_id)->first();
        if($vendor){
            return $vendor->latitude;
        }
       return null;
    }

      public function getVendorLongitudeAttribute()
    {
        $vendor = Vendor::where('id', $this->vendor_id)->first();
        if($vendor){
            return $vendor->longitude;
        }
       return null;
    }

   

     public function getDriverNameAttribute()
    {
        $user = User::where('id', $this->driver_id)->first();
        if($user){
            return $user->firstname." ".$user->lastname;
        }
       return null;
    }

    public function products(): HasMany
    {
        return $this->hasMany(OrderProduct::class);
    }

    
    
   
}
