import { Head, Link } from '@inertiajs/react';

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="ShopSmart – Modern E-Commerce" />

            <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-slate-100">
                {/* Navbar */}
                <header className="sticky top-0 z-50 backdrop-blur bg-white/70 border-b">
                    <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
                        <h1 className="text-2xl font-extrabold text-indigo-600">
                            ShopSmart
                        </h1>

                        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
                            <NavLink label="Home" />
                            <NavLink label="Products" />
                            <NavLink label="Categories" />
                            <NavLink label="Contact" />

                            {auth?.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="rounded-lg bg-indigo-600 px-5 py-2 text-white hover:bg-indigo-700"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link href={route('login')} className="text-indigo-600">
                                        Login
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="rounded-lg bg-indigo-600 px-5 py-2 text-white hover:bg-indigo-700"
                                    >
                                        Get Started
                                    </Link>
                                </>
                            )}
                        </nav>
                    </div>
                </header>

                {/* Hero */}
                <section className="relative overflow-hidden">
                    <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-indigo-300 opacity-30 blur-3xl" />
                    <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-purple-300 opacity-30 blur-3xl" />

                    <div className="relative mx-auto max-w-7xl px-6 py-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <span className="inline-block mb-4 rounded-full bg-indigo-100 px-4 py-1 text-sm font-semibold text-indigo-600">
                                #1 Smart Online Shop
                            </span>

                            <h2 className="text-5xl font-extrabold leading-tight text-slate-800">
                                Shop Smarter <br />
                                Live Better
                            </h2>

                            <p className="mt-6 text-slate-600 text-lg">
                                Discover premium products with fast delivery, secure checkout,
                                and trusted sellers worldwide.
                            </p>

                            <div className="mt-8 flex flex-wrap gap-4">
                                <Link
                                    href={route('register')}
                                    className="rounded-xl bg-indigo-600 px-8 py-4 text-white font-semibold shadow-lg hover:bg-indigo-700"
                                >
                                    Start Shopping
                                </Link>
                                <Link
                                    href="#"
                                    className="rounded-xl bg-white px-8 py-4 font-semibold shadow hover:bg-slate-100"
                                >
                                    View Products
                                </Link>
                            </div>
                        </div>

                        {/* Hero Card */}
                        <div className="relative">
                            <div className="rounded-3xl bg-white/80 backdrop-blur p-8 shadow-2xl">
                                <div className="grid grid-cols-2 gap-4">
                                    <HeroCard title="Orders" value="12k+" />
                                    <HeroCard title="Customers" value="8k+" />
                                    <HeroCard title="Products" value="1.5k+" />
                                    <HeroCard title="Reviews" value="5★" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features */}
                <section className="mx-auto max-w-7xl px-6 py-24">
                    <h3 className="text-center text-3xl font-bold mb-16">
                        Why ShopSmart?
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        <Feature icon="🚀" title="Fast Delivery" />
                        <Feature icon="🔐" title="Secure Payments" />
                        <Feature icon="💎" title="Premium Quality" />
                    </div>
                </section>

                {/* Featured Products */}
                <section className="bg-white py-24">
                    <div className="mx-auto max-w-7xl px-6">
                        <h3 className="text-3xl font-bold mb-12 text-center">
                            Featured Products
                        </h3>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {[1, 2, 3, 4].map((i) => (
                                <ProductCard key={i} />
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="relative py-24 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                    <div className="mx-auto max-w-7xl px-6 text-center">
                        <h3 className="text-4xl font-extrabold">
                            Ready to Elevate Your Shopping?
                        </h3>
                        <p className="mt-4 text-lg opacity-90">
                            Join thousands of happy customers today.
                        </p>
                        <Link
                            href={route('register')}
                            className="inline-block mt-8 rounded-xl bg-white px-10 py-4 text-indigo-600 font-bold shadow-lg hover:bg-slate-100"
                        >
                            Create Free Account
                        </Link>
                    </div>
                </section>

                {/* Footer */}
                <footer className="bg-slate-900 text-slate-400 py-10">
                    <div className="mx-auto max-w-7xl px-6 flex justify-between text-sm">
                        <p>© {new Date().getFullYear()} ShopSmart</p>
                        <div className="flex gap-6">
                            <a href="#">Privacy</a>
                            <a href="#">Terms</a>
                            <a href="#">Support</a>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}

/* Components */

function NavLink({ label }) {
    return (
        <a href="#" className="hover:text-indigo-600 transition">
            {label}
        </a>
    );
}

function Feature({ icon, title }) {
    return (
        <div className="rounded-3xl bg-white p-10 text-center shadow hover:shadow-xl transition">
            <div className="text-5xl">{icon}</div>
            <h4 className="mt-6 text-xl font-bold">{title}</h4>
            <p className="mt-3 text-slate-600">
                Experience top-notch service designed for modern shoppers.
            </p>
        </div>
    );
}

function HeroCard({ title, value }) {
    return (
        <div className="rounded-2xl bg-indigo-50 p-6 text-center">
            <p className="text-sm text-slate-500">{title}</p>
            <p className="mt-2 text-2xl font-bold text-indigo-600">{value}</p>
        </div>
    );
}

function ProductCard() {
    return (
        <div className="rounded-2xl border bg-white p-4 hover:shadow-lg transition">
            <div className="h-40 rounded-xl bg-slate-100 flex items-center justify-center text-4xl">
                📦
            </div>
            <h4 className="mt-4 font-semibold">Premium Product</h4>
            <p className="text-sm text-slate-500">$120.00</p>
            <button className="mt-4 w-full rounded-lg bg-indigo-600 py-2 text-white font-semibold hover:bg-indigo-700">
                Add to Cart
            </button>
        </div>
    );
}
