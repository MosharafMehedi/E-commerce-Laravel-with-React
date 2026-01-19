import NavLink from '@/Components/NavLink';
import { FaHome, FaUser, FaCog, FaBars, FaTimes } from 'react-icons/fa';

export default function Sidebar({ collapsed, setCollapsed, onNavigate }) {
    return (
        <div className="flex flex-col h-full">
            {/* Mobile Header */}
            <div className="flex md:hidden items-center justify-between px-4 h-16 border-b shrink-0">
                <span className="font-bold text-lg text-blue-600">
                    M SHOPPING
                </span>
                <button onClick={onNavigate} className="text-xl">
                    <FaTimes />
                </button>
            </div>

            {/* Desktop Collapse */}
            <div className="hidden md:flex justify-end p-4 shrink-0">
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="text-gray-600 hover:text-blue-600"
                >
                    <FaBars />
                </button>
            </div>

            {/* Menu scrollable */}
            <nav className="flex-1 overflow-y-auto px-2 space-y-1">
                <NavItem
                    href={route('dashboard')}
                    active={route().current('dashboard')}
                    icon={<FaHome />}
                    label="Dashboard"
                    collapsed={collapsed}
                    onNavigate={onNavigate}
                />

                <NavItem
                    href={route('profile.edit')}
                    active={route().current('profile.edit')}
                    icon={<FaUser />}
                    label="Profile"
                    collapsed={collapsed}
                    onNavigate={onNavigate}
                />

                <NavItem
                    href="#"
                    icon={<FaCog />}
                    label="Settings"
                    collapsed={collapsed}
                    onNavigate={onNavigate}
                />
            </nav>
        </div>
    );
}

function NavItem({ href, icon, label, collapsed, active, onNavigate }) {
    return (
        <NavLink
            href={href}
            active={active}
            onClick={onNavigate}
            className={`
                flex items-center gap-3 px-3 py-3 rounded-lg
                transition hover:bg-gray-100
                ${active ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-600'}
            `}
        >
            <span className="text-lg shrink-0">{icon}</span>
            {!collapsed && <span>{label}</span>}
        </NavLink>
    );
}
