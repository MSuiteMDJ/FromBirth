import type { Metadata, Viewport } from 'next';
import { SiteShell } from '@/components/SiteShell';
import '../styles/globals.css';

export const metadata: Metadata = {
  title: 'FROM BIRTH | Luxury Skincare & Regenerative Therapies',
  description: 'Science Meets Luxury. A regenerative-inspired skincare collection developed with laboratory precision and presented with couture restraint.',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SiteShell>
          {children}
        </SiteShell>
      </body>
    </html>
  );
}
