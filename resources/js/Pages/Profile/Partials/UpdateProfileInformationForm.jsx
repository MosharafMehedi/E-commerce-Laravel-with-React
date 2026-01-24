import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Transition } from "@headlessui/react";
import { useForm, usePage } from "@inertiajs/react";
import axios from "axios";

export default function UpdateProfileInformation({ mustVerifyEmail, status, className = "" }) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        name: user.name || "",
        email: user.email || "",
        photo: null,
    });

    const submit = (e) => {
        e.preventDefault();
        patch(route("profile.update"));
    };

    const uploadPhoto = () => {
        if (!data.photo) return;
        const formData = new FormData();
        formData.append("photo", data.photo);

        axios.post(route("profile.update-photo"), formData, {
            headers: { "Content-Type": "multipart/form-data" },
        })
        .then(() => setData("photo", null))
        .catch((err) => console.error(err));
    };

    return (
        <section className={className}>
            <header className="mb-6">
                <h2 className="text-xl font-bold text-gray-900">General Information</h2>
                <p className="mt-1 text-sm text-gray-600">
                    Update your account's profile information and avatar.
                </p>
            </header>

            <div className="flex flex-col md:flex-row gap-8">
                {/* Photo Section */}
                <div className="flex flex-col items-center space-y-4 p-4 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                    <div className="relative group">
                        <img
                            src={data.photo ? URL.createObjectURL(data.photo) : user.profile_photo ? `/storage/${user.profile_photo}` : `https://ui-avatars.com/api/?name=${user.name}&background=3CA3E8&color=fff`}
                            className="w-32 h-32 rounded-full object-cover ring-4 ring-white shadow-lg"
                        />
                        <label htmlFor="photo-upload" className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity">
                            <span className="text-white text-xs font-medium">Change</span>
                        </label>
                    </div>
                    <input type="file" id="photo-upload" className="hidden" onChange={(e) => setData("photo", e.target.files[0])} />
                    
                    {data.photo && (
                        <button type="button" onClick={uploadPhoto} className="text-xs font-bold text-blue-600 uppercase tracking-wider hover:underline">
                            Save Photo
                        </button>
                    )}
                    <InputError message={errors.photo} />
                </div>

                {/* Form Fields */}
                <form onSubmit={submit} className="flex-1 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="col-span-2">
                            <InputLabel htmlFor="name" value="Full Name" />
                            <TextInput id="name" className="mt-1 block w-full" value={data.name} onChange={(e) => setData("name", e.target.value)} required />
                            <InputError className="mt-2" message={errors.name} />
                        </div>

                        <div className="col-span-2">
                            <InputLabel htmlFor="email" value="Email Address" />
                            <TextInput id="email" type="email" className="mt-1 block w-full" value={data.email} onChange={(e) => setData("email", e.target.value)} required />
                            <InputError className="mt-2" message={errors.email} />
                        </div>
                    </div>

                    <div className="flex items-center gap-4 border-t pt-4">
                        <PrimaryButton disabled={processing} className="bg-blue-600 hover:bg-blue-700">Save Changes</PrimaryButton>
                        <Transition show={recentlySuccessful} enter="transition ease-in-out" enterFrom="opacity-0" leave="transition ease-in-out" leaveTo="opacity-0">
                            <p className="text-sm text-green-600 font-medium">Saved successfully.</p>
                        </Transition>
                    </div>
                </form>
            </div>
        </section>
    );
}