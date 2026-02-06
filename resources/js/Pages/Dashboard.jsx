import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import React, { useState, useMemo } from 'react';
import { 
  ShoppingBag, Zap, Flame, ArrowRight, Star, Plus, 
  Smartphone, Tv, Watch, Shirt, Laptop, Coffee, 
  Dumbbell, Gift, ChevronRight, LayoutGrid, X, Search, RotateCcw, Heart
} from 'lucide-react';

export default function MShoppingDashboard({ auth }) {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState("All");
    const [cartCount, setCartCount] = useState(0);

    // Sample Full Data
    const allProducts = [
        { id: 1, category: "Gadgets", name: "iPhone 15 Pro Max", price: "1,58,000", rating: 5, img: "iPhone", tag: "Hot", color: "bg-blue-50", desc: "The ultimate titanium design iPhone with A17 Pro chip." },
        { id: 2, category: "Gadgets", name: "Sony XM5 Headphones", price: "38,500", rating: 4, img: "Audio", tag: "Best", color: "bg-purple-50", desc: "Industry-leading noise cancellation and superior sound." },
        { id: 3, category: "Laptops", name: "MacBook M3 Pro", price: "2,10,000", rating: 5, img: "Laptop", tag: "New", color: "bg-emerald-50", desc: "Built for pro-level performance with the latest M3 chip." },
        { id: 4, category: "Fashion", name: "Apple Watch Ultra", price: "95,000", rating: 5, img: "Watch", tag: "Sale", color: "bg-orange-50", desc: "The most rugged Apple Watch for extreme athletes." },
        { id: 5, category: "Gadgets", name: "Samsung S24 Ultra", price: "1,35,000", rating: 4, img: "Phone", tag: "Hot", color: "bg-indigo-50", desc: "Experience the next level of mobile AI innovation." },
        { id: 6, category: "Fashion", name: "Nike Air Max 270", price: "12,500", rating: 5, img: "Shoes", tag: "New", color: "bg-rose-50", desc: "Stylish comfort for your daily lifestyle." },
        { id: 7, category: "Kitchen", name: "Nespresso Machine", price: "24,000", rating: 4, img: "Coffee", tag: "Best", color: "bg-stone-50", desc: "Perfect coffee brewing at the touch of a button." },
        { id: 8, category: "Fitness", name: "Adjustable Dumbbell", price: "18,500", rating: 5, img: "Gym", tag: "Top", color: "bg-yellow-50", desc: "Professional grade fitness gear for home." },
    ];

    // Filter Logic
    const filteredProducts = useMemo(() => {
        return allProducts.filter(p => {
            const matchesCategory = activeCategory === "All" || p.category === activeCategory;
            const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }, [activeCategory, searchQuery]);

    const addToCart = () => {
        setCartCount(prev => prev + 1);
        setSelectedProduct(null);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 w-full px-2">
                    <div className="flex items-center gap-4">
                        <div className="bg-orange-600 p-2.5 rounded-2xl shadow-lg shadow-orange-200">
                            <ShoppingBag className="text-white w-6 h-6" />
                        </div>
                        <h2 className="font-black text-2xl text-gray-900 tracking-tighter uppercase">MShopping</h2>
                    </div>
                    
                    <div className="relative flex-1 max-w-2xl group">
                        <input 
                            type="text" 
                            placeholder="Search premium products..." 
                            className="w-full pl-14 pr-4 py-4 rounded-3xl border-none bg-gray-100 focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all shadow-sm"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <Search className="absolute left-5 top-4.5 text-gray-400 w-5 h-5 group-focus-within:text-orange-600 transition-colors" />
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="relative p-3 bg-white border border-gray-100 rounded-2xl shadow-sm hover:bg-gray-50 transition">
                            <ShoppingBag className="w-6 h-6 text-gray-700" />
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-orange-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full animate-bounce">
                                    {cartCount}
                                </span>
                            )}
                        </button>
                    </div>
                </div>
            }
        >
            <Head title="MShopping - Ultimate Marketplace" />

            <div className="bg-[#fcfcfc] min-h-screen pb-20 font-sans">
                <div className="max-w-[95%] mx-auto px-2 pt-8">
                    
                    {/* --- 1. PREMIUM HERO SECTION --- */}
                    <div className="relative bg-[#0f1111] rounded-[3rem] h-[400px] md:h-[500px] overflow-hidden shadow-2xl mb-14">
                        <div className="absolute inset-0 z-10 flex flex-col justify-center px-10 md:px-24 text-white">
                            <div className="flex items-center gap-2 bg-orange-500/20 backdrop-blur-md w-fit px-5 py-2 rounded-full mb-8 border border-orange-500/30">
                                <Zap className="w-4 h-4 text-orange-400 fill-orange-400" />
                                <span className="text-xs font-black uppercase tracking-[3px] text-orange-400">Exclusive Deals</span>
                            </div>
                            <h1 className="text-6xl md:text-8xl font-black mb-6 leading-[0.85] tracking-tighter">
                                THE NEW <br /> <span className="text-orange-500">STANDARD.</span>
                            </h1>
                            <p className="text-gray-400 max-w-lg mb-12 text-lg font-medium leading-relaxed">
                                Curating the world's most premium tech and lifestyle essentials. High performance meets elegant design.
                            </p>
                            <button className="bg-orange-600 text-white font-black px-14 py-5 rounded-[2rem] w-fit hover:bg-orange-700 hover:scale-105 transition-all shadow-2xl shadow-orange-600/30 active:scale-95">
                                Explore Collection
                            </button>
                        </div>
                        <div className="absolute top-0 right-0 w-full h-full opacity-50">
                            <img src="https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?auto=format&fit=crop&q=80" className="w-full h-full object-cover" alt="Hero" />
                        </div>
                    </div>

                    {/* --- 2. CATEGORY NAV BAR (Combined Style) --- */}
                    <section className="mb-16 overflow-x-auto no-scrollbar py-4 px-2">
                        <div className="flex items-center gap-5">
                            <CategoryTab active={activeCategory === "All"} label="All Items" icon={<LayoutGrid />} onClick={() => setActiveCategory("All")} />
                            <CategoryTab active={activeCategory === "Gadgets"} label="Gadgets" icon={<Smartphone />} onClick={() => setActiveCategory("Gadgets")} />
                            <CategoryTab active={activeCategory === "Laptops"} label="Laptops" icon={<Laptop />} onClick={() => setActiveCategory("Laptops")} />
                            <CategoryTab active={activeCategory === "Fashion"} label="Fashion" icon={<Shirt />} onClick={() => setActiveCategory("Fashion")} />
                            <CategoryTab active={activeCategory === "Kitchen"} label="Kitchen" icon={<Coffee />} onClick={() => setActiveCategory("Kitchen")} />
                            <CategoryTab active={activeCategory === "Fitness"} label="Fitness" icon={<Dumbbell />} onClick={() => setActiveCategory("Fitness")} />
                            <CategoryTab active={activeCategory === "Gifts"} label="Gift Ideas" icon={<Gift />} onClick={() => setActiveCategory("Gifts")} />
                        </div>
                    </section>

                    {/* --- 3. DYNAMIC PRODUCT GRID --- */}
                    <section className="px-2">
                        <div className="flex justify-between items-end mb-12">
                            <div>
                                <h3 className="text-5xl font-black text-gray-900 tracking-tighter capitalize">{activeCategory} Items</h3>
                                <div className="h-1.5 w-24 bg-orange-600 mt-4 rounded-full"></div>
                            </div>
                            {activeCategory !== "All" && (
                                <button onClick={() => setActiveCategory("All")} className="flex items-center gap-2 text-gray-400 font-bold hover:text-black transition">
                                    <RotateCcw className="w-4 h-4" /> Reset Filters
                                </button>
                            )}
                        </div>

                        {filteredProducts.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
                                {filteredProducts.map((product) => (
                                    <div key={product.id} onClick={() => setSelectedProduct(product)}>
                                        <ProductCard {...product} />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="bg-white rounded-[4rem] p-32 text-center border-4 border-dashed border-gray-100">
                                <Search className="w-20 h-20 text-gray-100 mx-auto mb-6" />
                                <h4 className="text-3xl font-black text-gray-300">No match found</h4>
                                <p className="text-gray-400 mt-2 text-lg">Try a different keyword or category</p>
                            </div>
                        )}
                    </section>
                </div>

                {/* --- 4. QUICK VIEW MODAL (Premium Style) --- */}
                {selectedProduct && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/90 backdrop-blur-xl transition-all">
                        <div className="bg-white rounded-[4rem] max-w-6xl w-full p-10 md:p-20 relative overflow-hidden animate-in zoom-in duration-500 shadow-[0_0_100px_rgba(255,165,0,0.2)]">
                            <button onClick={() => setSelectedProduct(null)} className="absolute top-10 right-10 p-4 bg-gray-50 hover:bg-black hover:text-white rounded-full transition-all duration-300">
                                <X className="w-6 h-6" />
                            </button>
                            
                            <div className="grid md:grid-cols-2 gap-20 items-center">
                                <div className={`${selectedProduct.color} rounded-[3.5rem] p-20 flex items-center justify-center relative group`}>
                                    <img src={`https://placehold.co/600x600?text=${selectedProduct.img}`} className="w-full h-full object-contain mix-blend-multiply drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)] transition duration-700 group-hover:scale-110" alt={selectedProduct.name} />
                                    <div className="absolute bottom-10 left-10 flex gap-2">
                                        <span className="bg-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-sm">Certified Premium</span>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-center gap-3 mb-6">
                                        <span className="bg-orange-600 text-white px-5 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase">{selectedProduct.tag}</span>
                                        <div className="flex text-orange-400 scale-110">{"★".repeat(selectedProduct.rating)}</div>
                                    </div>
                                    <h2 className="text-6xl font-black text-gray-900 mb-8 leading-none tracking-tighter">{selectedProduct.name}</h2>
                                    <p className="text-gray-500 text-xl mb-12 leading-relaxed font-medium">{selectedProduct.desc}</p>
                                    
                                    <div className="flex items-center gap-8 mb-14">
                                        <div className="flex flex-col">
                                            <span className="text-gray-400 text-xs font-black uppercase tracking-widest mb-1">Price</span>
                                            <span className="text-7xl font-black text-gray-900 tracking-tighter">৳{selectedProduct.price}</span>
                                        </div>
                                        <div className="h-20 w-px bg-gray-100"></div>
                                        <div className="bg-green-50 text-green-600 px-6 py-3 rounded-2xl font-black text-sm border border-green-100 flex items-center gap-2">
                                            <Zap className="w-4 h-4 fill-green-600" /> In Stock
                                        </div>
                                    </div>

                                    <div className="flex gap-6">
                                        <button 
                                            onClick={addToCart}
                                            className="flex-1 bg-black text-white py-8 rounded-[2.5rem] font-black text-2xl hover:bg-orange-600 transition-all shadow-[0_20px_50px_rgba(0,0,0,0.2)] active:scale-95"
                                        >
                                            Add To Cart
                                        </button>
                                        <button className="p-8 border-2 border-gray-100 rounded-[2.5rem] hover:bg-gray-50 transition-all hover:border-orange-200">
                                            <Heart className="w-8 h-8 text-gray-400 hover:text-orange-600 transition-colors" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}

/* --- REUSABLE COMPONENTS --- */

function CategoryTab({ active, label, icon, onClick }) {
    return (
        <button 
            onClick={onClick}
            className={`px-10 py-5 rounded-[2.5rem] font-black uppercase tracking-widest text-[11px] transition-all flex items-center gap-4 border-2 flex-shrink-0 ${active ? "bg-orange-600 text-white border-orange-600 shadow-2xl shadow-orange-600/30 -translate-y-1" : "bg-white text-gray-400 border-gray-100 hover:border-orange-200 hover:text-gray-600"}`}
        >
            {React.cloneElement(icon, { className: "w-5 h-5" })} {label}
        </button>
    );
}

function ProductCard({ name, price, rating, img, tag, color }) {
    return (
        <div className="bg-white p-8 rounded-[3.5rem] border border-gray-100 hover:shadow-[0_50px_100px_-20px_rgba(0,0,0,0.12)] transition-all duration-700 cursor-pointer group relative overflow-hidden">
            <div className={`${color} rounded-[2.5rem] h-72 flex items-center justify-center mb-10 overflow-hidden relative shadow-inner group-hover:bg-white transition-colors duration-700`}>
                <img 
                    src={`https://placehold.co/400x400/ffffff/000000?text=${img}`} 
                    className="w-52 h-52 object-contain group-hover:scale-125 group-hover:-rotate-12 transition duration-700 mix-blend-multiply drop-shadow-lg" 
                />
            </div>
            <div className="space-y-3">
                <div className="flex justify-between items-center">
                    <span className="text-orange-600 font-black text-[11px] uppercase tracking-[4px]">{tag}</span>
                    <div className="flex text-orange-400 text-[10px]">{"★".repeat(rating)}</div>
                </div>
                <h4 className="font-black text-gray-900 text-3xl tracking-tighter truncate">{name}</h4>
            </div>
            <div className="flex justify-between items-center mt-12">
                <div className="flex flex-col">
                    <span className="text-gray-400 text-[10px] font-black uppercase tracking-widest mb-1">Starting From</span>
                    <span className="text-4xl font-black text-gray-900 tracking-tighter">৳{price}</span>
                </div>
                <div className="bg-gray-100 text-black p-6 rounded-[2rem] group-hover:bg-orange-600 group-hover:text-white group-hover:rotate-[360deg] transition-all duration-700 shadow-sm">
                    <Plus className="w-7 h-7" />
                </div>
            </div>
        </div>
    );
}