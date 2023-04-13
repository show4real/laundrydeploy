<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Category;
use Validator;
use Storage;
use Str;

class CategoryController extends Controller
{
    public function index(Request $request){
        $categories = Category::search($request->search)
           ->paginate($request->rows, ['*'], 'page', $request->page);
        return response()->json(compact('categories'));
    }

    public function show(Category $category){

        return response()->json(compact('category'));
    }

    public function uploadImage($data)
    {

        $folder = "/category/";
        $img=preg_replace('#^data:image/[^;]+;base64,#', '', $data);
        $type=explode(';',$data)[0];
        $type=explode('/',$type)[1];
        $name=Str::random(7);
        $path = $folder . $name.'.'.$type;
        $url=url('/');

        $category = new Category();
        $category->image_url = $url."/storage".$path;
        $category->image_name = $name;
        $category->save();
        
        Storage::disk('public')->put($path,base64_decode($img));
        

        return $category;
        
    }

    public function editImage($data, $category_id)
    {

        $folder = "/vendors/";
        $img=preg_replace('#^data:image/[^;]+;base64,#', '', $data);
        $type=explode(';',$data)[0];
        $type=explode('/',$type)[1];
        $name=Str::random(7);
        $path = $folder . $name.'.'.$type;
        $url=url('/');

        $category = Category::where('id',$category_id)->first();
        $category->image_url = $url."/storage".$path;
        $category->image_name = $name;
        $category->save();
        
        Storage::disk('public')->put($path,base64_decode($img));
        

        return $category;
        
    }

    public function save(Request $request){
        $validator = Validator::make($request->all(), [
        
            'name' => 'required|unique:categories'
        ]);

        if($validator->fails()){
          return response()->json($validator->messages(), 422);
        }
        $image=$request->image;
        $upload_response = $this->uploadImage($image);
        if($upload_response){
            $category= Category::where('id', $upload_response->id)->first();
            $category->name = $request->name;
            $category->slug =Str::slug($request->name);
            $category->save();
            return response()->json(compact('category'));
        }

    }


    public function update(Request $request, Category $category){

        $validator = Validator::make($request->all(), [
            'name' => 'unique:categories,name,'. $category->id
        ]);

        if($validator->fails()){
          return response()->json($validator->messages(), 422);
        }
        $category->name = $request->name;
        $category->slug = Str::slug($request->name);
        $category->save();
        if($request->image){

            $this->editImage($request->image, $category->id);
            
        }

        return response()->json(compact('category'));
    }

     public function delete($id, Request $request){
        $category = Category::where('id', $id)->first();
        $category->delete();
        $category_id = Category::first()->id;
        Product::where('category_id', '=', $category->id)->update(['category_id' => $category_id]);
        return response()->json(true);
    }
}
