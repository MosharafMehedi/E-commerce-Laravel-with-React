import { Link } from '@inertiajs/react';

export default function NavLink({ active = false, className = '', children, ...props }) {
    return (
        <Link
            {...props}
            className={`group flex items-center gap-3 px-3 py-2 rounded-md transition
                ${active
                    ? 'bg-green-50 text-green-500 font-semibold'
                    : 'text-gray-700 hover:bg-gray-100'
                }
                ${className}
            `}
        >
            {children}
        </Link>
    );
}
