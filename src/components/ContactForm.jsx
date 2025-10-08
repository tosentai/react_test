import React, { useState } from "react";

function ContactForm({ onAddContact }) {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        phone: "",
    });
    const [errors, setErrors] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
        const result = onAddContact(formData);

        if (!result.success) {
            setErrors(result.errors);
            return;
        }

        setFormData({ firstName: "", lastName: "", phone: "" });
        setErrors({});
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mb-6 p-4 border border-black">
            <div className="grid grid-cols-3 gap-4 mb-4">
                <div>
                    <input
                        type="text"
                        name="firstName"
                        placeholder="First Name*"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-black"
                    />
                    {errors.firstName && (
                        <p className="text-red-600 text-sm mt-1">
                            {errors.firstName}
                        </p>
                    )}
                </div>

                <div>
                    <input
                        type="text"
                        name="lastName"
                        placeholder="Last Name*"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-black"
                    />
                    {errors.lastName && (
                        <p className="text-red-600 text-sm mt-1">
                            {errors.lastName}
                        </p>
                    )}
                </div>

                <div>
                    <input
                        type="text"
                        name="phone"
                        placeholder="Phone*"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-black"
                    />
                    {errors.phone && (
                        <p className="text-red-600 text-sm mt-1">
                            {errors.phone}
                        </p>
                    )}
                </div>
            </div>

            <button
                type="submit"
                className="px-4 py-2 bg-black text-white border border-black hover:bg-white hover:text-black"
            >
                Add Contact
            </button>
        </form>
    );
}

export default ContactForm;
