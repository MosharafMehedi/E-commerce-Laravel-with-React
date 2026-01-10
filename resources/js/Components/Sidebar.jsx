import { useState } from 'react';
import NavLink from '@/Components/NavLink';
import { FaHome, FaUser, FaCog, FaBars } from 'react-icons/fa';

export default function Sidebar() {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <aside
            className={`hidden sm:flex flex-col bg-white border-r border-gray-200 transition-all duration-300
                ${collapsed ? 'w-20' : 'w-64'}
            `}
        >
            {/* Toggle Button */}
            <div className="flex justify-end p-4">
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="text-gray-600 hover:text-blue-600"
                >
                    <FaBars />
                </button>
            </div>

            {/* Menu */}
            <nav className="flex flex-col space-y-2">

                {/* Dashboard */}
                <NavLink
                    href={route('dashboard')}
                    active={route().current('dashboard')}
                    className="flex items-center gap-3 px-3 py-2 rounded-md transition"
                >
                    <FaHome
                        className={`text-lg transition
                            ${route().current('dashboard')}
                        `}
                    />
                    {!collapsed && <span>Dashboard</span>}
                </NavLink>

                {/* Profile */}
                <NavLink
                    href={route('profile.edit')}
                    active={route().current('profile.edit')}
                    className="flex items-center gap-3 px-3 py-2 rounded-md transition"
                >
                    <FaUser
                        className={`text-lg transition
                            ${route().current('profile.edit')}
                        `}
                    />
                    {!collapsed && <span>Profile</span>}
                </NavLink>

                {/* Test */}
                <NavLink
                    href="#"
                    className="flex items-center gap-3 px-3 py-2 rounded-md transition"
                >
                    <FaCog
                        className={`text-lg transition ${!collapsed}`}
                    />
                    {!collapsed && <span>Test</span>}
                </NavLink>

            </nav>
        </aside>
    );
}
