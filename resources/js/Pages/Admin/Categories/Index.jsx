import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router } from '@inertiajs/react';
import { Plus, Trash2, Edit2, Check, X, Layers } from 'lucide-react';

export default function CategoryIndex({ auth, categories }) {
    const [editingId, setEditingId] = useState(null);
    
    // Form for Adding & Updating
    const { data, setData, post, put, delete: destroy, reset, processing } = useForm({
        name: '',
    });

    const submitStore = (e) => {
        e.preventDefault();
        post(route('categories.store'), { onSuccess: () => reset() });
    };

    const submitUpdate = (e, id) => {
        e.preventDefault();
        put(route('categories.update', id), { 
            onSuccess: () => { setEditingId(null); reset(); } 
        });
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Category Management" />

            <div className="bg-[#f8f9fa] min-h-screen py-12 px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center gap-4 mb-10">
                        <div className="bg-black p-3 rounded-2xl text-white">
                            <Layers size={24} />
                        </div>
                        <h1 className="text-3xl font-black italic tracking-tighter uppercase">Categories</h1>
                    </div>

                    {/* --- ADD CATEGORY FORM --- */}
                    <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm mb-10">
                        <form onSubmit={submitStore} className="flex gap-4">
                            <input 
                                type="text" 
                                value={data.name}
                                placeholder="Enter category name..." 
                                className="flex-1 border-none bg-slate-50 rounded-xl p-4 focus:ring-2 focus:ring-black transition-all"
                                onChange={e => setData('name', e.target.value)}
                            />
                            <button 
                                disabled={processing}
                                className="bg-black text-white px-8 py-4 rounded-xl font-bold uppercase tracking-widest text-[10px] hover:bg-orange-600 transition-all flex items-center gap-2"
                            >
                                <Plus size={16} /> Add New
                            </button>
                        </form>
                    </div>

                    {/* --- CATEGORY LIST --- */}
                    <div className="grid gap-4">
                        {categories.map((category) => (
                            <div key={category.id} className="bg-white border border-slate-100 p-5 rounded-[1.5rem] flex items-center justify-between group transition-all hover:shadow-md">
                                {editingId === category.id ? (
                                    /* EDIT MODE */
                                    <div className="flex flex-1 gap-3 items-center">
                                        <input 
                                            autoFocus
                                            defaultValue={category.name}
                                            className="flex-1 bg-slate-50 border-none rounded-lg p-2 text-sm focus:ring-1 focus:ring-black"
                                            onChange={e => setData('name', e.target.value)}
                                        />
                                        <button onClick={(e) => submitUpdate(e, category.id)} className="text-green-500 p-2"><Check size={18}/></button>
                                        <button onClick={() => setEditingId(null)} className="text-red-400 p-2"><X size={18}/></button>
                                    </div>
                                ) : (
                                    /* VIEW MODE */
                                    <>
                                        <div className="flex items-center gap-4">
                                            <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                                            <div>
                                                <h3 className="font-bold text-slate-800 uppercase tracking-tight">{category.name}</h3>
                                                <p className="text-[10px] text-slate-400 font-bold uppercase">{category.products_count} Products</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button 
                                                onClick={() => { setEditingId(category.id); setData('name', category.name); }}
                                                className="p-2 text-slate-400 hover:text-black hover:bg-slate-50 rounded-lg transition-all"
                                            >
                                                <Edit2 size={16} />
                                            </button>
                                            <button 
                                                onClick={() => router.delete(route('categories.destroy', category.id))}
                                                className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}