@extends('layouts.app')
@section('title','Laundry Shops')
@section('content')

    <body id="serviceproducts" style="padding:0;">
      
    
    @php
  $service_id = request()->route('id');
@endphp
<script>
  var service_id = {!! json_encode($service_id) !!};
</script>
@endsection