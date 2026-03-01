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
    <div className="min-h-screen bg-gradient-to-b from-white via-fb-lilac-soft/30 to-white">
      <section className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8 consult-shell">
        <div className="grid lg:grid-cols-[320px_1fr] gap-6 lg:gap-10 items-start">
          <aside className="consult-panel">
            <p className="text-[10px] tracking-widest uppercase text-fb-text-muted mb-3">
              Institute
            </p>
            <h1 className="font-serif text-2xl md:text-3xl leading-tight mb-4">
              Schedule Your Medical Consultation
            </h1>
            <p className="text-sm text-fb-text-muted leading-relaxed mb-4">
              Share your treatment interests and medical context. A member of our
              medical care team will review your request and follow up with next
              steps.
            </p>
            <div className="space-y-3 text-xs text-fb-text-muted leading-relaxed">
              <p>Response window: within 24 hours.</p>
              <p>All data handled with strict medical confidentiality.</p>
              <p>FDA disclaimer applies to investigational therapies.</p>
            </div>
          </aside>

          <div className="consult-form-wrap">
            <MedicalConsultationForm
              onSubmit={handleConsultationSubmit}
              isLoading={isLoading}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
