import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import React, { useState, useMemo } from 'react';
import { 
  Zap, ArrowRight, Star, Plus, Smartphone, Shirt, Laptop, Coffee, 
  Dumbbell, LayoutGrid, X, Search, RotateCcw, Heart, ShoppingBag
} from 'lucide-react';

export default function Dashboard({ auth, allProducts, filters }) {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [activeCategory, setActiveCategory] = useState("All");
    const searchQuery = filters.search || "";

    const filteredProducts = useMemo(() => {
        return allProducts.filter(p => activeCategory === "All" || p.category === activeCategory);
    }, [activeCategory, allProducts]);

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="MShopping | Premium Store" />

            <div className="bg-[#f8f9fa] min-h-screen pb-20 px-4 md:px-8">
                <div className="max-w-7xl mx-auto pt-6">
                    
                    {/* --- MODERN HERO: Minimalist & Deep --- */}
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

                    {/* --- CATEGORY SELECTOR: Floating Pill Design --- */}
                    {!searchQuery && (
                        <div className="flex justify-center mb-16">
                            <div className="flex items-center gap-2 bg-white/50 backdrop-blur-md p-2 rounded-full border border-neutral-200 shadow-sm overflow-x-auto no-scrollbar max-w-full">
                                {["All", "Gadgets", "Laptops", "Fashion", "Kitchen", "Fitness","Test",].map((cat) => (
                                    <button
                                        key={cat}
                                        onClick={() => setActiveCategory(cat)}
                                        className={`px-6 py-2.5 rounded-full text-xs font-bold tracking-wide transition-all duration-300 ${
                                            activeCategory === cat 
                                            ? "bg-neutral-900 text-white shadow-lg" 
                                            : "text-neutral-500 hover:bg-neutral-100"
                                        }`}
                                    >
                                        {cat}
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

                    {/* --- PRODUCT GRID: Clean Card Aesthetic --- */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
                        {filteredProducts.map((product) => (
                            <div 
                                key={product.id} 
                                onClick={() => setSelectedProduct(product)}
                                className="group cursor-pointer"
                            >
                                <div className={`relative aspect-[1/1] rounded-[2rem] ${product.color} overflow-hidden mb-6 transition-all duration-500 group-hover:shadow-2xl`}>
                                    <img 
                                        src={`https://placehold.co/400x400/transparent/333?text=${product.img}`} 
                                        className="w-full h-full object-contain p-12 transition-transform duration-700 group-hover:scale-110" 
                                        alt={product.name} 
                                    />
                                    <div className="absolute top-5 right-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <div className="bg-white/90 backdrop-blur-md p-3 rounded-full shadow-lg">
                                            <Heart className="w-4 h-4 text-neutral-900" />
                                        </div>
                                    </div>
                                    <div className="absolute bottom-5 left-1/2 -translate-x-1/2 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                                        <button className="bg-neutral-900 text-white px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest">
                                            Quick View
                                        </button>
                                    </div>
                                </div>
                                <div className="space-y-1 px-2">
                                    <div className="flex justify-between items-center">
                                        <span className="text-[10px] font-bold text-orange-500 uppercase tracking-widest">{product.tag}</span>
                                        <div className="flex items-center gap-1">
                                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                            <span className="text-[10px] font-bold text-neutral-400">{product.rating}.0</span>
                                        </div>
                                    </div>
                                    <h3 className="text-lg font-medium text-neutral-900 tracking-tight leading-snug">{product.name}</h3>
                                    <p className="text-xl font-bold text-neutral-900 pt-1">৳{product.price}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* --- MODERN MODAL: Glassmorphism --- */}
                {selectedProduct && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <div className="absolute inset-0 bg-neutral-900/40 backdrop-blur-md transition-opacity" onClick={() => setSelectedProduct(null)} />
                        <div className="relative bg-white rounded-[3rem] max-w-5xl w-full grid md:grid-cols-2 gap-0 overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] animate-in zoom-in duration-300">
                            <div className={`${selectedProduct.color} p-12 flex items-center justify-center`}>
                                <img src={`https://placehold.co/600x600?text=${selectedProduct.img}`} className="w-full object-contain mix-blend-multiply" />
                            </div>
                            <div className="p-10 md:p-16 flex flex-col justify-center relative">
                                <button onClick={() => setSelectedProduct(null)} className="absolute top-8 right-8 text-neutral-400 hover:text-black transition-colors">
                                    <X className="w-6 h-6" />
                                </button>
                                <span className="text-orange-500 text-xs font-black uppercase tracking-[0.3em] mb-4">{selectedProduct.category}</span>
                                <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-neutral-900 mb-6">{selectedProduct.name}</h2>
                                <p className="text-neutral-500 text-sm md:text-base leading-relaxed mb-8 font-light italic">"{selectedProduct.desc}"</p>
                                <div className="mb-10">
                                    <span className="text-neutral-400 text-[10px] font-bold uppercase tracking-widest block mb-1">Price</span>
                                    <span className="text-5xl font-bold tracking-tighter">৳{selectedProduct.price}</span>
                                </div>
                                <div className="flex gap-4">
                                    <button className="flex-1 bg-neutral-900 text-white py-5 rounded-2xl font-bold text-sm uppercase tracking-widest hover:bg-orange-500 transition-all duration-300 shadow-xl shadow-neutral-200">
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