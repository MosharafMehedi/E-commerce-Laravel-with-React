import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, router } from "@inertiajs/react";
import {
    Plus, Trash2, Edit, X, Image as ImageIcon,
    Save, Upload, Hash, Tag, Type, LayoutGrid
} from "lucide-react";

export default function Banners({ auth, banners, categories = [] }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [editId, setEditId] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    const { data, setData, post, processing, reset, errors, clearErrors } =
        useForm({
            title: "",
            subtitle: "",
            description: "",
            image: null,
            tag: "", // Initialized
            button_text: "Shop Now",
            category_name: "All",
            order: 0,
        });

    const openModal = (banner = null) => {
        if (banner) {
            setEditMode(true);
            setEditId(banner.id);
            setData({
                title: banner.title || "",
                subtitle: banner.subtitle || "",
                description: banner.description || "",
                image: null,
                tag: banner.tag || "",
                button_text: banner.button_text || "Shop Now",
                category_name: banner.category_name || "All",
                order: banner.order || 0,
            });
            setPreviewUrl(`/storage/${banner.image}`);
        } else {
            setEditMode(false);
            reset();
            setPreviewUrl(null);
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        clearErrors();
        reset();
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData("image", file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const submit = (e) => {
    e.preventDefault();

    if (editMode) {
        // সরাসরি router.post ব্যবহার করলে ফাইল আপলোড ও PUT spoofing নিখুঁতভাবে কাজ করে
        router.post(route("banners.update", editId), {
            ...data,
            _method: "PUT", // এটিই লারাভেলকে শান্ত করবে
        }, {
            forceFormData: true,
            onSuccess: () => closeModal(),
        });
    } else {
        post(route("banners.store"), {
            onSuccess: () => closeModal(),
        });
    }
};

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Banner Management" />

            <div className="min-h-screen bg-[#f8fafc] pb-12">
                <div className="bg-white border-b border-slate-200 sticky top-0 z-20">
                    <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
                        <div>
                            <h1 className="text-xl font-bold text-slate-900 tracking-tight">Banner Management</h1>
                            <p className="text-xs text-slate-500 font-medium">Control your homepage hero sliders</p>
                        </div>
                        <button
                            onClick={() => openModal()}
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all shadow-sm"
                        >
                            <Plus size={18} /> Add New Banner
                        </button>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-6 mt-8">
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50/50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                                    <th className="px-6 py-4">Preview</th>
                                    <th className="px-6 py-4">Details</th>
                                    <th className="px-6 py-4">Tag</th>
                                    <th className="px-6 py-4">Order</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {banners.map((banner) => (
                                    <tr key={banner.id} className="hover:bg-slate-50/50 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="w-32 h-16 rounded-lg bg-slate-100 border border-slate-200 overflow-hidden">
                                                <img src={`/storage/${banner.image}`} className="w-full h-full object-cover" alt="" />
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm font-bold text-slate-800">{banner.title}</div>
                                            <div className="text-[11px] text-slate-400 mt-0.5 italic">{banner.category_name}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="px-2.5 py-1 bg-amber-50 text-amber-600 rounded-lg text-[10px] font-black uppercase border border-amber-100">
                                                {banner.tag}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-sm font-medium text-slate-600">#{banner.order}</span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-2">
                                                <button onClick={() => openModal(banner)} className="p-2 text-slate-400 hover:text-indigo-600 rounded-lg border border-transparent hover:border-slate-200 transition-all">
                                                    <Edit size={18} />
                                                </button>
                                                <button 
                                                    onClick={() => router.delete(route("banners.destroy", banner.id))}
                                                    className="p-2 text-slate-400 hover:text-red-500 rounded-lg border border-transparent hover:border-slate-200 transition-all"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* --- MODAL --- */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={closeModal} />
                    <div className="relative bg-white rounded-[2rem] w-full max-w-5xl overflow-hidden shadow-2xl">
                        <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                            <h3 className="text-lg font-bold text-slate-900">{editMode ? "Update Banner" : "Create New Banner"}</h3>
                            <button onClick={closeModal} className="p-2 hover:bg-white rounded-full text-slate-400 transition-all">
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={submit} className="p-8 grid grid-cols-1 md:grid-cols-12 gap-8 max-h-[85vh] overflow-y-auto">
                            {/* LEFT: Assets */}
                            <div className="md:col-span-5 space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Banner Image</label>
                                    <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-slate-100 border-2 border-dashed border-slate-200 group hover:border-indigo-400 transition-all">
                                        {previewUrl ? (
                                            <img src={previewUrl} className="w-full h-full object-cover" alt="Preview" />
                                        ) : (
                                            <div className="flex flex-col items-center justify-center h-full text-slate-400">
                                                <ImageIcon size={40} strokeWidth={1.5} />
                                                <span className="text-[10px] mt-2 font-bold uppercase">No Image Selected</span>
                                            </div>
                                        )}
                                        <label className="absolute inset-0 bg-indigo-900/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center cursor-pointer transition-all duration-300">
                                            <Upload className="text-white mb-2" size={24} />
                                            <input type="file" className="hidden" onChange={handleImageChange} accept="image/*" />
                                        </label>
                                    </div>
                                    {errors.image && <p className="text-red-500 text-[10px] font-bold">{errors.image}</p>}
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Description</label>
                                    <textarea 
                                        rows="3"
                                        value={data.description}
                                        onChange={e => setData('description', e.target.value)}
                                        className="w-full px-4 py-3 bg-slate-50 border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all"
                                        placeholder="Add more details about this banner..."
                                    />
                                </div>
                            </div>

                            {/* RIGHT: Fields */}
                            <div className="md:col-span-7 space-y-5">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="col-span-2 space-y-1.5">
                                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Title</label>
                                        <div className="relative">
                                            <Type size={16} className="absolute left-4 top-3.5 text-slate-400" />
                                            <input type="text" value={data.title} onChange={e => setData("title", e.target.value)} className="w-full pl-11 pr-4 py-3 bg-slate-50 border-slate-200 rounded-xl text-sm" placeholder="e.g. Organic Season" />
                                        </div>
                                        {errors.title && <p className="text-red-500 text-[10px] font-bold">{errors.title}</p>}
                                    </div>

                                    {/* MANDATORY TAG FIELD */}
                                    <div className="col-span-2 space-y-1.5">
                                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-1">
                                            Highlight Tag <span className="text-red-500">*</span>
                                        </label>
                                        <div className="relative">
                                            <Tag size={16} className="absolute left-4 top-3.5 text-slate-400" />
                                            <input 
                                                type="text" 
                                                required
                                                value={data.tag} 
                                                onChange={e => setData("tag", e.target.value)} 
                                                className={`w-full pl-11 pr-4 py-3 bg-slate-50 border-slate-200 rounded-xl text-sm ${errors.tag ? 'border-red-400' : ''}`} 
                                                placeholder="e.g. FLASH SALE / HOT / NEW" 
                                            />
                                        </div>
                                        {errors.tag && <p className="text-red-500 text-[10px] font-bold">{errors.tag}</p>}
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Subtitle</label>
                                        <input type="text" value={data.subtitle} onChange={e => setData("subtitle", e.target.value)} className="w-full px-4 py-3 bg-slate-50 border-slate-200 rounded-xl text-sm" placeholder="Optional" />
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Order</label>
                                        <div className="relative">
                                            <Hash size={16} className="absolute left-4 top-3.5 text-slate-400" />
                                            <input type="number" value={data.order} onChange={e => setData("order", e.target.value)} className="w-full pl-11 pr-4 py-3 bg-slate-50 border-slate-200 rounded-xl text-sm" />
                                        </div>
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Category</label>
                                        <div className="relative">
                                            <LayoutGrid size={16} className="absolute left-4 top-3.5 text-slate-400" />
                                            <select value={data.category_name} onChange={e => setData("category_name", e.target.value)} className="w-full pl-11 pr-4 py-3 bg-slate-50 border-slate-200 rounded-xl text-sm outline-none">
                                                <option value="All">All Categories</option>
                                                {categories.map(cat => <option key={cat.id} value={cat.name}>{cat.name}</option>)}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Button Text</label>
                                        <input type="text" value={data.button_text} onChange={e => setData("button_text", e.target.value)} className="w-full px-4 py-3 bg-slate-50 border-slate-200 rounded-xl text-sm" />
                                    </div>
                                </div>

                                <div className="pt-4">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-slate-900 text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-indigo-600 active:scale-[0.98] transition-all shadow-xl disabled:opacity-50"
                                    >
                                        <Save size={16} />
                                        {processing ? "Processing..." : (editMode ? "Update Changes" : "Create Banner")}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}