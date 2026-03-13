import NavLink from '@/Components/NavLink';
import { useState } from 'react'; // Tambahkan useState
import { 
    FaHome, FaUser, FaCog, FaBars, FaTimes, 
    FaLayerGroup, FaBoxes, FaImages, FaChevronDown, FaDatabase 
} from 'react-icons/fa';

export default function Sidebar({ collapsed, setCollapsed, onNavigate }) {
    // State untuk mengontrol dropdown Management
    const [isManagementOpen, setIsManagementOpen] = useState(true);

    return (
        <div className="flex flex-col h-full">
            {/* Mobile Header */}
            <div className="flex md:hidden items-center justify-between px-4 h-16 border-b shrink-0">
                <span className="font-bold text-lg text-blue-600">M SHOPPING</span>
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

                {/* --- Parent Menu: Management --- */}
                <div className="py-2">
                    {!collapsed && (
                        <button 
                            onClick={() => setIsManagementOpen(!isManagementOpen)}
                            className="flex items-center justify-between w-full px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider hover:text-blue-600"
                        >
                            <span>Management</span>
                            <FaChevronDown className={`transition-transform duration-200 ${isManagementOpen ? '' : '-rotate-90'}`} />
                        </button>
                    )}
                    
                    {/* Sub-items Container */}
                    <div className={`${!collapsed && !isManagementOpen ? 'hidden' : 'block'} space-y-1 mt-1`}>
                        <NavItem
                            href={route('banners.index')}
                            active={route().current('banners.*')}
                            icon={<FaImages />}
                            label="Manage Banners"
                            collapsed={collapsed}
                            onNavigate={onNavigate}
                            isSubItem={!collapsed}
                        />

                        <NavItem
                            href={route('categories.index')}
                            active={route().current('categories.*')}
                            icon={<FaLayerGroup />}
                            label="Categories"
                            collapsed={collapsed}
                            onNavigate={onNavigate}
                            isSubItem={!collapsed}
                        />

                        <NavItem
                            href={route('products.index')}
                            active={route().current('products.*')}
                            icon={<FaBoxes />}
                            label="Products"
                            collapsed={collapsed}
                            onNavigate={onNavigate}
                            isSubItem={!collapsed}
                        />
                    </div>
                </div>

                <div className="border-t my-2 border-gray-100"></div>

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

function NavItem({ href, icon, label, collapsed, active, onNavigate, isSubItem }) {
    return (
        <NavLink
            href={href}
            active={active}
            onClick={onNavigate}
            className={`
                flex items-center gap-3 px-3 py-3 rounded-lg
                transition hover:bg-gray-100
                ${active ? 'bg-blue-50 text-blue-600 font-medium border-r-4 border-blue-600' : 'text-gray-600'}
                ${isSubItem ? 'ml-4' : ''} 
            `}
        >
            <span className="text-lg shrink-0">{icon}</span>
            {!collapsed && <span className="text-sm">{label}</span>}
        </NavLink>
    );
}