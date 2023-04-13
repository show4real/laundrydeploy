@extends('layouts.app')
@section('title','Laundry Shops')
@section('content')
<body id="search" style="padding:0;">


@php
  $search = request()->route('id');
@endphp
<script>
  var search = {!! json_encode($search) !!};
</script>
@endsection