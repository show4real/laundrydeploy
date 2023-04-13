@extends('layouts.app')
@section('title','Laundry Shops')
@section('content')

    <body id="categoryproducts" style="padding:0;">
      
    
    @php
  $category_id = request()->route('id');
@endphp
<script>
  var category_id = {!! json_encode($category_id) !!};
</script>
@endsection