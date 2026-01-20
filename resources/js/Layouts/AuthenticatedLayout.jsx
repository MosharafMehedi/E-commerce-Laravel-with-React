import { useState } from "react";
import { usePage } from "@inertiajs/react";

import Header from "@/Components/Header";
import Sidebar from "@/Components/Sidebar";
import Footer from "@/Components/Footer";

export default function AuthenticatedLayout({ children }) {
    const user = usePage().props.auth.user;

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [collapsed, setCollapsed] = useState(false);

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">

            {/* Fixed Header */}
            <div className="fixed top-0 left-0 right-0 z-50">
                <Header onMenuClick={() => setSidebarOpen(true)} />
            </div>

            {/* Body with sidebar + main */}
            <div className="flex flex-1 pt-16">
                {/* Sidebar */}
                <aside
                    className={`
                        fixed top-16 left-0 bottom-0 z-40 bg-white shadow-lg
                        transition-all duration-300
                        ${collapsed ? "w-20" : "w-64"}
                        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
                        md:translate-x-0
                        overflow-y-auto
                    `}
                >
                    <Sidebar
                        collapsed={collapsed}
                        setCollapsed={setCollapsed}
                        onNavigate={() => setSidebarOpen(false)}
                    />
                </aside>

                {/* Mobile overlay */}
                {sidebarOpen && (
                    <div
                        className="fixed inset-0 bg-black/40 z-30 md:hidden"
                        onClick={() => setSidebarOpen(false)}
                    />
                )}

                {/* Main content + footer wrapper */}
                <main
                    className={`
                        flex-1 flex flex-col ml-0 md:ml-${collapsed ? "20" : "64"}
                        p-4 sm:p-6
                    `}
                >
                    {/* Content */}
                    <div className="flex-2">
                        {children}
                    </div>

                    {/* Footer */}
                    <Footer />
                </main>
            </div>
        </div>
    );
}
