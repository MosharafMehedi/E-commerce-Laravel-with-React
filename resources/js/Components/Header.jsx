import { Link, usePage } from "@inertiajs/react";
import Dropdown from "@/Components/Dropdown";
import ApplicationLogo from "@/Components/ApplicationLogo";
import { FaUserCircle, FaUser, FaSignOutAlt } from "react-icons/fa";

export default function Header({ onMenuClick }) {
    const user = usePage().props.auth.user;
    const primaryColor = "#3CA3E8";

    return (
        <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
            <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8 flex h-16 justify-between items-center">
                {/* Left: Hamburger + Logo */}
                <div className="flex items-center gap-3">
                    {/* Hamburger (mobile only) */}
                    <button
                        className="md:hidden text-2xl text-gray-700"
                        onClick={onMenuClick}
                    >
                        ☰
                    </button>

                    <Link href="/" className="flex items-center gap-3">
                        <ApplicationLogo className="h-9 w-auto fill-current text-gray-800" />

                        {/* Logo Text */}
                        <div className="hidden sm:flex items-center pl-4 border-l border-gray-200">
                            <div className="flex flex-col">
                                <span
                                    className="text-xl font-bold leading-tight"
                                    style={{ color: primaryColor }}
                                >
                                    M SHOPPING
                                </span>
                                <span className="text-xs text-gray-500 font-medium">
                                    Premium Online Retail
                                </span>
                            </div>
                        </div>
                    </Link>
                </div>

                {/* Right: User Menu */}
                <Dropdown>
                    <Dropdown.Trigger>
                        <button className="flex items-center gap-2 rounded-lg bg-white px-4 py-2  transition-all duration-200 ">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-500 text-white font-bold">
                                {user.name[0].toUpperCase()}
                            </div>
                            <span className="text-gray-800 font-medium">
                                {user.name}
                            </span>
                            <svg
                                className="h-4 w-4 text-gray-400 transition-transform duration-200 group-hover:rotate-180"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 9l-7 7-7-7"
                                />
                            </svg>
                        </button>
                    </Dropdown.Trigger>

                    <Dropdown.Content
                        align="right"
                        className="mt-2 w-52 rounded-xl bg-white border border-gray-100 shadow-xl py-2 animate-slide-down"
                    >
                        {/* Profile Link */}
                        <Dropdown.Link
                            href={route("profile.edit")}
                            className="flex items-center gap-3 px-4 py-2 text-gray-700 text-sm rounded-lg hover:bg-indigo-50 hover:text-indigo-600 transition"
                        >
                            <FaUser className="text-gray-400" />
                            Profile
                        </Dropdown.Link>

                        {/* Divider */}
                        <div className="my-1 h-px bg-gray-200"></div>

                        {/* Logout Link */}
                        <Dropdown.Link
                            href={route("logout")}
                            method="post"
                            as="button"
                            className="flex items-center gap-3 px-4 py-2 text-red-600 text-sm rounded-lg hover:bg-red-50 transition"
                        >
                            <FaSignOutAlt className="text-red-400" />
                            Log Out
                        </Dropdown.Link>
                    </Dropdown.Content>
                </Dropdown>
            </div>
        </header>
    );
}
