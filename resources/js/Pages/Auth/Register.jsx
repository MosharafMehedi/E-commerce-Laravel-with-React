import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import Swal from "sweetalert2";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const submit = (e) => {
        e.preventDefault();
        Swal.fire({
            title: "Signing you in...",
            text: "Please wait",
            allowOutsideClick: false,
            allowEscapeKey: false,
            didOpen: () => {
                Swal.showLoading();
            },
        });

        post(route("register"), {
            onSuccess: () => {
                Swal.close();
                Swal.fire({
                    icon: "success",
                    title: "Success!",
                    text: "Registration successful",
                    timer: 1500,
                    showConfirmButton: true,
                });
            },
            onError: () => {
                Swal.close();

                Swal.fire({
                    icon: "error",
                    title: "Registration failed",
                    text: "Password not Matched",
                });
            },
            onFinish: () => reset("password", "password_confirmation"),
        });
    };

    return (
        <GuestLayout>
            <Head title="Register" />

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
                            Create Your Account
                        </h1>
                        <p className="mt-4 text-lg text-gray-200">
                            Join us and manage your business with powerful tools
                            and real-time insights.
                        </p>
                    </div>
                </div>

                {/* RIGHT FORM PANEL */}
                <div className="flex items-center justify-center px-6 sm:px-10">
                    <div className="w-full max-w-md">
                        {/* Header */}
                        <h2 className="text-3xl font-bold text-gray-900">
                            Sign Up
                        </h2>
                        <p className="mt-2 text-sm text-gray-500">
                            Create an account to get started
                        </p>

                        {/* FORM */}
                        <form onSubmit={submit} className="mt-8 space-y-6">
                            {/* Name */}
                            <div>
                                <InputLabel htmlFor="name" value="Full name" />
                                <TextInput
                                    id="name"
                                    name="name"
                                    value={data.name}
                                    className="mt-1 block w-full rounded-lg"
                                    autoComplete="name"
                                    isFocused
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                    required
                                />
                                <InputError
                                    message={errors.name}
                                    className="mt-2"
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <InputLabel
                                    htmlFor="email"
                                    value="Email address"
                                />
                                <TextInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="mt-1 block w-full rounded-lg"
                                    autoComplete="username"
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                    required
                                />
                                <InputError
                                    message={errors.email}
                                    className="mt-2"
                                />
                            </div>

                            {/* Password */}
                            <div>
                                <InputLabel
                                    htmlFor="password"
                                    value="Password"
                                />
                                <TextInput
                                    id="password"
                                    type="password"
                                    name="password"
                                    minlength="8"
                                    value={data.password}
                                    className="mt-1 block w-full rounded-lg"
                                    autoComplete="new-password"
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                    required
                                />
                                <InputError
                                    message={errors.password}
                                    className="mt-2"
                                />
                            </div>

                            {/* Confirm Password */}
                            <div>
                                <InputLabel
                                    htmlFor="password_confirmation"
                                    value="Confirm password"
                                />
                                <TextInput
                                    id="password_confirmation"
                                    type="password"
                                    name="password_confirmation"
                                    value={data.password_confirmation}
                                    className="mt-1 block w-full rounded-lg"
                                    autoComplete="new-password"
                                    onChange={(e) =>
                                        setData(
                                            "password_confirmation",
                                            e.target.value,
                                        )
                                    }
                                    required
                                />
                                <InputError
                                    message={errors.password_confirmation}
                                    className="mt-2"
                                />
                            </div>

                            {/* Submit */}
                            <PrimaryButton
                                className="w-full justify-center rounded-lg bg-indigo-600 py-3 text-base font-medium hover:bg-indigo-700"
                                disabled={processing}
                            >
                                Create Account
                            </PrimaryButton>
                        </form>

                        {/* Footer */}
                        <p className="mt-8 text-center text-sm text-gray-600">
                            Already have an account?{" "}
                            <Link
                                href={route("login")}
                                className="font-medium text-indigo-600 hover:underline"
                            >
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
