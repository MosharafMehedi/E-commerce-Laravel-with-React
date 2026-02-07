<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    public function index() {
        return Inertia::render('Admin/Products/Index', [
            'products' => Product::with('category')->latest()->get(),
            'categories' => Category::all()
        ]);
    }

    public function store(Request $request) {
        $validated = $request->validate([
            'name' => 'required|string',
            'category_id' => 'required',
            'price' => 'required',
            'quantity' => 'nullable|integer',
            'rating' => 'nullable|integer|max:5',
            'tag' => 'nullable|string',
            'desc' => 'nullable|string',
            'img' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('img')) {
            $validated['img'] = $request->file('img')->store('products', 'public');
        }

        Product::create($validated);
        return back();
    }

    public function update(Request $request, Product $product) {
        $validated = $request->validate([
            'name' => 'required',
            'category_id' => 'required',
            'price' => 'required',
            'quantity' => 'nullable|integer',
            'rating' => 'nullable|integer',
            'tag' => 'nullable',
            'desc' => 'nullable',
            'img' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('img')) {
            if ($product->img) Storage::disk('public')->delete($product->img);
            $validated['img'] = $request->file('img')->store('products', 'public');
        }

        $product->update($validated);
        return back();
    }

    public function destroy(Product $product) {
        if ($product->img) Storage::disk('public')->delete($product->img);
        $product->delete();
        return back();
    }
}