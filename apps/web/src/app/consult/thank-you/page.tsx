import Link from 'next/link';

export default function ConsultationThankYou() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-fb-lilac-soft/30 to-white">
      <section className="max-w-3xl mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-16">
        <div className="bg-white/80 backdrop-blur-sm border border-white rounded-2xl p-8 md:p-10 text-center shadow-sm">
          <p className="text-[10px] tracking-widest uppercase text-fb-text-muted mb-3">
            Institute
          </p>
          <h1 className="font-serif text-3xl md:text-4xl mb-4">Thank You</h1>
          <p className="text-sm md:text-base text-fb-text-muted leading-relaxed max-w-xl mx-auto mb-8">
            Thank you for your consultation request. One of our medical care team
            will be in touch.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/consult" className="fb-button w-full sm:w-auto">
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
