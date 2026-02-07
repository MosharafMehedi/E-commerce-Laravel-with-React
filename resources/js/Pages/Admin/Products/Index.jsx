import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router } from '@inertiajs/react';
import { Plus, Trash2, Edit2, X, ImageIcon, UploadCloud } from 'lucide-react';

export default function Index({ auth, products, categories }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editData, setEditData] = useState(null);

    const { data, setData, post, reset, processing, errors } = useForm({
        name: '',
        category_id: '',
        price: '',
        description: '',
        image: null,
    });

    const submit = (e) => {
        e.preventDefault();
        
        if (editData) {
            // Laravel-e file update korar jonno POST use kore _method PUT pathate hoy
            router.post(route('products.update', editData.id), {
                ...data,
                _method: 'PUT',
            }, {
                onSuccess: () => closeModal(),
            });
        } else {
            post(route('products.store'), {
                onSuccess: () => closeModal(),
            });
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditData(null);
        reset();
    };

    const openEditModal = (product) => {
        setEditData(product);
        setData({
            name: product.name,
            category_id: product.category_id,
            price: product.price,
            description: product.description,
            image: null, 
        });
        setIsModalOpen(true);
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Product Management" />
            <div className="p-8 max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-2xl font-bold text-gray-800 uppercase tracking-tight">Inventory</h1>
                    <button 
                        onClick={() => { reset(); setIsModalOpen(true); }}
                        className="bg-blue-600 text-white px-5 py-2.5 rounded-lg flex items-center gap-2 text-sm font-semibold hover:bg-blue-700 transition-all"
                    >
                        <Plus size={18} /> Add Product
                    </button>
                </div>

                {/* Product List */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {products.map(product => (
                        <div key={product.id} className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all group">
                            <div className="relative h-48 w-full bg-gray-50 rounded-xl mb-4 overflow-hidden">
                                {product.image ? (
                                    <img src={`/storage/${product.image}`} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-300"><ImageIcon size={40}/></div>
                                )}
                                <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button onClick={() => openEditModal(product)} className="bg-white p-2 rounded-full shadow-sm text-gray-600 hover:text-blue-600"><Edit2 size={14}/></button>
                                    <button onClick={() => router.delete(route('products.destroy', product.id))} className="bg-white p-2 rounded-full shadow-sm text-gray-600 hover:text-red-600"><Trash2 size={14}/></button>
                                </div>
                            </div>
                            <span className="text-[10px] font-bold text-blue-500 uppercase">{product.category?.name}</span>
                            <h3 className="font-bold text-gray-800 truncate">{product.name}</h3>
                            <p className="text-lg font-bold mt-1 text-gray-900">৳{product.price}</p>
                        </div>
                    ))}
                </div>

                {/* --- MODAL --- */}
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                        <div className="bg-white rounded-2xl p-8 w-full max-w-lg shadow-xl">
                            <div className="flex justify-between mb-6">
                                <h2 className="text-xl font-bold">{editData ? 'Edit Product' : 'Add New Product'}</h2>
                                <button onClick={closeModal}><X size={20}/></button>
                            </div>

                            <form onSubmit={submit} className="space-y-4">
                                <input type="text" placeholder="Product Name" value={data.name} className="w-full border-gray-200 rounded-lg p-3 text-sm focus:ring-blue-500" onChange={e => setData('name', e.target.value)} />
                                
                                <select value={data.category_id} className="w-full border-gray-200 rounded-lg p-3 text-sm focus:ring-blue-500" onChange={e => setData('category_id', e.target.value)}>
                                    <option value="">Select Category</option>
                                    {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                                </select>

                                <input type="number" placeholder="Price (৳)" value={data.price} className="w-full border-gray-200 rounded-lg p-3 text-sm focus:ring-blue-500" onChange={e => setData('price', e.target.value)} />

                                {/* IMAGE INPUT */}
                                <div className="border-2 border-dashed border-gray-100 rounded-lg p-4 text-center">
                                    <label className="cursor-pointer">
                                        <UploadCloud className="mx-auto text-gray-400 mb-2" size={24} />
                                        <span className="text-xs text-gray-500">{data.image ? data.image.name : 'Click to upload image'}</span>
                                        <input type="file" className="hidden" onChange={e => setData('image', e.target.files[0])} />
                                    </label>
                                </div>

                                <textarea placeholder="Description" value={data.description} className="w-full border-gray-200 rounded-lg p-3 text-sm h-24 focus:ring-blue-500" onChange={e => setData('description', e.target.value)} />

                                <button 
                                    disabled={processing}
                                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold text-sm hover:bg-blue-700 disabled:bg-gray-400 transition-all"
                                >
                                    {processing ? 'Saving...' : 'Save Product'}
                                </button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}