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

            <div className="py-6 sm:py-12">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    
                    {/* Welcome Card */}
                    <div className="bg-white shadow-sm rounded-2xl p-6 sm:p-8">
                        <h3 className="text-xl font-bold text-gray-800">
                            Welcome Back 👋
                        </h3>
                        <p className="mt-2 text-gray-600">
                            You're logged in successfully.
                        </p>
                    </div>

                    {/* Stats Section */}
                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        <StatCard title="Orders" value="12" />
                        <StatCard title="Products" value="45" />
                        <StatCard title="Customers" value="18" />
                        <StatCard title="Revenue" value="$1,240" />
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}

/* Components */

function StatCard({ title, value }) {
    return (
        <div className="bg-white rounded-2xl shadow p-6 text-center">
            <p className="text-sm text-gray-500">{title}</p>
            <p className="mt-2 text-2xl font-bold text-gray-800">{value}</p>
        </div>
    );
}
