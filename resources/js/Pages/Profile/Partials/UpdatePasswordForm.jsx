import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { useForm } from '@inertiajs/react';
import { useRef } from 'react';

export default function UpdatePasswordForm({ className = '' }) {
    const passwordInput = useRef();
    const currentPasswordInput = useRef();

    const {
        data,
        setData,
        errors,
        put,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const updatePassword = (e) => {
        e.preventDefault();

        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset('password', 'password_confirmation');
                    passwordInput.current.focus();
                }

                if (errors.current_password) {
                    reset('current_password');
                    currentPasswordInput.current.focus();
                }
            },
        });
    };

    return (
        <section
            className={`max-w-2xl rounded-lg border border-gray-200 bg-white ${className}`}
        >
            {/* Header */}
            <div className="border-b border-gray-100 px-6 py-4">
                <h2 className="text-base font-semibold text-gray-900">
                    Password
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                    Use a strong, unique password to keep your account secure.
                </p>
            </div>

            {/* Form */}
            <form onSubmit={updatePassword} className="space-y-6 px-6 py-6">
                <div>
                    <InputLabel
                        htmlFor="current_password"
                        value="Current password"
                    />

                    <TextInput
                        id="current_password"
                        ref={currentPasswordInput}
                        type="password"
                        value={data.current_password}
                        onChange={(e) =>
                            setData('current_password', e.target.value)
                        }
                        className="mt-1 block w-full rounded-md border-gray-300
                            focus:border-[#3CA3E8] focus:ring-1 focus:ring-[#3CA3E8]"
                        autoComplete="current-password"
                    />

                    <InputError
                        message={errors.current_password}
                        className="mt-1"
                    />
                </div>

                <div>
                    <InputLabel htmlFor="password" value="New password" />

                    <TextInput
                        id="password"
                        ref={passwordInput}
                        type="password"
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300
                            focus:border-[#3CA3E8] focus:ring-1 focus:ring-[#3CA3E8]"
                        autoComplete="new-password"
                    />

                    <InputError message={errors.password} className="mt-1" />
                </div>

                <div>
                    <InputLabel
                        htmlFor="password_confirmation"
                        value="Confirm new password"
                    />

                    <TextInput
                        id="password_confirmation"
                        type="password"
                        value={data.password_confirmation}
                        onChange={(e) =>
                            setData('password_confirmation', e.target.value)
                        }
                        className="mt-1 block w-full rounded-md border-gray-300
                            focus:border-[#3CA3E8] focus:ring-1 focus:ring-[#3CA3E8]"
                        autoComplete="new-password"
                    />

                    <InputError
                        message={errors.password_confirmation}
                        className="mt-1"
                    />
                </div>

                {/* Footer */}
                <div className="flex items-center gap-3 border-t border-gray-100 pt-4">
                    <PrimaryButton
                        disabled={processing}
                        className="bg-[#3CA3E8] px-5 py-2 text-sm font-medium
                            hover:bg-sky-500 focus:ring-[#3CA3E8]"
                    >
                        Update password
                    </PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition-opacity duration-200"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity duration-150"
                        leaveTo="opacity-0"
                    >
                        <span className="text-sm text-gray-600">
                            Password updated
                        </span>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
