<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


Route::group([], function(){
    
    Route::view('/','home/home');
     Route::view('/test','home/test');
    Route::view('/shop','/category/category');
    Route::view('/category/{id}','/category/products');
    Route::view('/service/{id}','/service/products');
    Route::view('/categories','/category/categories');
     Route::view('/services','/home/services');


    Route::view('/carts','/product/cart');
    Route::view('/checkout','/product/checkout');
    Route::view('/product/{id}','/product/product');
    Route::view('/search/{id}','/product/search');

});

