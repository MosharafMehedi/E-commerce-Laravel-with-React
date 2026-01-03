import { Link, usePage } from '@inertiajs/react';

export default function Header() {
    const { auth } = usePage().props;

    return (
        <header className="sticky top-0 z-40 bg-white border-b">
            <div className="flex h-16 items-center justify-between px-6">
                {/* Logo */}
                <div className="text-xl font-extrabold text-indigo-600">
                    ShopSmart
                </div>

                {/* Right */}
                <div className="flex items-center gap-6">
                    <span className="text-sm text-slate-600">
                        Hi, <strong>{auth.user.name}</strong>
                    </span>

                    <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        className="rounded-lg bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-100"
                    >
                        Logout
                    </Link>
                </div>
            </div>
        </header>
    );
}
