'use client';

export default function Craft() {
  return (
    <div className="min-h-screen">
      <section className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8">
        <div className="mb-6 md:mb-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-widest uppercase mb-3 md:mb-4">The Craft</h1>
          <p className="text-sm md:text-base text-fb-text leading-relaxed mb-4 md:mb-6">
            Every FROM BIRTH formulation represents meticulous attention to ingredient
            sourcing, stability, and compatibility—balancing scientific rigor with sensorial luxury.
          </p>
        </div>

        <article className="prose prose-sm md:prose-base lg:prose-lg max-w-none space-y-4 md:space-y-6">
          <div>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold tracking-widest uppercase mt-6 md:mt-8 mb-2 md:mb-3">Ingredient Sourcing</h2>
            <p className="text-sm md:text-base leading-relaxed">
              We partner with leading biotech suppliers for clinical-grade stem cell derivatives
              and source botanicals from certified sustainable farms. Every batch is third-party tested.
            </p>
          </div>

          <div>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold tracking-widest uppercase mt-6 md:mt-8 mb-2 md:mb-3">Formulation Philosophy</h2>
            <p className="text-sm md:text-base leading-relaxed">
              Minimalist by design. We avoid unnecessary fillers, preservatives, and fragrance.
              Each ingredient serves a specific regenerative or protective function.
            </p>
          </div>

          <div>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold tracking-widest uppercase mt-6 md:mt-8 mb-2 md:mb-3">Packaging</h2>
            <p className="text-sm md:text-base leading-relaxed">
              Custom opaque glass and UV-protective containers ensure stability of active ingredients.
              Packaging is fully recyclable and reflects the brand's commitment to sustainability.
            </p>
          </div>

          <div>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold tracking-widest uppercase mt-6 md:mt-8 mb-2 md:mb-3">Quality Assurance</h2>
            <p className="text-sm md:text-base leading-relaxed">
              All products undergo stability testing, microbiological analysis, and efficacy validation
              before release. We maintain certificates of analysis for full transparency.
            </p>
          </div>
        </article>
      </section>
    </div>
  );
}
