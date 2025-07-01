import React, { useState } from 'react';
import CompareImage from 'react-compare-image';
import { toast } from 'react-toastify';

const Handyman = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
    serviceDate: 'Today',            // New: When service done
    specificDate: '',                // For "Specific date"
    streetAddress: '',
    cityZip: '',
    easyAccess: 'Yes',
    accessExplanation: '',
    preferredContactName: '',
    preferredContactPhone: '',
    preferredContactEmail: '',
    preferredContactTime: '',
  });

  const [status, setStatus] = useState('');

  const inputClassName =
    'w-full p-3 bg-white/5 border border-white/20 rounded-md text-white placeholder-gray-300 transition focus:outline-none focus:ring-2 focus:ring-white/30 hover:border-white/40';

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/submitHandyman', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success('Message sent! Thank you.');
        setFormData({
          name: '',
          phone: '',
          email: '',
          message: '',
          serviceDate: 'Today',
          specificDate: '',
          streetAddress: '',
          cityZip: '',
          easyAccess: 'Yes',
          accessExplanation: '',
          preferredContactName: '',
          preferredContactPhone: '',
          preferredContactEmail: '',
          preferredContactTime: '',
        });
      } else {
        toast.error('Failed to send message. Please try again.');
      }
    } catch (error) {
      toast.error('Error sending message. Please try again later.');
    }
  };
  return (
    <div className="max-w-4xl mx-auto p-6 font-sans text-white">
      <h2 className="text-3xl font-bold mb-6 text-center">🔧 Handyman Services</h2>

      <p className="text-lg text-center mb-10 text-gray-300">
        We provide professional handyman services including repairs, installations, painting, furniture assembly, and more.
      </p>

      <div className="mb-16">
        <h3 className="text-2xl font-semibold mb-6 text-center">🖼 Before / After</h3>
        <div className="rounded-xl overflow-hidden shadow-lg max-w-xl mx-auto">
          <CompareImage
            leftImage="/images/before.jpg"
            rightImage="/images/after.jpg"
            sliderLineColor="white"
            sliderLineWidth={2}
          />
        </div>
      </div>

      <div className="bg-white/5 p-6 rounded-2xl shadow-xl backdrop-blur-sm">
        <h3 className="text-2xl font-semibold mb-4">📩 Get in Touch</h3>
        <form onSubmit={handleSubmit} className="space-y-4">

          <label>
            <span className="block mb-1">Please describe the job in detail:</span>
            <textarea
              name="message"
              placeholder='E.g., "Need to mount a 55” TV on drywall and hide cables."'
              value={formData.message}
              onChange={handleChange}
              rows={4}
              className={inputClassName}
              required
            />
          </label>

          <fieldset>
            <legend className="mb-1 font-semibold">When would you like the service done?</legend>
            {['Today', 'Within 2–3 days', 'This week'].map(option => (
              <label key={option} className="mr-4">
                <input
                  type="radio"
                  name="serviceDate"
                  value={option}
                  checked={formData.serviceDate === option}
                  onChange={handleChange}
                  className="mr-1"
                />
                {option}
              </label>
            ))}
            <label className="block mt-2">
              <input
                type="radio"
                name="serviceDate"
                value="Specific date"
                checked={formData.serviceDate === 'Specific date'}
                onChange={handleChange}
                className="mr-1"
              />
              Specific date:
              {formData.serviceDate === 'Specific date' && (
                <input
                  type="date"
                  name="specificDate"
                  value={formData.specificDate}
                  onChange={handleChange}
                  className={`${inputClassName} mt-1`}
                  required
                />
              )}
            </label>
          </fieldset>

          <label>
            <span className="block mb-1">Location of the job - Street Address:</span>
            <input
              type="text"
              name="streetAddress"
              value={formData.streetAddress}
              onChange={handleChange}
              className={inputClassName}
              required
            />
          </label>

          <label>
            <span className="block mb-1">City & ZIP Code:</span>
            <input
              type="text"
              name="cityZip"
              value={formData.cityZip}
              onChange={handleChange}
              className={inputClassName}
              required
            />
          </label>

          <fieldset>
            <legend className="mb-1 font-semibold">Is there easy access to the area?</legend>
            <label className="mr-4">
              <input
                type="radio"
                name="easyAccess"
                value="Yes"
                checked={formData.easyAccess === 'Yes'}
                onChange={handleChange}
                className="mr-1"
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="easyAccess"
                value="No"
                checked={formData.easyAccess === 'No'}
                onChange={handleChange}
                className="mr-1"
              />
              No (please explain)
            </label>
            {formData.easyAccess === 'No' && (
              <textarea
                name="accessExplanation"
                value={formData.accessExplanation}
                onChange={handleChange}
                rows={3}
                placeholder="Please explain"
                className={`${inputClassName} mt-1`}
                required
              />
            )}
          </fieldset>

          <fieldset>
            <legend className="mb-1 font-semibold">How would you like us to follow up?</legend>

            <label>
              <span className="block mb-1">Name:</span>
              <input
                type="text"
                name="preferredContactName"
                value={formData.preferredContactName}
                onChange={handleChange}
                className={inputClassName}
              />
            </label>

            <label>
              <span className="block mb-1">Phone number:</span>
              <input
                type="tel"
                name="preferredContactPhone"
                value={formData.preferredContactPhone}
                onChange={handleChange}
                className={inputClassName}
              />
            </label>

            <label>
              <span className="block mb-1">Email address:</span>
              <input
                type="email"
                name="preferredContactEmail"
                value={formData.preferredContactEmail}
                onChange={handleChange}
                className={inputClassName}
              />
            </label>

            <label>
              <span className="block mb-1">Preferred time to contact you:</span>
              <input
                type="text"
                name="preferredContactTime"
                value={formData.preferredContactTime}
                onChange={handleChange}
                className={inputClassName}
              />
            </label>
          </fieldset>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition"
          >
            Send Message
          </button>
        </form>
        {status && <p className="mt-4 text-center text-green-300">{status}</p>}
      </div>
    </div>
  );
};

export default Handyman;
