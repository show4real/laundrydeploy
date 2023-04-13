<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vendor extends Model
{
    use HasFactory;

    protected $appends= ['address'];

    public function scopeSearch($query, $filter)
    {
    	$searchQuery = trim($filter);
    	$requestData = ['shop_name'];
        $userData = ['address'];
    	$query->when($filter!='', function ($query) use($requestData, $userData, $searchQuery) {
    		return $query->where(function($q) use($requestData, $searchQuery) {
    			foreach ($requestData as $field){
    				$q->orWhere($field, 'like', "%{$searchQuery}%");
                }
    		})->orWhere(function ($qq) use ($userData, $searchQuery) {
                        foreach ($userData as $field) {
                            $qq->orWhereHas('user', function ($qqq) use ($userData, $searchQuery, $field) {
                                $qqq->where($field, 'like', "%{$searchQuery}%");
                            });
                        }
            });
    	});
    }

   public function user(){
        $user = $this->belongsTo('App\Models\User', 'user_id');
        if($user){
            return $user;
        }
    }

    public function getAddressAttribute(){
        $user = User::where('id', $this->user_id)->first();
        if($user){
            return $user->address;
        }
        return '';
    }

    public function products(){
      return $this->hasMany('App\Models\Product', 'shop_id');
    }

    
}
