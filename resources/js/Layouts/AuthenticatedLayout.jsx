import { useState } from 'react';
import { usePage } from '@inertiajs/react';

import Header from '@/Components/Header';
import Sidebar from '@/Components/Sidebar';
import Footer from '@/Components/Footer';

export default function AuthenticatedLayout({ children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    const user = usePage().props.auth.user;

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <Header />

            <div className="flex flex-1">
                <Sidebar />

                <main className="flex-1 p-4">
                    {children}
                </main>
            </div>

            <Footer />
        </div>
    );
}
