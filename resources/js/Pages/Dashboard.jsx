import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import React, { useState, useMemo } from 'react';
import { 
  Zap, ArrowRight, Star, Plus, Smartphone, Shirt, Laptop, Coffee, 
  Dumbbell, LayoutGrid, X, Search, RotateCcw, Heart, ShoppingBag
} from 'lucide-react';

export default function Dashboard({ auth, allProducts, filters, categories }) {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [activeCategory, setActiveCategory] = useState("All");
    const searchQuery = filters.search || "";

    // Dynamic Category Filtering Logic
    const filteredProducts = useMemo(() => {
        return allProducts.filter(p => {
            // Database-er data-te category object thake, tai p.category.name check korchi
            const productCat = p.category?.name || "Uncategorized";
            return activeCategory === "All" || productCat === activeCategory;
        });
    }, [activeCategory, allProducts]);

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="MShopping | Premium Store" />

            <div className="bg-[#f8f9fa] min-h-screen pb-20 px-4 md:px-8">
                <div className="mx-auto pt-6">
                    
                    {/* --- MODERN HERO --- */}
                    {!searchQuery && (
                        <div className="relative group rounded-[2.5rem] h-[350px] md:h-[480px] overflow-hidden bg-neutral-900 mb-12 shadow-2xl">
                            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent z-10" />
                            <div className="relative z-20 h-full flex flex-col justify-center px-8 md:px-16 text-white">
                                <span className="inline-block px-4 py-1.5 mb-6 text-[10px] font-bold tracking-[0.2em] uppercase bg-orange-500 rounded-full w-fit">
                                    Limited Edition
                                </span>
                                <h1 className="text-5xl md:text-8xl font-medium tracking-tight mb-4">
                                    Future <span className="font-serif italic text-orange-500">Living.</span>
                                </h1>
                                <p className="text-neutral-400 max-w-md text-sm md:text-base font-light leading-relaxed mb-8">
                                    Experience the next generation of tech aesthetics. Curated for those who appreciate the finer details.
                                </p>
                                <button className="group flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full font-bold w-fit hover:bg-orange-500 hover:text-white transition-all duration-500">
                                    Shop Collection <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                                </button>
                            </div>
                            <img 
                                src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070" 
                                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 opacity-60" 
                                alt="Modern Tech" 
                            />
                        </div>
                    )}

                    {/* --- CATEGORY SELECTOR: Now Dynamic --- */}
                    {!searchQuery && (
                        <div className="flex justify-center mb-16">
                            <div className="flex items-center gap-2 bg-white/50 backdrop-blur-md p-2 rounded-full border border-neutral-200 shadow-sm overflow-x-auto no-scrollbar max-w-full">
                                <button
                                    onClick={() => setActiveCategory("All")}
                                    className={`px-6 py-2.5 rounded-full text-xs font-bold tracking-wide transition-all duration-300 ${
                                        activeCategory === "All" ? "bg-neutral-900 text-white shadow-lg" : "text-neutral-500 hover:bg-neutral-100"
                                    }`}
                                >
                                    All
                                </button>
                                {categories && categories.map((cat) => (
                                    <button
                                        key={cat.id}
                                        onClick={() => setActiveCategory(cat.name)}
                                        className={`px-6 py-2.5 rounded-full text-xs font-bold tracking-wide transition-all duration-300 ${
                                            activeCategory === cat.name 
                                            ? "bg-neutral-900 text-white shadow-lg" 
                                            : "text-neutral-500 hover:bg-neutral-100"
                                        }`}
                                    >
                                        {cat.name}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* --- GRID HEADER --- */}
                    <div className="flex items-baseline justify-between mb-10">
                        <div className="flex items-center gap-4">
                            <h2 className="text-3xl font-light tracking-tight text-neutral-900">
                                {searchQuery ? "Search Results" : "Featured Products"}
                            </h2>
                            <span className="text-neutral-300">/</span>
                            <span className="text-sm font-medium text-orange-600 uppercase tracking-widest">{activeCategory}</span>
                        </div>
                    </div>

                    {/* --- PRODUCT GRID --- */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 p-4">
    {filteredProducts.map((product) => (
        <div 
            key={product.id} 
            onClick={() => setSelectedProduct(product)}
            className="group cursor-pointer"
        >
            {/* 1. Image Container - Premium Floating Feel */}
            <div className={`relative aspect-[1/1] rounded-[2.5rem] ${product.color || 'bg-[#F7F7F8]'} overflow-hidden mb-6 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] group-hover:-translate-y-2`}>
                
                {/* Minimal Badge */}
                <div className="absolute top-6 left-6 z-10">
                    <span className="bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-2xl text-[10px] font-black uppercase tracking-[0.15em] text-neutral-800 shadow-sm border border-white/50">
                        {product.tag || 'Exclusive'}
                    </span>
                </div>

                {/* Main Product Image */}
                <div className="w-full h-full p-12 transition-all duration-700 ease-out group-hover:scale-110">
                    <img 
                        src={product.img ? `/storage/${product.img}` : `https://placehold.co/400x400/eeeeee/999999?text=${product.name}`} 
                        className="w-full h-full object-contain drop-shadow-2xl" 
                        alt={product.name} 
                    />
                </div>

                {/* Bottom Overlay Button */}
                <div className="absolute inset-x-0 bottom-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out flex justify-center">
                    <button className="bg-white text-black w-full py-3.5 rounded-2xl text-[11px] font-bold uppercase tracking-widest shadow-xl hover:bg-black hover:text-white transition-all duration-300">
                        View Details
                    </button>
                </div>
            </div>

            {/* 2. Content Section - Clean & Balanced */}
            <div className="px-2 space-y-1">
                <div className="flex justify-between items-center">
                    <div className="flex gap-1">
                        {/* Custom Dot Rating */}
                        {[1, 2, 3, 4, 5].map((dot) => (
                            <div key={dot} className={`h-1.5 w-1.5 rounded-full ${dot <= (product.rating || 5) ? 'bg-orange-500' : 'bg-neutral-200'}`} />
                        ))}
                    </div>
                    <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-tighter">
                        Best Seller
                    </span>
                </div>

                <h3 className="text-xl font-semibold text-neutral-900 tracking-tight leading-tight group-hover:text-neutral-500 transition-colors">
                    {product.name}
                </h3>

                <div className="flex items-end justify-between pt-1">
                    <p className="text-2xl font-black text-neutral-900 leading-none">
                        <span className="text-xs font-normal mr-0.5">৳</span>
                        {product.price.toLocaleString()}
                    </p>
                    
                    {/* Minimalist Cart Arrow (Pure CSS/SVG) */}
                    <div className="h-10 w-10 rounded-full border border-neutral-200 flex items-center justify-center group-hover:bg-black group-hover:border-black transition-all duration-500">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="group-hover:text-white transition-colors">
                            <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    ))}
</div>
                </div>

                {/* --- MODERN MODAL --- */}
                {selectedProduct && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <div className="absolute inset-0 bg-neutral-900/40 backdrop-blur-md transition-opacity" onClick={() => setSelectedProduct(null)} />
                        <div className="relative bg-white rounded-[3rem] max-w-5xl w-full grid md:grid-cols-2 gap-0 overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] animate-in zoom-in duration-300">
                            <div className={`${selectedProduct.color || 'bg-slate-100'} p-12 flex items-center justify-center`}>
                                <img 
                                    src={selectedProduct.img ? `/storage/${selectedProduct.img}` : `https://placehold.co/600x600?text=${selectedProduct.name}`} 
                                    className="w-full object-contain mix-blend-multiply" 
                                />
                            </div>
                            <div className="p-10 md:p-16 flex flex-col justify-center relative">
                                <button onClick={() => setSelectedProduct(null)} className="absolute top-8 right-8 text-neutral-400 hover:text-black transition-colors">
                                    <X className="w-6 h-6" />
                                </button>
                                <span className="text-orange-500 text-xs font-black uppercase tracking-[0.3em] mb-4">
                                    {selectedProduct.category?.name || "Premium"}
                                </span>
                                <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-neutral-900 mb-6">{selectedProduct.name}</h2>
                                <p className="text-neutral-500 text-sm md:text-base leading-relaxed mb-8 font-light italic">
                                    {selectedProduct.desc || "Exquisite design meets unparalleled performance."}
                                </p>
                                <div className="mb-10">
                                    <span className="text-neutral-400 text-[10px] font-bold uppercase tracking-widest block mb-1">Price</span>
                                    <span className="text-5xl font-bold tracking-tighter">৳{selectedProduct.price}</span>
                                </div>
                                <div className="flex gap-4">
                                    <button className="flex-1 bg-neutral-900 text-white py-5 rounded-2xl font-bold text-sm uppercase tracking-widest hover:bg-blue-400 transition-all duration-300 shadow-xl shadow-neutral-200">
                                        Add to Cart
                                    </button>
                                    <button className="p-5 border border-neutral-200 rounded-2xl hover:bg-neutral-50 transition-colors group">
                                        <Heart className="w-5 h-5 text-neutral-400 group-hover:text-red-500 transition-colors" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}