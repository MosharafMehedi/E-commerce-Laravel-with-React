import { Link, usePage } from '@inertiajs/react';
import Dropdown from '@/Components/Dropdown';
import ApplicationLogo from '@/Components/ApplicationLogo';
import NavLink from '@/Components/NavLink';

export default function Header() {
    const user = usePage().props.auth.user;

    return (
        <header className="bg-white border-b border-gray-100">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex h-16 justify-between items-center">
                {/* Logo */}
                <div className="flex items-center">
                    <Link href="/">
                        <ApplicationLogo className="h-9 w-auto fill-current text-gray-800" />
                    </Link>
                    <div className="hidden sm:ml-10 sm:flex space-x-8">
                        <NavLink href={route('dashboard')} active={route().current('dashboard')}>
                            Dashboard
                        </NavLink>
                    </div>
                </div>

                {/* User Dropdown */}
                <div className="hidden sm:flex sm:items-center">
                    <Dropdown>
                        <Dropdown.Trigger>
                            <button className="inline-flex items-center rounded-md border border-transparent bg-white px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-700">
                                {user.name}
                                <svg className="ml-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                                </svg>
                            </button>
                        </Dropdown.Trigger>
                        <Dropdown.Content>
                            <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>
                            <Dropdown.Link href={route('logout')} method="post" as="button">Log Out</Dropdown.Link>
                        </Dropdown.Content>
                    </Dropdown>
                </div>
            </div>
        </header>
    );
}
