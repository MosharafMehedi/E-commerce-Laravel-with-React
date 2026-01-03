import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard() {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-2xl font-bold tracking-tight text-slate-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl px-6 space-y-10">

                    {/* Welcome Card */}
                    <div className="rounded-3xl bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-white shadow-lg">
                        <h3 className="text-2xl font-extrabold">
                            Welcome back 👋
                        </h3>
                        <p className="mt-2 opacity-90">
                            Here’s what’s happening in your store today.
                        </p>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        <StatCard title="Total Sales" value="$24,500" />
                        <StatCard title="Orders" value="1,284" />
                        <StatCard title="Customers" value="892" />
                        <StatCard title="Products" value="320" />
                    </div>

                    {/* Main Content */}
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Recent Orders */}
                        <div className="lg:col-span-2 rounded-3xl bg-white shadow">
                            <div className="border-b px-6 py-4">
                                <h4 className="text-lg font-semibold">
                                    Recent Orders
                                </h4>
                            </div>

                            <div className="p-6 overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead className="text-slate-500">
                                        <tr>
                                            <th className="text-left pb-3">Order ID</th>
                                            <th className="text-left pb-3">Customer</th>
                                            <th className="text-left pb-3">Status</th>
                                            <th className="text-right pb-3">Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y">
                                        <OrderRow id="#1023" name="John Doe" status="Completed" amount="$120" />
                                        <OrderRow id="#1024" name="Sarah Smith" status="Pending" amount="$85" />
                                        <OrderRow id="#1025" name="Alex Brown" status="Completed" amount="$210" />
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Activity */}
                        <div className="rounded-3xl bg-white shadow">
                            <div className="border-b px-6 py-4">
                                <h4 className="text-lg font-semibold">
                                    Recent Activity
                                </h4>
                            </div>

                            <div className="p-6 space-y-4 text-sm text-slate-600">
                                <Activity text="New order placed" />
                                <Activity text="Product stock updated" />
                                <Activity text="New user registered" />
                                <Activity text="Payment received" />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}

/* Components */

function StatCard({ title, value }) {
    return (
        <div className="rounded-2xl bg-white p-6 shadow hover:shadow-lg transition">
            <p className="text-sm text-slate-500">{title}</p>
            <p className="mt-2 text-3xl font-extrabold text-indigo-600">
                {value}
            </p>
        </div>
    );
}

function OrderRow({ id, name, status, amount }) {
    return (
        <tr className="hover:bg-slate-50">
            <td className="py-3">{id}</td>
            <td className="py-3">{name}</td>
            <td className="py-3">
                <span className={`rounded-full px-3 py-1 text-xs font-semibold
                    ${status === 'Completed'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}
                >
                    {status}
                </span>
            </td>
            <td className="py-3 text-right font-semibold">
                {amount}
            </td>
        </tr>
    );
}

function Activity({ text }) {
    return (
        <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-indigo-600" />
            <p>{text}</p>
        </div>
    );
}
