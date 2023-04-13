<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;

class LoginController extends Controller
{
    public function login(Request $request){
     $credentials = ['email' => strtolower($request->get('username')), 'password' => $request->get('password')];
     $user= User::where('email', $request->username)->first();   
     $token = auth()->attempt($credentials);
     if($token && $user->is_active == 1){
        return response()->json([
        'user' => $user,
        'token' => $token,
    ]);
     } else {
         return response()->json(['error' => 'Unauthorized'], 401);
     }
    
  }
}
