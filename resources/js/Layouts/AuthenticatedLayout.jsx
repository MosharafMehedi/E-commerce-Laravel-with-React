import { useState } from "react";
import Header from "@/Components/Header";
import Sidebar from "@/Components/Sidebar";
import Footer from "@/Components/Footer";

export default function AuthenticatedLayout({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [collapsed, setCollapsed] = useState(false);

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">

            {/* Fixed Header */}
            <div className="fixed top-0 left-0 right-0 z-50">
                <Header onMenuClick={() => setSidebarOpen(true)} />
            </div>

            {/* Page Body */}
            <div className="flex flex-1 pt-16">

                {/* Sidebar */}
                <aside
                    className={`
                        fixed top-16 left-0 bottom-0 z-40 bg-white shadow-lg
                        transition-transform duration-300
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

                {/* Mobile Overlay */}
                {sidebarOpen && (
                    <div
                        className="fixed inset-0 bg-black/40 z-30 md:hidden"
                        onClick={() => setSidebarOpen(false)}
                    />
                )}

                {/* Main Content + Footer */}
                <main
                    className={`
                        flex-1 flex flex-col
                        ${collapsed ? "md:ml-20" : "md:ml-64"}
                        p-4 sm:p-6
                    `}
                >
                    {/* Page Content */}
                    <div className="flex-1">
                        {children}
                    </div>

                    {/* Footer (same width as main) */}
                    <Footer />
                </main>

            </div>
        </div>
    );
}
