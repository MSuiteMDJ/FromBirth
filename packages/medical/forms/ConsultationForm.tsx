'use client';

import React, { useState } from 'react';

export interface ConsultationFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  medicalHistory: string;
  allergies: string;
  medications: string;
  treatmentInterest: string;
  termsAccepted: boolean;
  privacyAccepted: boolean;
}

interface MedicalConsultationFormProps {
  onSubmit?: (data: ConsultationFormData) => Promise<void>;
  isLoading?: boolean;
}

export const MedicalConsultationForm: React.FC<MedicalConsultationFormProps> = ({
  onSubmit,
  isLoading = false,
}) => {
  const [formData, setFormData] = useState<ConsultationFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    medicalHistory: '',
    allergies: '',
    medications: '',
    treatmentInterest: '',
    termsAccepted: false,
    privacyAccepted: false,
  });

  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (!formData.firstName || !formData.lastName || !formData.email) {
      setError('Please fill in all required fields');
      return;
    }

    if (!formData.termsAccepted || !formData.privacyAccepted) {
      setError('Please accept the terms and privacy policy');
      return;
    }

    try {
      if (onSubmit) {
        await onSubmit(formData);
      }
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        dateOfBirth: '',
        medicalHistory: '',
        allergies: '',
        medications: '',
        treatmentInterest: '',
        termsAccepted: false,
        privacyAccepted: false,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    }
  };

  return (
    <div className="max-w-none mx-auto py-4 md:py-6 lg:py-8">
      <div className="mb-4 md:mb-6">
        <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl mb-2 md:mb-3">Consultation Intake</h2>
        <p className="text-sm md:text-base text-fb-text-muted leading-relaxed">
          Schedule a confidential consultation with our medical team to discuss 
          regenerative therapy options tailored to your health goals.
        </p>
      </div>

      {error && (
        <div className="mb-4 md:mb-6 p-3 md:p-4 bg-red-50 border border-red-200 rounded">
          <p className="text-red-800 text-xs md:text-sm">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
        {/* Personal Information */}
        <fieldset className="border-b border-gray-200 pb-4 md:pb-6">
          <legend className="text-xs md:text-sm font-semibold tracking-widest uppercase mb-3 md:mb-4">
            Personal Information
          </legend>

          <div className="grid grid-cols-2 gap-3 md:gap-4 mb-3 md:mb-4">
            <div>
              <label className="block text-xs md:text-sm font-medium mb-1 md:mb-2">
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full px-3 md:px-4 py-1.5 md:py-2 text-sm border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-fb-lilac-mid"
                required
              />
            </div>
            <div>
              <label className="block text-xs md:text-sm font-medium mb-1 md:mb-2">
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full px-3 md:px-4 py-1.5 md:py-2 text-sm border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-fb-lilac-mid"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 md:gap-4 mb-3 md:mb-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-fb-lilac-mid"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Phone
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-fb-lilac-mid"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Date of Birth
            </label>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-fb-lilac-mid"
            />
          </div>
        </fieldset>

        {/* Medical History */}
        <fieldset className="border-b border-gray-200 pb-8">
          <legend className="text-sm font-semibold letter-spacing uppercase mb-6">
            Medical History
          </legend>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">
              Medical History & Conditions
            </label>
            <textarea
              name="medicalHistory"
              value={formData.medicalHistory}
              onChange={handleChange}
              rows={4}
              placeholder="Please describe any relevant medical conditions, surgeries, or chronic illnesses..."
              className="w-full px-4 py-2 border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-fb-lilac-mid"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">
              Allergies & Sensitivities
            </label>
            <input
              type="text"
              name="allergies"
              value={formData.allergies}
              onChange={handleChange}
              placeholder="Any known allergies or sensitivities..."
              className="w-full px-4 py-2 border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-fb-lilac-mid"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Current Medications
            </label>
            <textarea
              name="medications"
              value={formData.medications}
              onChange={handleChange}
              rows={3}
              placeholder="List any medications you are currently taking..."
              className="w-full px-4 py-2 border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-fb-lilac-mid"
            />
          </div>
        </fieldset>

        {/* Treatment Interest */}
        <fieldset className="border-b border-gray-200 pb-8">
          <legend className="text-sm font-semibold letter-spacing uppercase mb-6">
            Treatment Interest
          </legend>

          <div>
            <label className="block text-sm font-medium mb-2">
              Which therapy are you interested in?
            </label>
            <select
              name="treatmentInterest"
              value={formData.treatmentInterest}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-fb-lilac-mid"
            >
              <option value="">Select an option</option>
              <option value="msc">Mesenchymal Stem Cell (MSC) Therapy</option>
              <option value="exosome">Exosome Treatment</option>
              <option value="combination">Combination Protocol</option>
              <option value="unsure">Not sure yet</option>
            </select>
          </div>
        </fieldset>

        {/* Legal Disclaimers */}
        <fieldset className="border-b border-gray-200 pb-8">
          <legend className="text-sm font-semibold letter-spacing uppercase mb-6">
            Legal & Privacy
          </legend>

          <div className="space-y-4">
            <div className="bg-fb-lilac-soft p-4 rounded border border-fb-lilac-light">
              <h4 className="text-sm font-semibold mb-3">Medical Disclaimer</h4>
              <p className="text-xs text-fb-text-muted leading-relaxed mb-3">
                Mesenchymal Stem Cell (MSC) therapy is an investigational treatment. The statements made 
                on this website have not been evaluated by the FDA. These therapies are not intended to 
                diagnose, treat, cure, or prevent any disease. Results may vary by individual. Consultation 
                with a licensed physician is required before treatment.
              </p>
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="termsAccepted"
                  checked={formData.termsAccepted}
                  onChange={handleChange}
                  className="mt-1"
                />
                <span className="text-xs">
                  I acknowledge that I have read and understand the medical disclaimer and agree to proceed.
                </span>
              </label>
            </div>

            <div className="bg-blue-50 p-4 rounded border border-blue-200">
              <h4 className="text-sm font-semibold mb-3">Privacy & Data Protection</h4>
              <p className="text-xs text-fb-text-muted leading-relaxed mb-3">
                Your medical information will be handled with strict confidentiality in accordance with 
                HIPAA regulations and our privacy policy. Your data will only be shared with licensed medical 
                professionals necessary for your care.
              </p>
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="privacyAccepted"
                  checked={formData.privacyAccepted}
                  onChange={handleChange}
                  className="mt-1"
                />
                <span className="text-xs">
                  I accept the privacy policy and consent to the collection and use of my medical data 
                  for consultation purposes.
                </span>
              </label>
            </div>
          </div>
        </fieldset>

        {/* Submit Button */}
        <div className="pt-8">
          <button
            type="submit"
            disabled={isLoading}
            className="fb-button w-full justify-center"
          >
            {isLoading ? 'Submitting...' : 'Request Consultation'}
          </button>
          <p className="text-xs text-fb-text-muted text-center mt-4">
            Our team will review your information and contact you within 24 hours to schedule your consultation.
          </p>
        </div>
      </form>
    </div>
  );
};
