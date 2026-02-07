import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router } from '@inertiajs/react';
import { Plus, Trash2, Edit2, X, Star, Zap, Package, ImageIcon } from 'lucide-react';

export default function Index({ auth, products, categories }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editData, setEditData] = useState(null);

    const { data, setData, post, reset, processing, errors } = useForm({
        name: '', category_id: '', price: '', quantity: 0, desc: '', tag: '', rating: 5, img: null
    });

    const submit = (e) => {
        e.preventDefault();
        const options = { onSuccess: () => { setIsModalOpen(false); reset(); setEditData(null); }};
        if (editData) {
            router.post(route('products.update', editData.id), { ...data, _method: 'PUT' }, options);
        } else {
            post(route('products.store'), options);
        }
    };

    const openEdit = (product) => {
        setEditData(product);
        setData({
            name: product.name,
            category_id: product.category_id,
            price: product.price,
            quantity: product.quantity,
            desc: product.desc,
            tag: product.tag,
            rating: product.rating,
            img: null
        });
        setIsModalOpen(true);
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Products" />
            <div className="p-8 max-w-7xl mx-auto">
                
                {/* Header */}
                <div className="flex justify-between items-center mb-10">
                    <h1 className="text-3xl font-black italic uppercase tracking-tighter">Inventory</h1>
                    <button onClick={() => { reset(); setEditData(null); setIsModalOpen(true); }} className="bg-black text-white px-6 py-3 rounded-xl flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest shadow-xl">
                        <Plus size={16} /> Add Product
                    </button>
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {products.map(product => (
                        <div key={product.id} className="bg-white rounded-[2.5rem] border border-slate-50 p-6 transition-all hover:shadow-2xl group relative">
                            {/* Stock Badge */}
                            <div className={`absolute top-6 right-6 z-10 text-[9px] font-black px-3 py-1 rounded-full uppercase flex items-center gap-1 ${product.quantity > 0 ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                                <Package size={10}/> {product.quantity > 0 ? `${product.quantity} In Stock` : 'Out of Stock'}
                            </div>

                            {/* Tag */}
                            {product.tag && (
                                <div className="absolute top-6 left-6 z-10 bg-orange-500 text-white text-[9px] font-black px-3 py-1 rounded-full uppercase flex items-center gap-1">
                                    <Zap size={10} fill="currentColor"/> {product.tag}
                                </div>
                            )}

                            {/* Image Area */}
                            <div className="w-full h-56 bg-slate-50 rounded-[2rem] mb-6 overflow-hidden flex items-center justify-center relative">
                                {product.img ? (
                                    <img src={`/storage/${product.img}`} className="w-full h-full object-contain p-6 mix-blend-multiply" />
                                ) : (
                                    <ImageIcon className="text-slate-200" size={48} />
                                )}
                                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                                    <button onClick={() => openEdit(product)} className="bg-white p-4 rounded-2xl shadow-lg hover:scale-110 transition-transform"><Edit2 size={18}/></button>
                                    <button onClick={() => router.delete(route('products.destroy', product.id))} className="bg-white p-4 rounded-2xl shadow-lg text-red-500 hover:scale-110 transition-transform"><Trash2 size={18}/></button>
                                </div>
                            </div>

                            {/* Details */}
                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest">{product.category?.name}</span>
                                    <div className="flex text-orange-400">
                                        {[...Array(5)].map((_, i) => <Star key={i} size={10} fill={i < (product.rating || 5) ? "currentColor" : "none"} className={i < (product.rating || 5) ? "" : "text-slate-200"} />)}
                                    </div>
                                </div>
                                <h3 className="text-xl font-black text-slate-900 tracking-tighter italic uppercase truncate">{product.name}</h3>
                                <p className="text-slate-400 text-xs line-clamp-2 italic">{product.desc || "No description provided."}</p>
                                <div className="pt-4 border-t border-slate-50 flex justify-between items-center">
                                    <span className="text-2xl font-black text-slate-900">৳{product.price}</span>
                                    <span className="text-[10px] font-bold text-slate-300 uppercase italic">ID: #{product.id}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* MODAL */}
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/10 backdrop-blur-sm">
                        <div className="bg-white rounded-[3rem] p-10 w-full max-w-xl shadow-2xl animate-in zoom-in duration-200 max-h-[90vh] overflow-y-auto">
                            <div className="flex justify-between items-center mb-8">
                                <h2 className="text-2xl font-black italic uppercase tracking-tighter">{editData ? 'Edit Product' : 'New Product'}</h2>
                                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-50 rounded-full"><X/></button>
                            </div>
                            
                            <form onSubmit={submit} className="grid grid-cols-2 gap-4">
                                <div className="col-span-2">
                                    <label className="text-[9px] font-black uppercase text-slate-400 ml-2">Product Name</label>
                                    <input type="text" value={data.name} className="w-full bg-slate-50 border-none rounded-xl p-4 text-sm" required onChange={e => setData('name', e.target.value)} />
                                </div>
                                <div>
                                    <label className="text-[9px] font-black uppercase text-slate-400 ml-2">Category</label>
                                    <select value={data.category_id} className="w-full bg-slate-50 border-none rounded-xl p-4 text-sm" onChange={e => setData('category_id', e.target.value)}>
                                        <option value="">Select</option>
                                        {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="text-[9px] font-black uppercase text-slate-400 ml-2">Price</label>
                                    <input type="text" value={data.price} className="w-full bg-slate-50 border-none rounded-xl p-4 text-sm" onChange={e => setData('price', e.target.value)} />
                                </div>
                                <div>
                                    <label className="text-[9px] font-black uppercase text-slate-400 ml-2">Quantity</label>
                                    <input type="number" value={data.quantity} className="w-full bg-slate-50 border-none rounded-xl p-4 text-sm" onChange={e => setData('quantity', e.target.value)} />
                                </div>
                                <div>
                                    <label className="text-[9px] font-black uppercase text-slate-400 ml-2">Rating (1-5)</label>
                                    <input type="number" max="5" value={data.rating} className="w-full bg-slate-50 border-none rounded-xl p-4 text-sm" onChange={e => setData('rating', e.target.value)} />
                                </div>
                                <div className="col-span-2">
                                    <label className="text-[9px] font-black uppercase text-slate-400 ml-2">Tag (e.g. Hot, New)</label>
                                    <input type="text" value={data.tag} className="w-full bg-slate-50 border-none rounded-xl p-4 text-sm" onChange={e => setData('tag', e.target.value)} />
                                </div>
                                <div className="col-span-2">
                                    <label className="text-[9px] font-black uppercase text-slate-400 ml-2">Image</label>
                                    <input type="file" className="w-full bg-slate-50 border-none rounded-xl p-4 text-xs" onChange={e => setData('img', e.target.files[0])} />
                                </div>
                                <div className="col-span-2">
                                    <label className="text-[9px] font-black uppercase text-slate-400 ml-2">Description</label>
                                    <textarea value={data.desc} className="w-full bg-slate-50 border-none rounded-xl p-4 h-24 text-sm" onChange={e => setData('desc', e.target.value)} />
                                </div>
                                <button className="col-span-2 bg-black text-white py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-blue-600 transition-all shadow-xl">
                                    {processing ? 'Processing...' : 'Confirm Inventory'}
                                </button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}