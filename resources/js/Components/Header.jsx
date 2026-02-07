import { Link, usePage, router } from "@inertiajs/react";
import Dropdown from "@/Components/Dropdown";
import ApplicationLogo from "@/Components/ApplicationLogo";
import { FaUser, FaSignOutAlt, FaSearch } from "react-icons/fa";
import { useState, useEffect } from "react";

export default function Header({ onMenuClick }) {
    const { auth, filters } = usePage().props;
    const user = auth.user;
    
    // URL-e search thakle sheta input-e dekhabe
    const [search, setSearch] = useState(filters?.search || "");

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearch(value);

        // Global Search Logic: Eti Dashboard controller-e hit korbe
        router.get(route('dashboard'), { search: value }, {
            preserveState: true, // Jate page refresh na hoy
            replace: true,       // URL history clean rakhar jonno
            preserveScroll: true // Jate scroll position thik thake
        });
    };

    return (
        <header className="bg-white border-b border-gray-100 h-16 flex items-center fixed top-0 left-0 right-0 z-50 shadow-sm">
            <div className="mx-auto w-full max-w-8xl px-4 sm:px-6 lg:px-8 flex justify-between items-center gap-4">
                
                {/* Logo Section */}
                <div className="flex items-center gap-3 shrink-0">
                    <button className="md:hidden text-2xl text-gray-700" onClick={onMenuClick}> ☰ </button>
                    <Link href={route('dashboard')} className="flex items-center gap-3">
                        <ApplicationLogo className="h-9 w-auto fill-current text-gray-800" />
                        <span className="hidden sm:block text-xl font-extrabold text-sky-500 tracking-tighter">M SHOPPING</span>
                    </Link>
                </div>

                {/* Global Search Bar */}
                <div className="flex-1 max-w-md relative group">
                    <input 
                        type="text" 
                        placeholder="Search products..." 
                        value={search}
                        onChange={handleSearch}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2 pl-10 pr-4 focus:bg-white focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all text-sm outline-none"
                    />
                    <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-sky-500 transition-colors text-sm" />
                </div>

                {/* User Dropdown */}
                <div className="flex items-center gap-2">
                    <Dropdown>
                        <Dropdown.Trigger>
                            <button className="flex items-center gap-2 rounded-lg bg-white px-2 py-2 hover:bg-gray-50 transition duration-200 border border-transparent hover:border-gray-200">
                                <div className="h-8 w-8 rounded-full overflow-hidden border bg-sky-500 flex items-center justify-center text-white font-bold text-xs">
                                    {user.profile_photo ? <img src={`/storage/${user.profile_photo}`} className="h-full w-full object-cover" /> : user.name.charAt(0)}
                                </div>
                                <span className="hidden sm:block text-gray-800 font-medium text-sm">{user.name}</span>
                            </button>
                        </Dropdown.Trigger>
                        <Dropdown.Content align="right" className="mt-2 w-48 shadow-2xl border-none">
                            <Dropdown.Link href={route("profile.edit")} className="flex items-center gap-2 py-3"><FaUser /> Profile</Dropdown.Link>
                            <Dropdown.Link href={route("logout")} method="post" as="button" className="flex items-center gap-2 py-3 text-red-600"><FaSignOutAlt /> Log Out</Dropdown.Link>
                        </Dropdown.Content>
                    </Dropdown>
                </div>
            </div>
        </header>
    );
}