<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Payment;
use App\Models\Subscription;
use App\Models\Vendor;
use Validator;
use Str;

class PaymentHistoryController extends Controller
{
    public function index(Request $request){
        $vendor = Vendor::where('user_id', auth()->user()->id)->first();

        $payments = Payment::search($request->search)
        ->where('vendor_id', $vendor->id )
        ->paginate($request->rows, ['*'], 'page', $request->page);
        $subscriptions = Subscription::get();
        return response()->json(compact('payments','subscriptions'));
    }

     public function adminIndex(Request $request){
        $payments = Payment::search($request->search)
        ->paginate($request->rows, ['*'], 'page', $request->page);
          $subscriptions = Subscription::get();
        return response()->json(compact('payments','subscriptions'));
    }

    public function show(Payment $payment){

        return response()->json(compact('payment'));
    }

    public function save(Request $request){
        $vendor = Vendor::where('user_id', auth()->user()->id)->first();
        $payment= new Payment();
        $payment->depositor = $request->depositor;
        $payment->bank = $request->bank;
        $payment->amount = $request->amount;
        $payment->subscription_id = $request->subscription_id;
        $payment->description = $request->description;
        $payment->date = $request->date;
        $payment->vendor_id = $vendor->id;
        $payment->save();
        return response()->json(compact('payment'));
    }


    public function update(Request $request, Payment $payment){

        $payment->depositor = $request->depositor;
        $payment->bank = $request->bank;
        $payment->amount = $request->amount;
        $payment->subscription_id = $request->subscription_id;
        $payment->description = $request->description;
        $payment->date = $request->date;
        $payment->save();
        return response()->json(compact('payment'));
    }

    public function adminUpdate(Request $request, Payment $payment){

       
        $payment->status = $request->is_active;
        $payment->save();
        return response()->json(compact('payment'));
    }

     public function delete($id, Request $request){
        $payment = Payment::where('id', $id)->first();
        $payment->delete();
        return response()->json(true);
    }
}
