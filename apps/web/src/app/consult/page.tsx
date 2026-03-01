'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MedicalConsultationForm } from '@medical/forms/ConsultationForm';
import { consultationAPI } from '@/lib/api';

export default function Consult() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleConsultationSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      const response = await consultationAPI.submit(data);
      if (response.success) {
        router.push('/consult/thank-you');
      } else {
        throw new Error(response.error || 'Failed to submit consultation');
      }
    } catch (error) {
      console.error('❌ Error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <section className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8 consult-shell">
        <div className="grid lg:grid-cols-[320px_1fr] gap-6 lg:gap-10 items-start">
          <aside className="consult-panel">
            <p className="text-[10px] tracking-widest uppercase text-fb-text mb-3">
              Institute
            </p>
            <h1 className="text-2xl md:text-3xl font-bold tracking-widest uppercase leading-tight mb-4">
              Request a Private Medical Consultation
            </h1>
            <p className="text-sm text-fb-text leading-relaxed mb-4">
              Begin with pre-consultation screening, then submit clinical details
              for a doctor-led review by our regenerative medicine team.
            </p>
            <div className="space-y-3 text-xs text-fb-text leading-relaxed">
              <p>Step 1: pre-screening and bloodwork status.</p>
              <p>Step 2: booking details and medical intake.</p>
              <p>Response window: within 24 hours.</p>
              <p>All health data handled with strict confidentiality.</p>
              <p>Investigational therapy disclaimer applies.</p>
            </div>
          </aside>

          <div className="consult-form-wrap">
            <MedicalConsultationForm
              onSubmit={handleConsultationSubmit}
              isLoading={isLoading}
            />
          </div>
        </div>

        <footer className="mt-12 md:mt-16 border-t border-gray-100 pt-8 md:pt-10">
          <p className="text-[9px] leading-relaxed text-gray-500 uppercase tracking-tight max-w-3xl">
            * Mesenchymal Stem Cell (MSC) therapy is provided under clinical
            investigation protocols. FROM BIRTH does not claim to cure or treat
            chronic diseases. Consultation and physician review are required to
            determine eligibility for any cellular pathway.
          </p>
        </footer>
      </section>
    </div>
  );
}
