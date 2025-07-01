import { useState } from 'react';
import { toast } from 'react-toastify';

const initialFormState = {
    jobTitle: '',
    jobType: '',
    startDate: '',
    duties: '',
    location: '',
    comments: '',
    firstName: '',
    lastName: '',
    hotel: '',
    managementCompany: '',
    phone: '',
    email: '',
    respondBy: '',
};
const inputClass =
    "w-full p-3 bg-white/5 text-white border border-white/20 rounded-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-white/40 hover:border-white/40 placeholder-gray-300";

const FormApply = () => {
    const [formData, setFormData] = useState(initialFormState);

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await res.json();
            if (res.ok) {
                toast.success('Application submitted successfully!');
                setFormData(initialFormState); // 🔁 Reset the form here
            } else {
                toast.error(data.message || 'Submission failed.');
            }
        } catch (err) {
            toast.error('Something went wrong.');
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-2xl mx-auto space-y-4 bg-white/5 backdrop-blur-md p-6 rounded-xl text-white shadow-xl"
        >
            <h2 className="text-xl font-bold">Job Information</h2>

            <input
                name="jobTitle"
                value={formData.jobTitle}
                placeholder="Job Title*"
                onChange={handleChange}
                required
                className="w-full p-3 bg-white/5 border border-white/20 rounded-md placeholder-gray-300 text-white transition focus:outline-none focus:ring-2 focus:ring-white/30 hover:border-white/40"
            />

            <select
                name="jobType"
                value={formData.jobType}
                onChange={handleChange}
                required
                className="w-full p-3 bg-white/5 border border-white/20 rounded-md text-white placeholder-gray-300 transition focus:outline-none focus:ring-2 focus:ring-white/30 hover:border-white/40"
            >
                <option value="">Is this position temporary or full-time?*</option>
                <option value="Temporary">Temporary</option>
                <option value="Full-time">Full-time</option>
            </select>
                 <p>
                    Start Date:
                 </p>
            <input
                name="startDate"
                type="date"
                value={formData.startDate}
                onChange={handleChange}
                required
                className="w-full p-3 bg-white/5 border border-white/20 rounded-md text-white placeholder-gray-300 transition focus:outline-none focus:ring-2 focus:ring-white/30 hover:border-white/40"
            />

            <textarea
                name="duties"
                value={formData.duties}
                placeholder="Duties & Responsibilities*"
                onChange={handleChange}
                required
                className="w-full p-3 bg-white/5 border border-white/20 rounded-md text-white placeholder-gray-300 transition focus:outline-none focus:ring-2 focus:ring-white/30 hover:border-white/40"
            />

            <input
                name="location"
                value={formData.location}
                placeholder="Location*"
                onChange={handleChange}
                required
                className="w-full p-3 bg-white/5 border border-white/20 rounded-md text-white placeholder-gray-300 transition focus:outline-none focus:ring-2 focus:ring-white/30 hover:border-white/40"
            />

            <textarea
                name="comments"
                value={formData.comments}
                placeholder="Additional Comments"
                onChange={handleChange}
                className="w-full p-3 bg-white/5 border border-white/20 rounded-md text-white placeholder-gray-300 transition focus:outline-none focus:ring-2 focus:ring-white/30 hover:border-white/40"
            />

            <h2 className="text-xl font-bold mt-6">Your Contact Information</h2>

            <input
                name="firstName"
                value={formData.firstName}
                placeholder="First Name*"
                onChange={handleChange}
                required
                className="w-full p-3 bg-white/5 border border-white/20 rounded-md placeholder-gray-300 text-white transition focus:outline-none focus:ring-2 focus:ring-white/30 hover:border-white/40"
            />

            <input
                name="lastName"
                value={formData.lastName}
                placeholder="Last Name*"
                onChange={handleChange}
                required
                className="w-full p-3 bg-white/5 border border-white/20 rounded-md placeholder-gray-300 text-white transition focus:outline-none focus:ring-2 focus:ring-white/30 hover:border-white/40"
            />

            <input
                name="hotel"
                value={formData.hotel}
                placeholder="Your Hotel, Venue, or Company*"
                onChange={handleChange}
                required
                className="w-full p-3 bg-white/5 border border-white/20 rounded-md placeholder-gray-300 text-white transition focus:outline-none focus:ring-2 focus:ring-white/30 hover:border-white/40"
            />

            <input
                name="managementCompany"
                value={formData.managementCompany}
                placeholder="Management Company (or indicate if self-managed)*"
                onChange={handleChange}
                required
                className="w-full p-3 bg-white/5 border border-white/20 rounded-md placeholder-gray-300 text-white transition focus:outline-none focus:ring-2 focus:ring-white/30 hover:border-white/40"
            />

            <input
                name="phone"
                value={formData.phone}
                placeholder="Phone*"
                onChange={handleChange}
                required
                className="w-full p-3 bg-white/5 border border-white/20 rounded-md placeholder-gray-300 text-white transition focus:outline-none focus:ring-2 focus:ring-white/30 hover:border-white/40"
            />

            <input
                name="email"
                type="email"
                value={formData.email}
                placeholder="Email*"
                onChange={handleChange}
                required
                className="w-full p-3 bg-white/5 border border-white/20 rounded-md placeholder-gray-300 text-white transition focus:outline-none focus:ring-2 focus:ring-white/30 hover:border-white/40"
            />

            <select
                name="respondBy"
                value={formData.respondBy}
                onChange={handleChange}
                required
                className="w-full p-3 bg-white/5 border border-white/20 rounded-md text-white placeholder-gray-300 transition focus:outline-none focus:ring-2 focus:ring-white/30 hover:border-white/40"
            >
                <option value="">Respond by*</option>
                <option value="Phone">Phone</option>
                <option value="Email">Email</option>
            </select>

            <button
                type="submit"
                className="w-full py-3 bg-black text-white border border-white/10 rounded-md hover:bg-white hover:text-black transition duration-200 font-medium"
            >
                Submit
            </button>
        </form>

    );
};

export default FormApply;
