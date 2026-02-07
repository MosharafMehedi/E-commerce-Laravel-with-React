<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        // Sample Full Data
        $products = [
            ['id' => 1, 'category' => "Gadgets", 'name' => "iPhone 15 Pro Max", 'price' => "1,58,000", 'rating' => 5, 'img' => "iPhone", 'tag' => "Hot", 'color' => "bg-blue-50", 'desc' => "The ultimate titanium design iPhone with A17 Pro chip."],
            ['id' => 2, 'category' => "Gadgets", 'name' => "Sony XM5 Headphones", 'price' => "38,500", 'rating' => 4, 'img' => "Audio", 'tag' => "Best", 'color' => "bg-purple-50", 'desc' => "Industry-leading noise cancellation and superior sound."],
            ['id' => 3, 'category' => "Laptops", 'name' => "MacBook M3 Pro", 'price' => "2,10,000", 'rating' => 5, 'img' => "Laptop", 'tag' => "New", 'color' => "bg-emerald-50", 'desc' => "Built for pro-level performance with the latest M3 chip."],
            ['id' => 4, 'category' => "Fashion", 'name' => "Apple Watch Ultra", 'price' => "95,000", 'rating' => 5, 'img' => "Watch", 'tag' => "Sale", 'color' => "bg-orange-50", 'desc' => "The most rugged Apple Watch for extreme athletes."],
            ['id' => 5, 'category' => "Gadgets", 'name' => "Samsung S24 Ultra", 'price' => "1,35,000", 'rating' => 4, 'img' => "Phone", 'tag' => "Hot", 'color' => "bg-indigo-50", 'desc' => "Experience the next level of mobile AI innovation."],
            ['id' => 6, 'category' => "Fashion", 'name' => "Nike Air Max 270", 'price' => "12,500", 'rating' => 5, 'img' => "Shoes", 'tag' => "New", 'color' => "bg-rose-50", 'desc' => "Stylish comfort for your daily lifestyle."],
            ['id' => 7, 'category' => "Kitchen", 'name' => "Nespresso Machine", 'price' => "24,000", 'rating' => 4, 'img' => "Coffee", 'tag' => "Best", 'color' => "bg-stone-50", 'desc' => "Perfect coffee brewing at the touch of a button."],
            ['id' => 8, 'category' => "Fitness", 'name' => "Adjustable Dumbbell", 'price' => "18,500", 'rating' => 5, 'img' => "Gym", 'tag' => "Top", 'color' => "bg-yellow-50", 'desc' => "Professional grade fitness gear for home."],
            ['id' => 9, 'category' => "Test", 'name' => "Test", 'price' => "1,500", 'rating' => 5, 'img' => "Gym", 'tag' => "Top", 'color' => "bg-yellow-50", 'desc' => "Professional grade fitness gear for home."],
        ];

        $search = $request->input('search');

        // Backend Search Logic
        $filteredProducts = collect($products)->when($search, function ($collection, $search) {
            return $collection->filter(function ($item) use ($search) {
                return str_contains(strtolower($item['name']), strtolower($search));
            });
        })->values();

        return Inertia::render('Dashboard', [
            'allProducts' => $filteredProducts, // filtered by search
            'filters' => $request->only(['search'])
        ]);
    }
}