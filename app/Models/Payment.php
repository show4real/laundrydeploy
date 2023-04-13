<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    protected $appends = ['vendor_name','subscription'];
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

     public function getVendorNameAttribute(){
        $vendor = Vendor::where('id', $this->vendor_id)->first();
        if($vendor){
            return $vendor->shop_name;
        }
    }

     public function getSubscriptionAttribute(){
        $subscription = Subscription::where('id', $this->subscription_id)->first();
        if($subscription){
            return $subscription->name;
        }
    }
}
