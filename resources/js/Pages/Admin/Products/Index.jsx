import React, { useState, useMemo } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, router } from "@inertiajs/react";
import {
    Plus,
    Trash2,
    Edit2,
    Search,
    ChevronLeft,
    ChevronRight,
    Layers,
    Star,
    ImageIcon,
    X,
    Tag as TagIcon,
    ListFilter,
} from "lucide-react";

export default function ProductIndex({ auth, products = [], categories = [] }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [sortConfig, setSortConfig] = useState({
        key: "id",
        direction: "desc",
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editData, setEditData] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    const itemsPerPage = 8;

    const { data, setData, post, reset, processing, errors } = useForm({
        name: "",
        category_id: "",
        price: "",
        quantity: "",
        desc: "",
        tag: "",
        rating: 5,
        img: null,
    });

    // Filtering & Sorting
    const processedData = useMemo(() => {
        let filtered = products.filter(
            (p) =>
                p.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                p.tag?.toLowerCase().includes(searchTerm.toLowerCase()),
        );
        if (sortConfig.key) {
            filtered.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key])
                    return sortConfig.direction === "asc" ? -1 : 1;
                if (a[sortConfig.key] > b[sortConfig.key])
                    return sortConfig.direction === "asc" ? 1 : -1;
                return 0;
            });
        }
        return filtered;
    }, [products, searchTerm, sortConfig]);

    const totalPages = Math.ceil(processedData.length / itemsPerPage);
    const paginatedItems = processedData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage,
    );

    // Live Image Preview Logic
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData("img", file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const openEdit = (product) => {
        setEditData(product);
        setData({
            name: product.name || "",
            category_id: product.category_id || "",
            price: product.price || "",
            quantity: product.quantity || "",
            desc: product.desc || "",
            tag: product.tag || "",
            rating: product.rating || 5,
            img: null, // Initial null to avoid overriding with path string
        });
        setImagePreview(product.img ? `/storage/${product.img}` : null);
        setIsModalOpen(true);
    };

    const submit = (e) => {
        e.preventDefault();
        const options = {
            onSuccess: () => {
                setIsModalOpen(false);
                reset();
                setEditData(null);
                setImagePreview(null);
            },
            forceFormData: true,
        };

        if (editData) {
            // Method Spoofing for Multipart/Form-Data in PUT
            router.post(
                route("products.update", editData.id),
                {
                    ...data,
                    _method: "PUT",
                },
                options,
            );
        } else {
            post(route("products.store"), options);
        }
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Inventory Master" />

            <div className="min-h-screen bg-[#f8fafc] pb-12">
                {/* --- HEADER --- */}
                <div className="bg-white border-b border-slate-200">
                    <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-2xl font-bold text-slate-900 tracking-tight italic">
                                Inventory Master
                            </h1>
                            <p className="text-sm text-slate-500 font-medium">
                                Manage your {products.length} organic products.
                            </p>
                        </div>
                        <button
                            onClick={() => {
                                reset();
                                setEditData(null);
                                setImagePreview(null);
                                setIsModalOpen(true);
                            }}
                            className="px-5 py-2.5 bg-indigo-600 text-white rounded-lg text-sm font-bold hover:bg-indigo-700 transition-all flex items-center gap-2 shadow-lg shadow-indigo-100"
                        >
                            <Plus size={18} strokeWidth={3} /> Add Product
                        </button>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-6 mt-8">
                    {/* --- SEARCH --- */}
                    <div className="flex items-center gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm mb-8">
                        <div className="relative flex-1">
                            <Search
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                                size={18}
                            />
                            <input
                                type="text"
                                placeholder="Search by name or tag..."
                                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500/20 outline-none"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* --- TABLE --- */}
                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-slate-50/50 border-b">
                                    <tr>
                                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase w-20">
                                            ID
                                        </th>
                                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">
                                            Image
                                        </th>
                                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">
                                            Name
                                        </th>
                                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">
                                            Category
                                        </th>
                                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase text-center">
                                            Price
                                        </th>
                                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase text-center">
                                            Stock
                                        </th>
                                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase text-center">
                                            Tag & Rating
                                        </th>
                                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">
                                            Details
                                        </th>
                                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase text-right">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {paginatedItems.map((product) => (
                                        <tr
                                            key={product.id}
                                            className="hover:bg-slate-50/30 transition-all"
                                        >
                                            {/* ID */}
                                            <td className="px-6 py-4 text-sm text-slate-400">
                                                #{product.id}
                                            </td>

                                            {/* Image */}
                                            <td className="px-6 py-4">
                                                <div className="w-12 h-12 rounded-lg bg-slate-100 border overflow-hidden flex items-center justify-center">
                                                    {product.img ? (
                                                        <img
                                                            src={`/storage/${product.img}`}
                                                            className="w-full h-full object-cover"
                                                            alt={product.name}
                                                        />
                                                    ) : (
                                                        <ImageIcon
                                                            className="text-slate-300"
                                                            size={20}
                                                        />
                                                    )}
                                                </div>
                                            </td>

                                            {/* Name */}
                                            <td className="px-6 py-4">
                                                <div className="text-sm font-bold text-slate-800">
                                                    {product.name}
                                                </div>
                                            </td>

                                            {/* Category */}
                                            <td className="px-6 py-4">
                                                <span className="px-2 py-0.5 bg-indigo-50 text-indigo-600 text-[10px] font-bold rounded uppercase">
                                                    {product.category?.name}
                                                </span>
                                            </td>

                                            {/* Price */}
                                            <td className="px-6 py-4 text-center font-bold text-slate-700">
                                                ৳{product.price}
                                            </td>

                                            {/* Stock */}
                                            <td className="px-6 py-4 text-center">
                                                <div
                                                    className={`text-sm font-bold ${product.quantity < 10 ? "text-red-500" : "text-slate-600"}`}
                                                >
                                                    {product.quantity}{" "}
                                                    <span className="text-[10px] text-slate-400">
                                                        Units
                                                    </span>
                                                </div>
                                            </td>

                                            {/* Tag & Rating */}
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col items-center gap-1">
                                                    {product.tag && (
                                                        <span className="px-2 py-0.5 bg-slate-100 text-slate-500 text-[10px] font-bold rounded uppercase">
                                                            {product.tag}
                                                        </span>
                                                    )}
                                                    <div className="flex items-center gap-0.5">
                                                        {[...Array(5)].map(
                                                            (_, i) => (
                                                                <Star
                                                                    key={i}
                                                                    size={10}
                                                                    className={
                                                                        i <
                                                                        product.rating
                                                                            ? "fill-orange-400 text-orange-400"
                                                                            : "text-slate-200"
                                                                    }
                                                                />
                                                            ),
                                                        )}
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Details */}
                                            <td className="px-6 py-4">
                                                <p className="text-[11px] text-slate-400 line-clamp-1 italic max-w-[150px]">
                                                    {product.desc}
                                                </p>
                                            </td>

                                            {/* Action */}
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex justify-end gap-2">
                                                    <button
                                                        onClick={() =>
                                                            openEdit(product)
                                                        }
                                                        className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg"
                                                    >
                                                        <Edit2 size={16} />
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            confirm(
                                                                "Delete product?",
                                                            ) &&
                                                            router.delete(
                                                                route(
                                                                    "products.destroy",
                                                                    product.id,
                                                                ),
                                                            )
                                                        }
                                                        className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        <div className="px-6 py-4 bg-slate-50/50 border-t flex justify-between items-center">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                Page {currentPage} of {totalPages || 1}
                            </span>
                            <div className="flex gap-2">
                                <button
                                    disabled={currentPage === 1}
                                    onClick={() => setCurrentPage((p) => p - 1)}
                                    className="p-2 border rounded-lg bg-white disabled:opacity-30"
                                >
                                    <ChevronLeft size={18} />
                                </button>
                                <button
                                    disabled={currentPage >= totalPages}
                                    onClick={() => setCurrentPage((p) => p + 1)}
                                    className="p-2 border rounded-lg bg-white disabled:opacity-30"
                                >
                                    <ChevronRight size={18} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- MODAL --- */}
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
                        <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl animate-in zoom-in duration-200 overflow-hidden">
                            <div className="px-8 py-5 border-b flex justify-between items-center bg-slate-50/50">
                                <h2 className="text-lg font-bold text-slate-800">
                                    {editData
                                        ? "Update Product"
                                        : "New Product"}
                                </h2>
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="text-slate-400 hover:text-slate-600"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <form
                                onSubmit={submit}
                                className="p-8 grid grid-cols-2 gap-5 max-h-[75vh] overflow-y-auto"
                            >
                                <div className="col-span-2">
                                    <label className="text-[10px] font-bold uppercase text-slate-400 mb-1 block">
                                        Product Name
                                    </label>
                                    <input
                                        type="text"
                                        value={data.name}
                                        className="w-full border rounded-xl p-3 text-sm focus:ring-2 focus:ring-indigo-500/10 outline-none"
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="text-[10px] font-bold uppercase text-slate-400 mb-1 block">
                                        Category
                                    </label>
                                    <select
                                        value={data.category_id}
                                        className="w-full border rounded-xl p-3 text-sm outline-none"
                                        onChange={(e) =>
                                            setData(
                                                "category_id",
                                                e.target.value,
                                            )
                                        }
                                        required
                                    >
                                        <option value="">
                                            Select Category
                                        </option>
                                        {categories.map((c) => (
                                            <option key={c.id} value={c.id}>
                                                {c.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="text-[10px] font-bold uppercase text-slate-400 mb-1 block">
                                        Rating (1-5)
                                    </label>
                                    <input
                                        type="number"
                                        min="1"
                                        max="5"
                                        value={data.rating}
                                        className="w-full border rounded-xl p-3 text-sm outline-none"
                                        onChange={(e) =>
                                            setData("rating", e.target.value)
                                        }
                                    />
                                </div>

                                <div>
                                    <label className="text-[10px] font-bold uppercase text-slate-400 mb-1 block">
                                        Price (৳)
                                    </label>
                                    <input
                                        type="number"
                                        value={data.price}
                                        className="w-full border rounded-xl p-3 text-sm outline-none font-bold"
                                        onChange={(e) =>
                                            setData("price", e.target.value)
                                        }
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="text-[10px] font-bold uppercase text-slate-400 mb-1 block">
                                        Initial Stock
                                    </label>
                                    <input
                                        type="number"
                                        value={data.quantity}
                                        className="w-full border rounded-xl p-3 text-sm outline-none"
                                        onChange={(e) =>
                                            setData("quantity", e.target.value)
                                        }
                                        required
                                    />
                                </div>

                                <div className="col-span-1">
                                    <label className="text-[10px] font-bold uppercase text-slate-400 mb-1 block">
                                        Tag
                                    </label>
                                    <input
                                        type="text"
                                        value={data.tag}
                                        className="w-full border rounded-xl p-3 text-sm outline-none"
                                        onChange={(e) =>
                                            setData("tag", e.target.value)
                                        }
                                        placeholder="e.g. Fresh"
                                    />
                                </div>

                                <div className="col-span-2">
                                    <label className="text-[10px] font-bold uppercase text-slate-400 mb-1 block">
                                        Description
                                    </label>
                                    <textarea
                                        rows="2"
                                        value={data.desc}
                                        className="w-full border rounded-xl p-3 text-sm outline-none resize-none"
                                        onChange={(e) =>
                                            setData("desc", e.target.value)
                                        }
                                    ></textarea>
                                </div>

                                {/* Image Preview Section */}
                                <div className="col-span-2 flex items-center gap-6 p-4 bg-slate-50 rounded-xl border-2 border-dashed border-slate-200">
                                    <div className="w-20 h-20 rounded-lg bg-white border overflow-hidden flex items-center justify-center flex-shrink-0 shadow-sm">
                                        {imagePreview ? (
                                            <img
                                                src={imagePreview}
                                                className="w-full h-full object-cover"
                                                alt="Preview"
                                            />
                                        ) : (
                                            <ImageIcon
                                                className="text-slate-300"
                                                size={28}
                                            />
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <label className="text-[10px] font-bold uppercase text-slate-400 mb-1.5 block tracking-widest">
                                            Product Photo
                                        </label>
                                        <input
                                            type="file"
                                            onChange={handleImageChange}
                                            className="text-xs file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-indigo-50 file:text-indigo-600 file:font-bold cursor-pointer"
                                        />
                                        <p className="text-[10px] text-slate-400 mt-2 italic">
                                            Jodi photo change na koren, ager tai
                                            thakbe.
                                        </p>
                                    </div>
                                </div>

                                <div className="col-span-2 pt-2">
                                    <button
                                        disabled={processing}
                                        className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold text-sm hover:bg-indigo-700 shadow-xl shadow-indigo-100 transition-all"
                                    >
                                        {processing
                                            ? "Saving..."
                                            : editData
                                              ? "Update Product"
                                              : "Create Product"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
