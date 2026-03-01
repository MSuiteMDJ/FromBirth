'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

  return (
    <section className="fb-hero">
      <div className="fb-hero-text">
        <h1 className="fb-hero-h1">Science Meets Luxury.</h1>
        <p>
          A regenerative-inspired skincare collection developed with laboratory 
          precision and presented with couture restraint.
        </p>
        <Link href="/collections" className="fb-btn-primary">
          Discover the Collection
        </Link>
      </div>

      <div className="flex items-center justify-center flex-1 mt-8 md:mt-0">
        <div className="fb-hero-image w-40 h-56 md:w-56 md:h-72 lg:w-64 lg:h-96 rounded-lg overflow-hidden">
          <Image
            src={`${basePath}/FB_Mask.png`}
            alt="FROM BIRTH Stem Cell Treatment Mask"
            width={256}
            height={384}
            priority
            sizes="(max-width: 768px) 160px, (max-width: 1024px) 224px, 256px"
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
          />
        </div>
      </div>
    </section>
  );
}
