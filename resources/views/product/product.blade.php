@extends('layouts.app')
@section('title','Laundry Shops')
@section('content')
<body id="detailedproduct" style="padding:0;">



@php
  $product_id = request()->route('id');
@endphp
<script>
  var product_id = {!! json_encode($product_id) !!};
</script>
@endsection