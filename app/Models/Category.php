<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use Illuminate\Database\Eloquent\Relations\HasMany;

class Category extends Model
{
    use HasFactory;

    protected $fillable=['name'];

	// protected $appends = ['no'];

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

	 public function products(): HasMany
    {
        return $this->hasMany(Product::class);
    }

	//  public function products()
    // {
    //   return $this->hasMany('App\Product', 'category_id', 'id');
    // }
}
