import Link from 'next/link';

export default function ConsultationThankYou() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-fb-lilac-soft/30 to-white">
      <section className="max-w-3xl mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-16">
        <div className="bg-white/85 backdrop-blur-sm border border-white rounded-2xl p-10 md:p-14 text-center shadow-sm">
          <p className="text-[10px] tracking-widest uppercase text-fb-text mb-3">
            Institute
          </p>
          <div className="mb-8">
            <svg
              className="w-12 h-12 mx-auto text-fb-lilac-mid"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-widest uppercase mb-4">Request Logged</h1>
          <p className="text-xs md:text-sm text-fb-text leading-relaxed tracking-wider max-w-md mx-auto mb-10">
            Your clinical profile has been encrypted and sent to our medical care
            team. Expect a discreet response within 24 hours.
          </p>

          <div className="mb-10">
            <hr className="w-12 mx-auto border-gray-200 mb-6" />
            <p className="text-[10px] uppercase tracking-[0.2em] text-fb-lilac-dark">
              Priority ID: FB-PRV-2026
            </p>
          </div>

          <p className="text-sm md:text-base text-fb-text leading-relaxed max-w-xl mx-auto mb-8">
            Thank you for your consultation request. One of our medical care team
            will be in touch.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/consult" className="fb-btn-primary w-full sm:w-auto">
              Back to Institute
            </Link>
            <Link
              href="/account"
              className="inline-block px-9 py-[14px] rounded-full text-xs font-medium tracking-widest uppercase border border-black transition-all duration-300 hover:bg-black hover:text-white w-full sm:w-auto"
            >
              My Account
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
