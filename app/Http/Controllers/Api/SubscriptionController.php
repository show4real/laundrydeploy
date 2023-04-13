<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Subscription;
use Validator;
use Str;

class SubscriptionController extends Controller
{
    public function index(Request $request){
        $subscriptions = Subscription::search($request->search)
        ->paginate($request->rows, ['*'], 'page', $request->page);
        return response()->json(compact('subscriptions'));
    }

    public function show(Subscription $subscription){

        return response()->json(compact('subscription'));
    }

    public function save(Request $request){
        $validator = Validator::make($request->all(), [
        
            'name' => 'required|unique:subscriptions'
        ]);

        if($validator->fails()){
          return response()->json($validator->messages(), 422);
        }
        $subscription= new Subscription();
        $subscription->name = $request->name;
        $subscription->price = $request->price;
        $subscription->days = $request->days;
        $subscription->save();
        return response()->json(compact('subscription'));
    }


    public function update(Request $request, Subscription $subscription){

        $validator = Validator::make($request->all(), [
            'name' => 'unique:subscriptions,name,'. $subscription->id
        ]);

        if($validator->fails()){
          return response()->json($validator->messages(), 422);
        }
        $subscription->name = $request->name;
        $subscription->price = $request->price;
        $subscription->days = $request->days;
        $subscription->save();
        return response()->json(compact('subscription'));
    }

     public function delete($id, Request $request){
        $subscription = Subscription::where('id', $id)->first();
        $subscription->delete();
        return response()->json(true);
    }
}
