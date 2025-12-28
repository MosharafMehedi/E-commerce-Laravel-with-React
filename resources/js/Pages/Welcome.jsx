import { Head, Link } from '@inertiajs/react';

export default function Dashboard({ auth }) {
    return (
        <>
            <Head title="Admin Dashboard" />

            <div className="flex min-h-screen bg-slate-100">
                {/* Sidebar */}
                <aside className="w-64 bg-slate-900 text-white hidden lg:flex flex-col">
                    <div className="px-6 py-5 text-2xl font-bold text-indigo-400">
                        ShopAdmin
                    </div>

                    <nav className="flex-1 px-4 space-y-2">
                        <SidebarLink label="Dashboard" />
                        <SidebarLink label="Orders" />
                        <SidebarLink label="Products" />
                        <SidebarLink label="Customers" />
                        <SidebarLink label="Reports" />
                        <SidebarLink label="Settings" />
                    </nav>

                    <div className="px-6 py-4 border-t border-slate-700">
                        <Link
                            href={route('logout')}
                            method="post"
                            as="button"
                            className="w-full rounded-lg bg-red-500 py-2 text-sm font-semibold hover:bg-red-600"
                        >
                            Logout
                        </Link>
                    </div>
                </aside>

                {/* Main */}
                <div className="flex-1 flex flex-col">
                    {/* Topbar */}
                    <header className="flex items-center justify-between bg-white px-6 py-4 shadow">
                        <h1 className="text-xl font-bold text-slate-800">
                            Dashboard
                        </h1>

                        <div className="flex items-center gap-4">
                            <span className="text-slate-600 text-sm">
                                {auth?.user?.name}
                            </span>

                            {!auth?.user && (
                                <>
                                    <Link href={route('login')} className="text-sm text-indigo-600">
                                        Login
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="rounded bg-indigo-600 px-4 py-2 text-sm text-white"
                                    >
                                        Register
                                    </Link>
                                </>
                            )}
                        </div>
                    </header>

                    {/* Content */}
                    <main className="p-6 space-y-8">
                        {/* Stats */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            <Stat title="Total Sales" value="$84,230" trend="+12%" />
                            <Stat title="Orders" value="1,482" trend="+8%" />
                            <Stat title="Customers" value="3,290" trend="+5%" />
                            <Stat title="Products" value="540" trend="-2%" negative />
                        </div>

                        {/* Sales Overview */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <div className="lg:col-span-2 rounded-xl bg-white p-6 shadow">
                                <h2 className="font-semibold mb-4">
                                    Sales Overview
                                </h2>

                                <div className="h-64 flex items-center justify-center text-slate-400">
                                    📊 Chart Area (Recharts / Chart.js)
                                </div>
                            </div>

                            <div className="rounded-xl bg-white p-6 shadow">
                                <h2 className="font-semibold mb-4">
                                    Quick Stats
                                </h2>

                                <ul className="space-y-3 text-sm">
                                    <li className="flex justify-between">
                                        <span>Pending Orders</span>
                                        <span className="font-semibold">42</span>
                                    </li>
                                    <li className="flex justify-between">
                                        <span>Completed Orders</span>
                                        <span className="font-semibold">1,320</span>
                                    </li>
                                    <li className="flex justify-between">
                                        <span>Refunds</span>
                                        <span className="font-semibold">18</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Recent Orders */}
                        <div className="rounded-xl bg-white p-6 shadow">
                            <h2 className="mb-4 font-semibold">
                                Recent Orders
                            </h2>

                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="text-left text-slate-500 border-b">
                                        <th className="py-2">Order</th>
                                        <th>Customer</th>
                                        <th>Total</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <Order id="#10231" name="Ayesha Rahman" total="$120" status="Paid" />
                                    <Order id="#10232" name="John Smith" total="$340" status="Pending" />
                                    <Order id="#10233" name="Hasan Ali" total="$89" status="Shipped" />
                                    <Order id="#10233" name="Hasan Ali" total="$89" status="Shipped" />
                                </tbody>
                            </table>
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}

/* Components */

function SidebarLink({ label }) {
    return (
        <a
            href="#"
            className="block rounded-lg px-4 py-2 text-sm text-slate-300 hover:bg-slate-800 hover:text-white"
        >
            {label}
        </a>
    );
}

function Stat({ title, value, trend, negative }) {
    return (
        <div className="rounded-xl bg-white p-6 shadow">
            <p className="text-sm text-slate-500">{title}</p>
            <p className="mt-2 text-2xl font-bold">{value}</p>
            <p
                className={`mt-1 text-sm font-semibold ${
                    negative ? 'text-red-500' : 'text-green-500'
                }`}
            >
                {trend}
            </p>
        </div>
    );
}

function Order({ id, name, total, status }) {
    const badge = {
        Paid: 'bg-green-100 text-green-700',
        Pending: 'bg-yellow-100 text-yellow-700',
        Shipped: 'bg-blue-100 text-blue-700',
    };

    return (
        <tr className="border-b last:border-none">
            <td className="py-3 font-medium">{id}</td>
            <td>{name}</td>
            <td>{total}</td>
            <td>
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${badge[status]}`}>
                    {status}
                </span>
            </td>
        </tr>
    );
}
