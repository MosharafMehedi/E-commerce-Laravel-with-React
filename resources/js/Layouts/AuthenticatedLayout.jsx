import { useState } from "react";
import { usePage } from "@inertiajs/react";

import Header from "@/Components/Header";
import Sidebar from "@/Components/Sidebar";
import Footer from "@/Components/Footer";

export default function AuthenticatedLayout({ children }) {
    const user = usePage().props.auth.user;

    const [sidebarOpen, setSidebarOpen] = useState(false); // mobile
    const [collapsed, setCollapsed] = useState(false); // desktop

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            {/* Header */}
            <Header onMenuClick={() => setSidebarOpen(true)} />

            <div className="flex flex-1 relative">
                {/* Sidebar */}
                <aside
                    className={`
                        fixed inset-y-0 left-0 z-40 bg-white shadow-lg
                        transform transition-transform duration-300
                        ${collapsed ? "w-20" : "w-64"}
                        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
                        md:relative md:translate-x-0
                    `}
                >
                    <Sidebar
                        collapsed={collapsed}
                        setCollapsed={setCollapsed}
                        onNavigate={() => setSidebarOpen(false)}
                    />
                </aside>

                {/* Overlay (mobile) */}
                {sidebarOpen && (
                    <div
                        className="fixed inset-0 bg-black/40 z-30 md:hidden"
                        onClick={() => setSidebarOpen(false)}
                    />
                )}

                {/* Content */}
                <main
                    className={`
        flex-1 p-4 sm:p-6 transition-all
        ${collapsed ? "md:ml-20" : "md:ml-64"}
    `}
                >
                    {children}
                </main>
            </div>

            <Footer />
        </div>
    );
}
