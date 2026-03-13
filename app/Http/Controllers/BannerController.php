<?php

namespace App\Http\Controllers;

use App\Models\Banner;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class BannerController extends Controller
{
    public function index() {
        return Inertia::render('Admin/Banners/index', [
            'banners' => Banner::orderBy('order', 'asc')->get(),
            'categories' => Category::orderBy('name', 'asc')->get(['id', 'name'])
        ]);
    }

    public function store(Request $request) {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'subtitle' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'image' => 'required|image|mimes:jpg,jpeg,png,webp|max:2048',
            'tag' => 'required|string|max:50', // Must be required
            'button_text' => 'nullable|string|max:50',
            'category_name' => 'required|string',
            'order' => 'nullable|integer',
        ]);

        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('banners', 'public');
        }

        Banner::create($data);
        return back()->with('success', 'Banner created successfully!');
    }

    public function update(Request $request, Banner $banner) {
    $data = $request->validate([
        'title' => 'required|string|max:255',
        'subtitle' => 'nullable|string|max:255',
        'description' => 'nullable|string',
        'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048', // এখানে nullable থাকবে
        'tag' => 'required|string|max:50',
        'button_text' => 'nullable|string|max:50',
        'category_name' => 'required|string',
        'order' => 'nullable|integer',
    ]);

    if ($request->hasFile('image')) {
        // নতুন ছবি আপলোড করলে পুরোনোটি ডিলিট করা
        if ($banner->image && Storage::disk('public')->exists($banner->image)) {
            Storage::disk('public')->delete($banner->image);
        }
        $data['image'] = $request->file('image')->store('banners', 'public');
    } else {
        // রিকোয়েস্টে ছবি না থাকলে, $data থেকে image সরিয়ে ফেলুন
        // যাতে ডাটাবেসে null না যায়
        unset($data['image']);
    }

    $banner->update($data);
    return back()->with('success', 'Banner updated successfully!');
}

    public function destroy(Banner $banner) {
        if ($banner->image && Storage::disk('public')->exists($banner->image)) {
            Storage::disk('public')->delete($banner->image);
        }
        $banner->delete();
        return back()->with('success', 'Banner deleted successfully!');
    }
}