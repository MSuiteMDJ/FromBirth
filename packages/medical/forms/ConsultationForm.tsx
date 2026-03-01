'use client';

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export interface ConsultationFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  preferredConsultDate: string;
  preferredConsultTime: string;
  medicalHistory: string;
  allergies: string;
  medications: string;
  treatmentInterest: string;
  clinicLocation: string;
  hasBloodWork: boolean;
  bloodWorkDate: string;
  canTravelToClinic: boolean;
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
  const [step, setStep] = useState<1 | 2>(1);
  const [formData, setFormData] = useState<ConsultationFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    preferredConsultDate: '',
    preferredConsultTime: '',
    medicalHistory: '',
    allergies: '',
    medications: '',
    treatmentInterest: 'msc',
    clinicLocation: 'Johor Clinic',
    hasBloodWork: false,
    bloodWorkDate: '',
    canTravelToClinic: false,
    termsAccepted: false,
    privacyAccepted: false,
  });

  const [bloodWorkDeclared, setBloodWorkDeclared] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputClass =
    'w-full px-0 py-2.5 text-sm bg-transparent border-0 border-b border-gray-300 rounded-none focus:outline-none focus:ring-0 focus:border-fb-lilac-mid';
  const selectClass = `${inputClass} appearance-none`;

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    if (name === 'hasBloodWork') {
      setBloodWorkDeclared(true);
      setFormData((prev) => ({
        ...prev,
        hasBloodWork: value === 'yes',
      }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const validateStepOne = () => {
    if (!formData.treatmentInterest) {
      setError('Please select a treatment interest before continuing');
      return false;
    }

    if (!bloodWorkDeclared) {
      setError(
        'Please indicate whether recent blood test results are available'
      );
      return false;
    }

    if (formData.hasBloodWork && !formData.bloodWorkDate) {
      setError('Please provide the date of your most recent blood test');
      return false;
    }

    if (!formData.canTravelToClinic) {
      setError(
        'Please confirm you understand treatment is delivered in a licensed clinical setting'
      );
      return false;
    }

    return true;
  };

  const handleContinue = () => {
    setError(null);
    if (validateStepOne()) {
      setStep(2);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.phone ||
      !formData.preferredConsultDate ||
      !formData.preferredConsultTime
    ) {
      setError('Please fill in all required personal and booking details');
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
        preferredConsultDate: '',
        preferredConsultTime: '',
        medicalHistory: '',
        allergies: '',
        medications: '',
        treatmentInterest: 'msc',
        clinicLocation: 'Johor Clinic',
        hasBloodWork: false,
        bloodWorkDate: '',
        canTravelToClinic: false,
        termsAccepted: false,
        privacyAccepted: false,
      });
      setBloodWorkDeclared(false);
      setStep(1);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    }
  };

  return (
    <div className="max-w-none mx-auto py-4 md:py-6 lg:py-8">
      <div className="mb-4 md:mb-6">
        <p className="text-[10px] tracking-widest uppercase text-fb-text-muted mb-2">
          Private Consultation
        </p>
        <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl mb-2 md:mb-3">
          Regenerative Institute Booking
        </h2>
        <p className="text-sm md:text-base text-fb-text-muted leading-relaxed">
          Complete screening first, then submit your confidential consultation
          request to our medical care team.
        </p>
      </div>

      <div className="mb-5 flex items-center gap-2 text-[10px] tracking-widest uppercase">
        <span
          className={`px-3 py-1 rounded-full border ${
            step === 1
              ? 'bg-fb-lilac-soft border-fb-lilac-mid'
              : 'bg-white border-gray-200'
          }`}
        >
          Step 1 Screening
        </span>
        <span
          className={`px-3 py-1 rounded-full border ${
            step === 2
              ? 'bg-fb-lilac-soft border-fb-lilac-mid'
              : 'bg-white border-gray-200'
          }`}
        >
          Step 2 Booking Details
        </span>
      </div>

      {error && (
        <div className="mb-4 md:mb-6 p-3 md:p-4 bg-red-50 border border-red-200 rounded">
          <p className="text-red-800 text-xs md:text-sm">{error}</p>
        </div>
      )}

      <div className="relative mb-7 pt-1">
        <div className="absolute left-0 right-0 top-[18px] h-px bg-gray-200"></div>
        <div
          className={`absolute left-0 top-[18px] h-px bg-fb-lilac-mid transition-all duration-500 ${
            step === 1 ? 'w-1/2' : 'w-full'
          }`}
        ></div>
        <div className="relative flex justify-between">
          <div className="flex items-center gap-3">
            <span
              className={`relative inline-flex h-9 w-9 items-center justify-center rounded-full border text-xs tracking-widest ${
                step === 1
                  ? 'border-fb-lilac-mid bg-fb-lilac-soft'
                  : 'border-gray-300 bg-white'
              }`}
            >
              {step === 1 && (
                <span className="absolute inset-0 rounded-full border border-fb-lilac-mid animate-pulse"></span>
              )}
              1
            </span>
            <span className="text-[10px] tracking-widest uppercase">
              Screening
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[10px] tracking-widest uppercase text-right">
              Booking
            </span>
            <span
              className={`relative inline-flex h-9 w-9 items-center justify-center rounded-full border text-xs tracking-widest ${
                step === 2
                  ? 'border-fb-lilac-mid bg-fb-lilac-soft'
                  : 'border-gray-300 bg-white'
              }`}
            >
              {step === 2 && (
                <span className="absolute inset-0 rounded-full border border-fb-lilac-mid animate-pulse"></span>
              )}
              2
            </span>
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {step === 1 ? (
          <motion.div
            key="step-1"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 30 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="space-y-6"
          >
            <p className="text-sm leading-relaxed text-center italic text-fb-text-muted">
              Regenerative therapy remains under clinical investigation. Doctor-led
              consultation helps determine suitability before any treatment
              pathway is considered.
            </p>

            <div className="bg-white p-5 md:p-6 border border-gray-200 rounded-xl">
              <h3 className="text-xs font-semibold tracking-widest uppercase mb-4">
                Initial Requirements
              </h3>
              <ul className="text-xs text-fb-text-muted space-y-3">
                <li className="flex justify-between border-b border-gray-100 pb-2">
                  <span>Clinical Setting</span>
                  <span className="font-medium">Licensed Facility</span>
                </li>
                <li className="flex justify-between border-b border-gray-100 pb-2">
                  <span>Pre-Screening</span>
                  <span className="font-medium">Blood Test Review</span>
                </li>
                <li className="flex justify-between">
                  <span>Consult Team Reply</span>
                  <span className="font-medium">Within 24 hours</span>
                </li>
              </ul>
            </div>

            <fieldset className="border border-gray-200 rounded-xl p-5 md:p-6 space-y-5 bg-white">
              <legend className="text-xs font-semibold tracking-widest uppercase px-2">
                Pre-Consultation Screening
              </legend>

              <div>
                <label className="block text-xs font-semibold tracking-widest uppercase mb-1">
                  Treatment Interest <span className="text-red-500">*</span>
                </label>
                <select
                  name="treatmentInterest"
                  value={formData.treatmentInterest}
                  onChange={handleChange}
                  className={selectClass}
                >
                  <option value="msc">Mesenchymal Stem Cell (MSC) Therapy</option>
                  <option value="exosome">Exosome Protocol</option>
                  <option value="combination">Combination Protocol</option>
                  <option value="unsure">Not Sure Yet</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold tracking-widest uppercase mb-1">
                  Preferred Consultation Location
                </label>
                <select
                  name="clinicLocation"
                  value={formData.clinicLocation}
                  onChange={handleChange}
                  className={selectClass}
                >
                  <option value="Johor Clinic">Johor Clinic</option>
                  <option value="London Consultation Room">
                    London Consultation Room
                  </option>
                  <option value="Virtual Triage">Virtual Triage</option>
                </select>
              </div>

              <fieldset>
                <legend className="block text-xs font-semibold tracking-widest uppercase mb-2">
                  Recent Blood Test Results <span className="text-red-500">*</span>
                </legend>
                <div className="flex flex-wrap gap-5">
                  <label className="inline-flex items-center gap-2 text-sm">
                    <input
                      type="radio"
                      name="hasBloodWork"
                      value="yes"
                      checked={bloodWorkDeclared && formData.hasBloodWork}
                      onChange={handleChange}
                    />
                    Yes, available
                  </label>
                  <label className="inline-flex items-center gap-2 text-sm">
                    <input
                      type="radio"
                      name="hasBloodWork"
                      value="no"
                      checked={bloodWorkDeclared && !formData.hasBloodWork}
                      onChange={handleChange}
                    />
                    Not yet
                  </label>
                </div>
              </fieldset>

              {bloodWorkDeclared && formData.hasBloodWork && (
                <div>
                  <label className="block text-xs font-semibold tracking-widest uppercase mb-1">
                    Blood Test Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="bloodWorkDate"
                    value={formData.bloodWorkDate}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>
              )}

              <label className="flex items-start gap-3 text-xs">
                <input
                  type="checkbox"
                  name="canTravelToClinic"
                  checked={formData.canTravelToClinic}
                  onChange={handleChange}
                  className="mt-0.5"
                />
                <span>
                  I understand investigational treatment pathways are reviewed by
                  a licensed medical team and may require attendance in a
                  regulated clinical facility.
                </span>
              </label>
            </fieldset>

            <button
              type="button"
              onClick={handleContinue}
              className="fb-button w-full justify-center"
            >
              Continue to Booking Details
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="step-2"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="space-y-5 md:space-y-6"
          >
            <fieldset className="border-b border-gray-200 pb-5 md:pb-6">
              <legend className="text-xs md:text-sm font-semibold tracking-widest uppercase mb-3 md:mb-4">
                Personal Information
              </legend>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mb-3 md:mb-4">
                <div>
                  <label className="block text-xs md:text-sm font-medium mb-1">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={inputClass}
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs md:text-sm font-medium mb-1">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={inputClass}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mb-3 md:mb-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={inputClass}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Phone <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={inputClass}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Preferred Consultation Date{' '}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="preferredConsultDate"
                    value={formData.preferredConsultDate}
                    onChange={handleChange}
                    className={inputClass}
                    required
                  />
                </div>
              </div>

              <div className="mt-3 md:mt-4">
                <label className="block text-sm font-medium mb-1">
                  Preferred Consultation Time{' '}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="time"
                  name="preferredConsultTime"
                  value={formData.preferredConsultTime}
                  onChange={handleChange}
                  className={`${inputClass} md:w-60`}
                  required
                />
              </div>
            </fieldset>

            <fieldset className="border-b border-gray-200 pb-6">
              <legend className="text-sm font-semibold tracking-widest uppercase mb-5">
                Medical History
              </legend>

              <div className="mb-5">
                <label className="block text-sm font-medium mb-1">
                  Medical History and Conditions
                </label>
                <textarea
                  name="medicalHistory"
                  value={formData.medicalHistory}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Describe relevant conditions, procedures, or chronic illnesses."
                  className={inputClass}
                />
              </div>

              <div className="mb-5">
                <label className="block text-sm font-medium mb-1">
                  Allergies and Sensitivities
                </label>
                <input
                  type="text"
                  name="allergies"
                  value={formData.allergies}
                  onChange={handleChange}
                  placeholder="Known allergies or sensitivities."
                  className={inputClass}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Current Medications
                </label>
                <textarea
                  name="medications"
                  value={formData.medications}
                  onChange={handleChange}
                  rows={3}
                  placeholder="List any medications you are currently taking."
                  className={inputClass}
                />
              </div>
            </fieldset>

            <fieldset className="border-b border-gray-200 pb-6">
              <legend className="text-sm font-semibold tracking-widest uppercase mb-5">
                Legal and Privacy
              </legend>

              <div className="space-y-4">
                <div className="bg-fb-lilac-soft p-4 rounded border border-fb-lilac-light">
                  <h4 className="text-sm font-semibold mb-3">
                    Medical Disclaimer
                  </h4>
                  <p className="text-xs text-fb-text-muted leading-relaxed mb-3">
                    Mesenchymal Stem Cell therapy is investigational.
                    Information provided by FROM BIRTH is for consultation and
                    education only and is not a guarantee of diagnosis,
                    treatment, cure, or prevention of disease.
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
                      I have read and understood the investigational medical
                      disclaimer and wish to proceed with screening.
                    </span>
                  </label>
                </div>

                <div className="bg-blue-50 p-4 rounded border border-blue-200">
                  <h4 className="text-sm font-semibold mb-3">Privacy Consent</h4>
                  <p className="text-xs text-fb-text-muted leading-relaxed mb-3">
                    Your personal and health information is collected only for
                    medical screening and consultation coordination by licensed
                    team members.
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
                      I consent to the collection and use of my personal and
                      health data for consultation purposes.
                    </span>
                  </label>
                </div>
              </div>
            </fieldset>

            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={() => {
                  setError(null);
                  setStep(1);
                }}
                className="w-full sm:w-auto px-6 py-3 text-xs tracking-widest uppercase border border-gray-300 rounded-full"
              >
                Back to Screening
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="fb-button w-full sm:flex-1 justify-center"
              >
                {isLoading ? 'Submitting...' : 'Request Consultation'}
              </button>
            </div>
            <p className="text-xs text-fb-text-muted text-center mt-1">
              One of our medical care team will review your request and contact
              you with next steps.
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
};
