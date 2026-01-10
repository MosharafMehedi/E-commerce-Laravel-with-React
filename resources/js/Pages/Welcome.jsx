import { Head, Link, usePage } from "@inertiajs/react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import { useState } from "react";

export default function Welcome({ auth }) {
    const primaryColor = "#3CA3E8"; // Your theme color
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <>
            <Head title="ShopSmart – Modern E-Commerce" />

            <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-slate-100">
                {/* Navbar */}
                <header className="sticky top-0 z-50 backdrop-blur bg-white/70 border-b">
                    <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-3">
                            <ApplicationLogo
                                className="h-10 w-auto"
                                style={{ fill: primaryColor }}
                            />
                            <div className="flex items-center pl-4 border-l border-gray-200">
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

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
                            <NavLink label="Home" color={primaryColor} />
                            <NavLink label="Products" color={primaryColor} />
                            <NavLink label="Categories" color={primaryColor} />
                            <NavLink label="Contact" color={primaryColor} />

                            {auth?.user ? (
                                <Link
                                    href={route("dashboard")}
                                    className="rounded-lg px-5 py-2 text-white font-medium hover:opacity-90"
                                    style={{ backgroundColor: primaryColor }}
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route("login")}
                                        className="font-medium"
                                        style={{ color: primaryColor }}
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        href={route("register")}
                                        className="ml-4 rounded-lg px-5 py-2 text-white font-medium hover:opacity-90"
                                        style={{
                                            backgroundColor: primaryColor,
                                        }}
                                    >
                                        Get Started
                                    </Link>
                                </>
                            )}
                        </nav>

                        {/* Mobile Menu Button */}
                        <button
                            className="md:hidden text-gray-700"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ? "✖" : "☰"}
                        </button>
                    </div>

                    {/* Mobile Menu */}
                    {mobileMenuOpen && (
                        <div className="md:hidden bg-white border-t shadow-md">
                            <nav className="flex flex-col px-4 py-4 gap-2">
                                <NavLink label="Home" color={primaryColor} />
                                <NavLink
                                    label="Products"
                                    color={primaryColor}
                                />
                                <NavLink
                                    label="Categories"
                                    color={primaryColor}
                                />
                                <NavLink label="Contact" color={primaryColor} />

                                {auth?.user ? (
                                    <Link
                                        href={route("dashboard")}
                                        className="rounded-lg px-5 py-2 text-white font-medium hover:opacity-90"
                                        style={{
                                            backgroundColor: primaryColor,
                                        }}
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={route("login")}
                                            className="font-medium"
                                            style={{ color: primaryColor }}
                                        >
                                            Login
                                        </Link>
                                        <Link
                                            href={route("register")}
                                            className="rounded-lg px-5 py-2 text-white font-medium hover:opacity-90 mt-2"
                                            style={{
                                                backgroundColor: primaryColor,
                                            }}
                                        >
                                            Get Started
                                        </Link>
                                    </>
                                )}
                            </nav>
                        </div>
                    )}
                </header>

                {/* Hero */}
                <section className="relative overflow-hidden">
                    {/* Decorative Circles */}
                    <div className="hidden lg:block absolute -top-32 -right-32 h-96 w-96 rounded-full bg-green-300 opacity-30 blur-3xl" />
                    <div className="hidden lg:block absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-green-200 opacity-30 blur-3xl" />

                    <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <span
                                className="inline-block mb-4 rounded-full px-4 py-1 text-sm font-semibold"
                                style={{
                                    backgroundColor: "#D1F7D3",
                                    color: primaryColor,
                                }}
                            >
                                #1 Smart Online Shop
                            </span>

                            <h2 className="text-4xl sm:text-5xl font-extrabold leading-tight text-slate-800">
                                Shop Smarter <br />
                                Live Better
                            </h2>

                            <p className="mt-6 text-slate-600 text-lg">
                                Discover premium products with fast delivery,
                                secure checkout, and trusted sellers worldwide.
                            </p>

                            <div className="mt-8 flex flex-col sm:flex-row gap-4">
                                <Link
                                    href={route("register")}
                                    className="w-full sm:w-auto rounded-xl px-8 py-4 text-white font-semibold shadow-lg hover:opacity-90 text-center"
                                    style={{ backgroundColor: primaryColor }}
                                >
                                    Start Shopping
                                </Link>
                                <Link
                                    href="#"
                                    className="w-full sm:w-auto rounded-xl bg-white px-8 py-4 font-semibold shadow hover:bg-slate-100 text-center"
                                >
                                    View Products
                                </Link>
                            </div>
                        </div>

                        {/* Hero Card */}
                        <div className="relative mt-12 lg:mt-0">
                            <div className="rounded-3xl bg-white/80 backdrop-blur p-6 sm:p-8 shadow-2xl">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <HeroCard
                                        title="Orders"
                                        value="12k+"
                                        color={primaryColor}
                                    />
                                    <HeroCard
                                        title="Customers"
                                        value="8k+"
                                        color={primaryColor}
                                    />
                                    <HeroCard
                                        title="Products"
                                        value="1.5k+"
                                        color={primaryColor}
                                    />
                                    <HeroCard
                                        title="Reviews"
                                        value="5★"
                                        color={primaryColor}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features */}
                <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
                    <h3 className="text-center text-3xl font-bold mb-12 sm:mb-16">
                        Why ShopSmart?
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-10">
                        <Feature icon="🚀" title="Fast Delivery" />
                        <Feature icon="🔐" title="Secure Payments" />
                        <Feature icon="💎" title="Premium Quality" />
                    </div>
                </section>

                {/* Featured Products */}
                <section className="bg-white py-16 sm:py-24">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <h3 className="text-3xl font-bold mb-8 sm:mb-12 text-center">
                            Featured Products
                        </h3>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                            {[1, 2, 3, 4].map((i) => (
                                <ProductCard key={i} color={primaryColor} />
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section
                    className="relative py-16 sm:py-24 text-white"
                    style={{
                        background: `linear-gradient(to right, ${primaryColor}, #6FCF97)`,
                    }}
                >
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
                        <h3 className="text-3xl sm:text-4xl font-extrabold">
                            Ready to Elevate Your Shopping?
                        </h3>
                        <p className="mt-4 text-lg sm:text-xl opacity-90">
                            Join thousands of happy customers today.
                        </p>
                        <Link
                            href={route("register")}
                            className="inline-block mt-8 w-full sm:w-auto rounded-xl px-10 py-4 text-white font-bold shadow-lg hover:opacity-90"
                            style={{
                                backgroundColor: "#FFFFFF",
                                color: primaryColor,
                            }}
                        >
                            Create Free Account
                        </Link>
                    </div>
                </section>

                {/* Footer */}
                <footer className="bg-slate-900 text-slate-400 py-10">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between text-sm gap-4 sm:gap-0">
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

function NavLink({ label, color }) {
    return (
        <a href="#" className="hover:opacity-90 transition" style={{ color }}>
            {label}
        </a>
    );
}

function Feature({ icon, title }) {
    return (
        <div className="rounded-3xl bg-white p-8 sm:p-10 text-center shadow hover:shadow-xl transition">
            <div className="text-5xl">{icon}</div>
            <h4 className="mt-6 text-xl font-bold">{title}</h4>
            <p className="mt-3 text-slate-600">
                Experience top-notch service designed for modern shoppers.
            </p>
        </div>
    );
}

function HeroCard({ title, value, color }) {
    return (
        <div className="rounded-2xl bg-green-50 p-6 text-center">
            <p className="text-sm text-slate-500">{title}</p>
            <p className="mt-2 text-2xl font-bold" style={{ color }}>
                {value}
            </p>
        </div>
    );
}

function ProductCard({ color }) {
    return (
        <div className="rounded-2xl border bg-white p-4 hover:shadow-lg transition">
            <div className="h-40 rounded-xl bg-green-100 flex items-center justify-center text-4xl">
                📦
            </div>
            <h4 className="mt-4 font-semibold">Premium Product</h4>
            <p className="text-sm text-slate-500">$120.00</p>
            <button
                className="mt-4 w-full rounded-lg py-2 text-white font-semibold hover:opacity-90"
                style={{ backgroundColor: color }}
            >
                Add to Cart
            </button>
        </div>
    );
}
