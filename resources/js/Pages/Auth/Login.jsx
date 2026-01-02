import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Login" />

            <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">

                {/* LEFT IMAGE PANEL */}
                <div
                    className="hidden lg:flex items-center justify-center bg-cover bg-center relative"
                    style={{ backgroundImage: "url('/images/login-bg.jpg')" }}
                >
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/50" />

                    {/* Text */}
                    <div className="relative z-10 max-w-lg px-10 text-white">
                        <h1 className="text-4xl font-bold leading-tight">
                            Manage Your Business Effortlessly
                        </h1>
                        <p className="mt-4 text-lg text-gray-200">
                            Login to access your dashboard, orders, analytics,
                            and more from one place.
                        </p>
                    </div>
                </div>

                {/* RIGHT FORM PANEL */}
                <div className="flex items-center justify-center px-6 sm:px-10">
                    <div className="w-full max-w-md">

                        {/* Header */}
                        <h2 className="text-3xl font-bold text-gray-900">
                            Welcome Back
                        </h2>
                        <p className="mt-2 text-sm text-gray-500">
                            Sign in to continue to your account
                        </p>

                        {status && (
                            <div className="mt-4 rounded-lg bg-green-100 px-4 py-2 text-sm text-green-700">
                                {status}
                            </div>
                        )}

                        {/* FORM */}
                        <form onSubmit={submit} className="mt-8 space-y-6">

                            {/* Email */}
                            <div>
                                <InputLabel htmlFor="email" value="Email address" />
                                <TextInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="mt-1 block w-full rounded-lg"
                                    autoComplete="username"
                                    isFocused
                                    onChange={(e) =>
                                        setData('email', e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.email}
                                    className="mt-2"
                                />
                            </div>

                            {/* Password */}
                            <div>
                                <InputLabel htmlFor="password" value="Password" />
                                <TextInput
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    className="mt-1 block w-full rounded-lg"
                                    autoComplete="current-password"
                                    onChange={(e) =>
                                        setData('password', e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.password}
                                    className="mt-2"
                                />
                            </div>

                            {/* Remember & Forgot */}
                            <div className="flex items-center justify-between">
                                <label className="flex items-center">
                                    <Checkbox
                                        name="remember"
                                        checked={data.remember}
                                        onChange={(e) =>
                                            setData('remember', e.target.checked)
                                        }
                                    />
                                    <span className="ms-2 text-sm text-gray-600">
                                        Remember me
                                    </span>
                                </label>

                                {canResetPassword && (
                                    <Link
                                        href={route('password.request')}
                                        className="text-sm font-medium text-indigo-600 hover:underline"
                                    >
                                        Forgot password?
                                    </Link>
                                )}
                            </div>

                            {/* Submit */}
                            <PrimaryButton
                                className="w-full justify-center rounded-lg bg-indigo-600 py-3 text-base font-medium hover:bg-indigo-700"
                                disabled={processing}
                            >
                                Sign In
                            </PrimaryButton>
                        </form>

                        {/* Footer */}
                        <p className="mt-8 text-center text-sm text-gray-600">
                            Don’t have an account?{' '}
                            <Link
                                href={route('register')}
                                className="font-medium text-indigo-600 hover:underline"
                            >
                                Create an account
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}