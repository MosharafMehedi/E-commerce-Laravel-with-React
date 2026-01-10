import NavLink from '@/Components/NavLink';
import { FaHome, FaUser, FaCog, FaBars, FaTimes } from 'react-icons/fa';

export default function Sidebar({ collapsed, setCollapsed, onNavigate }) {
    return (
        <div className="h-full flex flex-col bg-white border-r border-gray-200">

            {/* Mobile Header */}
            <div className="flex md:hidden items-center justify-between px-4 h-16 border-b">
                <span className="font-bold text-lg text-blue-600">
                    M SHOPPING
                </span>

                <button
                    onClick={onNavigate}
                    className="text-gray-600 text-xl"
                >
                    <FaTimes />
                </button>
            </div>

            {/* Desktop Collapse Button */}
            <div className="hidden md:flex justify-end p-4">
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="text-gray-600 hover:text-blue-600"
                >
                    <FaBars />
                </button>
            </div>

            {/* Menu */}
            <nav className="flex flex-col space-y-1 px-2 mt-2">

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

/* Nav Item */
function NavItem({ href, icon, label, collapsed, active, onNavigate }) {
    return (
        <NavLink
            href={href}
            active={active}
            onClick={onNavigate}
            className={`
                flex items-center gap-3 px-3 py-3 rounded-lg
                hover:bg-gray-100 transition
                ${active ? 'bg-blue-50 text-blue-600 font-medium' : ''}
            `}
        >
            <span className="text-lg">{icon}</span>
            {!collapsed && <span>{label}</span>}
        </NavLink>
    );
}
