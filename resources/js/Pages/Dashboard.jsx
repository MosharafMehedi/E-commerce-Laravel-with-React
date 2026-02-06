import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { 
  ShoppingBag, Zap, Flame, ArrowRight, Star, Plus, 
  Smartphone, Tv, Watch, Shirt, Laptop, Coffee, 
  Dumbbell, Gift, ChevronRight, LayoutGrid 
} from 'lucide-react';

export default function MShoppingDashboard({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">MShopping Marketplace</h2>}
        >
            <Head title="MShopping - Premium Marketplace" />

            <div className="bg-[#f8f9fa] min-h-screen pb-16 font-sans">
                
                {/* --- MAIN WRAPPER (95% Width) --- */}
                <div className="max-w-[95%] mx-auto px-2 pt-6">
                    
                    {/* --- 1. HERO / SPECIAL OFFER SECTION --- */}
                    <div className="relative bg-[#131921] rounded-3xl h-[350px] md:h-[450px] overflow-hidden shadow-2xl mb-10">
                        <div className="absolute inset-0 z-10 flex flex-col justify-center px-8 md:px-16 text-white">
                            <div className="flex items-center gap-2 bg-white/10 w-fit px-4 py-1.5 rounded-full mb-6 backdrop-blur-md">
                                <Zap className="w-4 h-4 text-orange-400 fill-orange-400" />
                                <span className="text-[10px] font-bold uppercase tracking-[2px]">Weekend Flash Sale</span>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-black mb-4 leading-[1.1]">
                                UNLOCK THE <br /> <span className="text-orange-500 underline decoration-white/20">FUTURE.</span>
                            </h1>
                            <p className="text-gray-400 max-w-lg mb-8 text-sm md:text-lg leading-relaxed">
                                Don't miss out on the biggest tech revolution. Up to 75% off on premium smartphones and accessories.
                            </p>
                            <div className="flex gap-4">
                                <button className="bg-orange-500 text-white font-bold px-10 py-4 rounded-2xl hover:bg-orange-600 transition-all shadow-xl shadow-orange-500/20">
                                    Shop Now
                                </button>
                                <button className="bg-white/10 backdrop-blur-md text-white border border-white/20 font-bold px-10 py-4 rounded-2xl hover:bg-white/20 transition-all">
                                    View Catalog
                                </button>
                            </div>
                        </div>
                        {/* Background Image */}
                        <div className="absolute top-0 right-0 w-full h-full opacity-40">
                            <img src="https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&q=80" className="w-full h-full object-cover" alt="Hero Banner" />
                        </div>
                    </div>

                    {/* --- 2. BEST PRODUCTS SECTION --- */}
                    <section className="mb-12">
                        <div className="flex justify-between items-end mb-8 px-2">
                            <div>
                                <h3 className="text-3xl font-black text-gray-900 flex items-center gap-2">
                                    <Flame className="w-8 h-8 text-orange-600" /> Trending Now
                                </h3>
                                <p className="text-gray-500 mt-1">Products everyone is talking about right now</p>
                            </div>
                            <Link className="group text-sm font-bold text-gray-900 flex items-center bg-white px-6 py-3 rounded-2xl shadow-sm border border-gray-100 hover:bg-black hover:text-white transition-all">
                                See Full Collection <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                            <ProductCard name="iPhone 15 Pro Max" price="1,58,000" rating={5} img="iPhone" tag="Hot" color="bg-blue-50" />
                            <ProductCard name="Sony XM5 Headphones" price="38,500" rating={4} img="Audio" tag="Best" color="bg-purple-50" />
                            <ProductCard name="MacBook M3 Pro" price="2,10,000" rating={5} img="Laptop" tag="New" color="bg-emerald-50" />
                            <ProductCard name="Apple Watch Ultra" price="95,000" rating={5} img="Watch" tag="Sale" color="bg-orange-50" />
                            <ProductCard name="Samsung S24 Ultra" price="1,35,000" rating={4} img="Phone" tag="Hot" color="bg-indigo-50" />
                        </div>
                    </section>

                    {/* --- 3. NEW ADDED PRODUCTS (Wide Grid) --- */}
                    <section className="mb-12">
                        <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100">
                            <div className="flex items-center justify-between mb-10">
                                <div className="flex items-center">
                                    <div className="p-4 bg-orange-100 rounded-2xl mr-5">
                                        <Plus className="w-7 h-7 text-orange-600" />
                                    </div>
                                    <h3 className="text-3xl font-black text-gray-900">Newly Added Arrivals</h3>
                                </div>
                                <div className="flex gap-2">
                                    <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center cursor-pointer hover:bg-gray-50">←</div>
                                    <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center cursor-pointer hover:bg-gray-50">→</div>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                                <NewArrivalItem name="Insta360 X3 Camera" category="Electronics" price="45,000" />
                                <NewArrivalItem name="Razer BlackWidow V4" category="Gaming" price="12,500" />
                                <NewArrivalItem name="Nike Air Jordan 1" category="Fashion" price="18,000" />
                                <NewArrivalItem name="Nespresso Vertuo" category="Kitchen" price="22,000" />
                            </div>
                        </div>
                    </section>

                    {/* --- 4. MULTI CATEGORY GRID (Expanded) --- */}
                    <section>
                        <div className="flex items-center gap-3 mb-8 px-2">
                            <LayoutGrid className="w-8 h-8 text-gray-400" />
                            <h3 className="text-3xl font-black text-gray-900">Explore Categories</h3>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
                            <CategoryBox title="Gadgets" icon={<Smartphone />} color="text-blue-600" bg="bg-blue-50" count="1.2k Items" />
                            <CategoryBox title="Laptops" icon={<Laptop />} color="text-purple-600" bg="bg-purple-50" count="450 Items" />
                            <CategoryBox title="Fashion" icon={<Shirt />} color="text-orange-600" bg="bg-orange-50" count="3.8k Items" />
                            <CategoryBox title="Kitchen" icon={<Coffee />} color="text-emerald-600" bg="bg-emerald-50" count="890 Items" />
                            <CategoryBox title="Fitness" icon={<Dumbbell />} color="text-red-600" bg="bg-red-50" count="210 Items" />
                            <CategoryBox title="Gifts" icon={<Gift />} color="text-indigo-600" bg="bg-indigo-50" count="560 Items" />
                        </div>
                    </section>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}

/* --- REUSABLE COMPONENTS --- */

function ProductCard({ name, price, rating, img, tag, color }) {
    return (
        <div className="bg-white p-6 rounded-[2rem] border border-gray-100 hover:border-orange-200 hover:shadow-2xl transition-all duration-500 cursor-pointer group relative">
            <span className="absolute top-6 left-6 z-10 bg-black text-white text-[9px] font-black px-3 py-1 rounded-full tracking-[2px] uppercase">{tag}</span>
            <div className={`${color} rounded-[1.5rem] h-56 flex items-center justify-center mb-6 overflow-hidden relative`}>
                <img 
                    src={`https://placehold.co/400x400/ffffff/000000?text=${img}`} 
                    className="w-40 h-40 object-contain group-hover:scale-110 group-hover:-rotate-6 transition duration-700 mix-blend-multiply" 
                    alt={name} 
                />
            </div>
            <h4 className="font-extrabold text-gray-900 text-lg group-hover:text-orange-600 transition truncate mb-1">{name}</h4>
            <div className="flex text-orange-400 text-xs mb-4">
                {"★".repeat(rating)}{"☆".repeat(5-rating)}
            </div>
            <div className="flex justify-between items-center pt-4 border-t border-gray-50">
                <div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Price</p>
                    <span className="text-2xl font-black text-gray-900">৳{price}</span>
                </div>
                <button className="bg-black text-white p-4 rounded-2xl hover:bg-orange-600 transition-all shadow-lg hover:shadow-orange-500/40">
                    <ShoppingBag className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
}

function NewArrivalItem({ name, category, price }) {
    return (
        <div className="flex items-center space-x-6 group cursor-pointer">
            <div className="w-24 h-24 bg-gray-50 rounded-[1.5rem] flex-shrink-0 flex items-center justify-center border border-gray-100 group-hover:bg-orange-50 group-hover:border-orange-100 transition-all duration-300">
                <img src={`https://placehold.co/100x100?text=${category}`} className="w-14 h-14 object-contain" alt={name} />
            </div>
            <div>
                <p className="text-[10px] text-orange-600 font-black uppercase tracking-widest mb-1">{category}</p>
                <h5 className="font-bold text-gray-900 leading-tight mb-2 text-lg group-hover:text-orange-600">{name}</h5>
                <p className="text-xl font-black text-gray-900">৳{price}</p>
            </div>
        </div>
    );
}

function CategoryBox({ title, icon, color, bg, count }) {
    return (
        <div className={`${bg} p-8 rounded-[2rem] border border-transparent hover:border-white hover:shadow-xl transition-all duration-500 group cursor-pointer`}>
            <div className={`w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-6 ${color} group-hover:scale-110 transition-transform`}>
                {icon}
            </div>
            <h3 className="font-black text-xl text-gray-900 mb-1">{title}</h3>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">{count}</p>
            <div className="mt-6 flex items-center text-[10px] font-black uppercase tracking-widest text-gray-400 group-hover:text-black transition-colors">
                Explore <ArrowRight className="w-3 h-3 ml-2 group-hover:translate-x-2 transition-transform" />
            </div>
        </div>
    );
}