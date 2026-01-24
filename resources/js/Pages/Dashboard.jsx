import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Package, Lock, MapPin, CreditCard, User, MessageSquare, Plus } from 'lucide-react';

export default function AmazonDashboard({ auth }) {
    return (
        <AuthenticatedLayout>
            <Head title="Your Account" />

            <div className="bg-white min-h-screen pb-20">
                {/* Amazon Style Breadcrumb */}
                <div className="max-w-5xl mx-auto px-4 py-4 text-sm">
                    <span className="text-gray-600">Your Account</span>
                </div>

                <div className="max-w-5xl mx-auto px-4">
                    <h1 className="text-3xl font-medium text-gray-900 mb-6">Your Account</h1>

                    {/* 1. Main Grid - Amazon's Signature Card Layout */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        <AmazonAccountCard 
                            icon={<Package className="w-12 h-12 text-blue-400" strokeWidth={1.5} />}
                            title="Your Orders"
                            desc="Track, return, or buy things again"
                        />
                        <AmazonAccountCard 
                            icon={<Lock className="w-12 h-12 text-blue-400" strokeWidth={1.5} />}
                            title="Login & security"
                            desc="Edit login, name, and mobile number"
                        />
                        <AmazonAccountCard 
                            icon={<MapPin className="w-12 h-12 text-blue-400" strokeWidth={1.5} />}
                            title="Your Addresses"
                            desc="Edit addresses for orders and gifts"
                        />
                        <AmazonAccountCard 
                            icon={<CreditCard className="w-12 h-12 text-blue-400" strokeWidth={1.5} />}
                            title="Your Payments"
                            desc="View all transactions, manage payment methods and settings"
                        />
                        <AmazonAccountCard 
                            icon={<User className="w-12 h-12 text-blue-400" strokeWidth={1.5} />}
                            title="Your Profiles"
                            desc="Manage, add, or remove user profiles for personalized experiences"
                        />
                        <AmazonAccountCard 
                            icon={<MessageSquare className="w-12 h-12 text-blue-400" strokeWidth={1.5} />}
                            title="Customer Service"
                            desc="Browse help topics or contact us"
                        />
                    </div>

                    <hr className="my-10 border-gray-200" />

                    {/* 2. Amazon Style List Sections */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        <AccountListSection title="Digital content and devices">
                            <li>Apps and more</li>
                            <li>Content and devices</li>
                            <li>Digital gifts</li>
                        </AccountListSection>

                        <AccountListSection title="Email alerts, messages, and ads">
                            <li>Advertising preferences</li>
                            <li>Communication preferences</li>
                            <li>Message Center</li>
                        </AccountListSection>

                        <AccountListSection title="More ways to pay">
                            <li>Amazon Pay balance</li>
                            <li>Your Currencies</li>
                        </AccountListSection>
                    </div>

                    {/* 3. Personalized 'Buy It Again' (Amazon Style Grid) */}
                    <div className="mt-12 border border-gray-200 rounded-lg p-6">
                        <h3 className="text-xl font-bold mb-4">Buy it again</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div key={i} className="group cursor-pointer">
                                    <div className="aspect-square bg-gray-50 rounded-md flex items-center justify-center mb-2 border border-transparent group-hover:border-gray-300">
                                        <img src={`https://placehold.co/150x150?text=Product+${i}`} alt="product" className="mix-blend-multiply" />
                                    </div>
                                    <p className="text-sm text-blue-600 group-hover:text-orange-700 font-medium truncate">Product Name Example {i}</p>
                                    <p className="text-xs text-red-700 font-bold mt-1">৳ 550.00</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

/* ================= Amazon Specific Components ================= */

function AmazonAccountCard({ icon, title, desc }) {
    return (
        <div className="flex items-start p-4 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer transition h-full">
            <div className="mr-4 mt-1">
                {icon}
            </div>
            <div>
                <h2 className="text-lg font-medium text-gray-900 leading-tight">{title}</h2>
                <p className="text-sm text-gray-600 mt-1 leading-snug">{desc}</p>
            </div>
        </div>
    );
}

function AccountListSection({ title, children }) {
    return (
        <div>
            <h3 className="text-lg font-bold text-gray-900 mb-3">{title}</h3>
            <ul className="text-sm space-y-2 text-blue-600 hover:text-orange-700 cursor-pointer">
                {children}
            </ul>
        </div>
    );
}