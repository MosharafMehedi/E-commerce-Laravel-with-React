<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class CategoryController extends Controller
{
    public function index() {
        return Inertia::render('Admin/Categories/Index', [
            'categories' => Category::withCount('products')->latest()->get()
        ]);
    }

    public function store(Request $request) {
        $request->validate(['name' => 'required|unique:categories,name']);
        Category::create([
            'name' => $request->name,
            'slug' => Str::slug($request->name)
        ]);
        return back();
    }

    public function update(Request $request, Category $category) {
        $request->validate(['name' => 'required|unique:categories,name,'.$category->id]);
        $category->update([
            'name' => $request->name,
            'slug' => Str::slug($request->name)
        ]);
        return back();
    }

    public function destroy(Category $category) {
        $category->delete();
        return back();
    }
}
