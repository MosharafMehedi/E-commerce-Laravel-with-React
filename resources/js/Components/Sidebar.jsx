import { Link } from '@inertiajs/react';
import NavLink from '@/Components/NavLink';

export default function Sidebar() {
    return (
        <aside className="hidden sm:block w-64 bg-white border-r border-gray-200 p-4">
            <nav className="flex flex-col space-y-2">
                <NavLink href={route('dashboard')} active={route().current('dashboard')}>Dashboard</NavLink>
                <NavLink href={route('profile.edit')} active={route().current('profile.edit')}>Profile</NavLink>
                {/* Add more links as needed */}
            </nav>
        </aside>
    );
}
