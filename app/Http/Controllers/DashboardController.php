<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        // 1. Get Search Query
        $search = $request->input('search');

        // 2. Fetch Dynamic Products with Relationships
        $products = Product::with('category')
            ->when($search, function ($query, $search) {
                $query->where('name', 'like', "%{$search}%")
                      ->orWhere('desc', 'like', "%{$search}%");
            })
            ->latest()
            ->get()
            ->map(function ($product) {
                // Background colors gulo dynamic assign korar jonno (jehetu database-e color field nei)
                $colors = ['bg-blue-50', 'bg-purple-50', 'bg-emerald-50', 'bg-orange-50', 'bg-indigo-50', 'bg-rose-50', 'bg-stone-50', 'bg-yellow-50'];
                $product->color = $colors[$product->id % count($colors)];
                return $product;
            });

        // 3. Render View with Data
        return Inertia::render('Dashboard', [
            'allProducts' => $products,
            'categories'  => Category::select('id', 'name')->get(), // Frontend filterer jonno
            'filters'     => $request->only(['search'])
        ]);
    }
}