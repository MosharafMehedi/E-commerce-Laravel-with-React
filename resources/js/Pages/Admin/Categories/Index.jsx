import React, { useState, useMemo } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, router } from "@inertiajs/react";
import {
    Plus,
    Trash2,
    Edit2,
    Check,
    X,
    Search,
    ArrowUpDown,
    ChevronLeft,
    ChevronRight,
    Layers,
    Filter,
    Download,
    ListFilter,
} from "lucide-react";

export default function CategoryIndex({ auth, categories = [] }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [sortConfig, setSortConfig] = useState({
        key: "id",
        direction: "desc",
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [editingId, setEditingId] = useState(null);
    const itemsPerPage = 10;

    const {
        data,
        setData,
        post,
        put,
        delete: destroy,
        reset,
        processing,
        errors,
    } = useForm({
        name: "",
    });

    // Filtering, Sorting, & Pagination Logic
    const processedData = useMemo(() => {
        let filtered = categories.filter((c) =>
            c.name?.toLowerCase().includes(searchTerm.toLowerCase()),
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
    }, [categories, searchTerm, sortConfig]);

    const totalPages = Math.ceil(processedData.length / itemsPerPage);
    const paginatedItems = processedData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage,
    );

    const handleSort = (key) => {
        setSortConfig((prev) => ({
            key,
            direction:
                prev.key === key && prev.direction === "asc" ? "desc" : "asc",
        }));
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Categories Management" />

            <div className="min-h-screen bg-[#f8fafc] pb-12">
                {/* --- HEADER --- */}
                <div className="bg-white border-b border-slate-200">
                    <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                                Product Categories
                            </h1>
                            <p className="text-sm text-slate-500 font-medium">
                                Manage and organize your store's product
                                taxonomy.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-6 mt-8">
                    {/* --- TOP ACTIONS: SEARCH & ADD --- */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
                        <div className="lg:col-span-8 flex items-center gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                            <div className="relative flex-1">
                                <Search
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                                    size={18}
                                />
                                <input
                                    type="text"
                                    placeholder="Search for categories..."
                                    className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all"
                                    value={searchTerm}
                                    onChange={(e) => {
                                        setSearchTerm(e.target.value);
                                        setCurrentPage(1);
                                    }}
                                />
                            </div>
                            <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg transition-all">
                                <ListFilter size={20} />
                            </button>
                        </div>

                        <div className="lg:col-span-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    post(route("categories.store"), {
                                        onSuccess: () => reset(),
                                    });
                                }}
                                className="flex gap-2"
                            >
                                <input
                                    type="text"
                                    value={data.name}
                                    placeholder="New Category"
                                    className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500/10 outline-none"
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                    required
                                />
                                <button
                                    disabled={processing}
                                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-bold hover:bg-indigo-700 transition-all flex items-center gap-2"
                                >
                                    <Plus size={16} strokeWidth={3} /> Add
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* --- MAIN DATATABLE --- */}
                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-50/50 border-b border-slate-200">
                                        <th
                                            onClick={() => handleSort("id")}
                                            className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider cursor-pointer hover:text-indigo-600 transition-colors w-24"
                                        >
                                            <div className="flex items-center gap-2">
                                                ID <ArrowUpDown size={14} />
                                            </div>
                                        </th>
                                        <th
                                            onClick={() => handleSort("name")}
                                            className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider cursor-pointer hover:text-indigo-600 transition-colors"
                                        >
                                            <div className="flex items-center gap-2">
                                                Category Name{" "}
                                                <ArrowUpDown size={14} />
                                            </div>
                                        </th>
                                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">
                                            Items Count
                                        </th>
                                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {paginatedItems.map((category) => (
                                        <tr
                                            key={category.id}
                                            className="group hover:bg-slate-50/50 transition-all"
                                        >
                                            <td className="px-6 py-4 text-sm font-mono text-slate-400">
                                                #{category.id}
                                            </td>
                                            <td className="px-6 py-4">
                                                {editingId === category.id ? (
                                                    <div className="flex items-center gap-2">
                                                        <input
                                                            autoFocus
                                                            defaultValue={
                                                                category.name
                                                            }
                                                            className="border-2 border-indigo-500 rounded-lg px-3 py-1 text-sm font-semibold outline-none w-full max-w-xs"
                                                            onChange={(e) =>
                                                                setData(
                                                                    "name",
                                                                    e.target
                                                                        .value,
                                                                )
                                                            }
                                                            onKeyDown={(e) =>
                                                                e.key ===
                                                                    "Enter" &&
                                                                put(
                                                                    route(
                                                                        "categories.update",
                                                                        category.id,
                                                                    ),
                                                                    {
                                                                        onSuccess:
                                                                            () =>
                                                                                setEditingId(
                                                                                    null,
                                                                                ),
                                                                    },
                                                                )
                                                            }
                                                        />
                                                        <button
                                                            onClick={() =>
                                                                put(
                                                                    route(
                                                                        "categories.update",
                                                                        category.id,
                                                                    ),
                                                                    {
                                                                        onSuccess:
                                                                            () =>
                                                                                setEditingId(
                                                                                    null,
                                                                                ),
                                                                    },
                                                                )
                                                            }
                                                            className="text-indigo-600 p-1"
                                                        >
                                                            <Check size={20} />
                                                        </button>
                                                        <button
                                                            onClick={() =>
                                                                setEditingId(
                                                                    null,
                                                                )
                                                            }
                                                            className="text-slate-400 p-1"
                                                        >
                                                            <X size={20} />
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded bg-indigo-50 flex items-center justify-center text-indigo-600">
                                                            <Layers size={16} />
                                                        </div>
                                                        <span className="text-sm font-bold text-slate-700">
                                                            {category.name}
                                                        </span>
                                                    </div>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <span className="px-3 py-1 bg-slate-100 rounded-full text-[11px] font-bold text-slate-600 uppercase">
                                                    {category.products_count ||
                                                        0}{" "}
                                                    Products
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex justify-end gap-2">
                                                    <button
                                                        onClick={() => {
                                                            setEditingId(
                                                                category.id,
                                                            );
                                                            setData(
                                                                "name",
                                                                category.name,
                                                            );
                                                        }}
                                                        className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
                                                    >
                                                        <Edit2 size={16} />
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            confirm(
                                                                "Are you sure?",
                                                            ) &&
                                                            router.delete(
                                                                route(
                                                                    "categories.destroy",
                                                                    category.id,
                                                                ),
                                                            )
                                                        }
                                                        className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
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

                        {/* --- PAGINATION FOOTER --- */}
                        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
                            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                                Showing {paginatedItems.length} of{" "}
                                {processedData.length} categories
                            </p>
                            <div className="flex items-center gap-2">
                                <button
                                    disabled={currentPage === 1}
                                    onClick={() =>
                                        setCurrentPage((prev) => prev - 1)
                                    }
                                    className="p-2 border border-slate-200 rounded-lg bg-white disabled:opacity-30 hover:bg-slate-50 text-slate-600"
                                >
                                    <ChevronLeft size={18} />
                                </button>
                                <div className="text-xs font-bold text-slate-700 px-4">
                                    {currentPage} / {totalPages || 1}
                                </div>
                                <button
                                    disabled={
                                        currentPage >= totalPages ||
                                        totalPages === 0
                                    }
                                    onClick={() =>
                                        setCurrentPage((prev) => prev + 1)
                                    }
                                    className="p-2 border border-slate-200 rounded-lg bg-white disabled:opacity-30 hover:bg-slate-50 text-slate-600"
                                >
                                    <ChevronRight size={18} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
