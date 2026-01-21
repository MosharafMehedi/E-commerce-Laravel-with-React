import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard() {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-4">
                <div className="w-full px-6 sm:px-6 lg:px-8 space-y-6">

                    {/* Welcome Section */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h3 className="text-xl font-bold text-gray-800">
                                Welcome back 👋
                            </h3>
                            <p className="text-gray-600 mt-1">
                                Here's what's happening in your store today.
                            </p>
                        </div>
                        <button className="mt-4 sm:mt-0 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm">
                            Add Product
                        </button>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        <StatCard title="Total Orders" value="1,245" trend="+12%" />
                        <StatCard title="Total Products" value="320" trend="+5%" />
                        <StatCard title="Customers" value="860" trend="+18%" />
                        <StatCard title="Revenue" value="$12,480" trend="+9%" />
                    </div>

                    {/* Main Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                        {/* Recent Orders */}
                        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-6">
                            <h4 className="text-lg font-semibold text-gray-800 mb-4">
                                Recent Orders
                            </h4>

                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="text-left text-gray-500 border-b">
                                            <th className="py-2">Order ID</th>
                                            <th>Status</th>
                                            <th>Customer</th>
                                            <th>Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <OrderRow id="#1023" status="Paid" customer="John Doe" total="$120" />
                                        <OrderRow id="#1022" status="Pending" customer="Sarah Lee" total="$89" />
                                        <OrderRow id="#1021" status="Shipped" customer="Mark Smith" total="$245" />
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Top Products */}
                        <div className="bg-white rounded-2xl shadow-sm p-6">
                            <h4 className="text-lg font-semibold text-gray-800 mb-4">
                                Top Products
                            </h4>

                            <ul className="space-y-4">
                                <ProductItem name="iPhone 15 Pro" sales="120 sales" />
                                <ProductItem name="AirPods Pro" sales="98 sales" />
                                <ProductItem name="MacBook Air" sales="75 sales" />
                            </ul>
                        </div>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}

/* ================= Components ================= */

function StatCard({ title, value, trend }) {
    return (
        <div className="bg-white rounded-2xl shadow-sm p-6">
            <p className="text-sm text-gray-500">{title}</p>
            <div className="mt-2 flex items-center justify-between">
                <p className="text-2xl font-bold text-gray-800">{value}</p>
                <span className="text-sm font-medium text-green-600">
                    {trend}
                </span>
            </div>
        </div>
    );
}

function OrderRow({ id, status, customer, total }) {
    const statusColor = {
        Paid: 'bg-green-100 text-green-700',
        Pending: 'bg-yellow-100 text-yellow-700',
        Shipped: 'bg-blue-100 text-blue-700',
    };

    return (
        <tr className="border-b last:border-none">
            <td className="py-3 font-medium text-gray-800">{id}</td>
            <td>
                <span className={`px-2 py-1 rounded-full text-xs ${statusColor[status]}`}>
                    {status}
                </span>
            </td>
            <td>{customer}</td>
            <td className="font-semibold">{total}</td>
        </tr>
    );
}

function ProductItem({ name, sales }) {
    return (
        <li className="flex items-center justify-between">
            <span className="font-medium text-gray-700">{name}</span>
            <span className="text-sm text-gray-500">{sales}</span>
        </li>
    );
}
