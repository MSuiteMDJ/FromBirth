'use client';

export default function Science() {
  return (
    <div className="min-h-screen">
      <section className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8">
        <div className="mb-6 md:mb-8">
          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl mb-3 md:mb-4">The Science</h1>
          <p className="text-sm md:text-base text-fb-text-muted leading-relaxed mb-4 md:mb-6">
            FROM BIRTH formulations leverage decades of regenerative medicine research,
            combining mesenchymal stem cell (MSC) technology with botanical bioactives.
          </p>
        </div>

        <article className="space-y-4 md:space-y-6">
          <div>
            <h2 className="font-serif text-xl md:text-2xl lg:text-3xl mt-6 md:mt-8 mb-2 md:mb-3">Mesenchymal Stem Cells (MSC)</h2>
            <p className="text-sm md:text-base leading-relaxed">
              MSCs are multipotent cells capable of self-renewal and differentiation into
              various cell types. In skincare applications, they promote collagen synthesis,
              reduce inflammation, and support the skin barrier function.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl md:text-2xl lg:text-3xl mt-6 md:mt-8 mb-2 md:mb-3">Exosome Technology</h2>
            <p className="text-sm md:text-base leading-relaxed">
              Exosomes are extracellular vesicles released by stem cells containing growth
              factors, proteins, and RNA. They act as communication vehicles between cells,
              triggering regenerative pathways within the skin.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl md:text-2xl lg:text-3xl mt-6 md:mt-8 mb-2 md:mb-3">Clinical Safety</h2>
            <p className="text-sm md:text-base leading-relaxed">
              All FROM BIRTH products undergo rigorous testing for safety, efficacy, and stability.
              Our medical team ensures full compliance with regulatory standards across all markets.
            </p>
          </div>

          <div className="bg-fb-lilac-soft border-l-4 border-fb-lilac-mid p-3 md:p-4 lg:p-6 mt-6 md:mt-8 rounded-r">
            <p className="text-[12px] md:text-sm text-fb-text-muted leading-relaxed">
              <strong>Important Disclaimer:</strong> These statements have not been evaluated
              by the FDA. These products are not intended to diagnose, treat, cure, or prevent
              any disease. Consult with a licensed healthcare provider before use.
            </p>
          </div>
        </article>
      </section>
    </div>
  );
}
