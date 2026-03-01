'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface LayoutProps {
  children: React.ReactNode;
  showAnnouncement?: boolean;
  announcementText?: string;
  basketCount?: number;
  onBasketClick?: () => void;
  accountHref?: string;
  accountLabel?: string;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  showAnnouncement = true,
  announcementText = 'Private Release — Spring 2026',
  basketCount = 0,
  onBasketClick,
  accountHref = '/login?redirect=/account',
  accountLabel = 'Login',
}) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header
        basketCount={basketCount}
        onBasketClick={onBasketClick}
        accountHref={accountHref}
        accountLabel={accountLabel}
      />
      {showAnnouncement && (
        <div className="fb-announcement">
          {announcementText}
        </div>
      )}
      <main className="flex-grow pt-20 md:pt-[125px] lg:pt-[125px]">
        {children}
      </main>
      <Footer />
    </div>
  );
};

interface HeaderProps {
  basketCount: number;
  onBasketClick?: () => void;
  accountHref: string;
  accountLabel: string;
}

const Header: React.FC<HeaderProps> = ({
  basketCount,
  onBasketClick,
  accountHref,
  accountLabel,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Collection', href: '/collections' },
    { label: 'Science', href: '/science' },
    { label: 'Craft', href: '/craft' },
    { label: 'Institute', href: '/consult' },
  ];

  return (
    <header className="fb-header">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 border-2 border-fb-lilac-mid rounded-full flex items-center justify-center">
          <span className="text-fb-lilac-dark font-bold text-sm">FB</span>
        </div>
        <h1 className="text-lg md:text-xl font-light tracking-widest uppercase">From Birth</h1>
      </div>
      
      {/* Desktop Navigation */}
      <nav className="hidden md:flex gap-[34px]">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="fb-nav-link"
          >
            {item.label}
          </Link>
        ))}
        <Link href={accountHref} className="fb-nav-link">
          {accountLabel}
        </Link>
      </nav>

      <div className="flex items-center gap-3">
        <button
          onClick={onBasketClick}
          className="hidden md:flex items-center gap-2 border border-gray-200 px-3 py-1.5 rounded-full text-[10px] tracking-widest uppercase"
          aria-label="Open basket"
        >
          <span>Basket</span>
          <span className="min-w-5 h-5 px-1 rounded-full bg-black text-white text-[10px] leading-5 text-center">
            {basketCount}
          </span>
        </button>

      {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5"
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-fb-text-dark transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-fb-text-dark transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-fb-text-dark transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <nav className="absolute top-[85px] left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 md:hidden z-[999]">
          <div className="flex flex-col py-3 px-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="py-2.5 text-sm tracking-widest uppercase border-b border-gray-100 transition-colors hover:text-fb-lilac-dark text-fb-text-dark"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href={accountHref}
              className="py-2.5 text-sm tracking-widest uppercase border-b border-gray-100 transition-colors hover:text-fb-lilac-dark text-fb-text-dark"
              onClick={() => setIsMenuOpen(false)}
            >
              {accountLabel}
            </Link>
            <button
              className="py-2.5 text-sm tracking-widest uppercase text-left text-fb-text-dark hover:text-fb-lilac-dark flex items-center justify-between"
              onClick={() => {
                setIsMenuOpen(false);
                onBasketClick?.();
              }}
            >
              <span>Basket</span>
              <span className="text-xs text-fb-text-muted">{basketCount}</span>
            </button>
          </div>
        </nav>
      )}
    </header>
  );
};

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-gray-200 bg-white/50 backdrop-blur-sm py-12">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-12">
          <div>
            <h4 className="text-xs font-semibold tracking-widest uppercase mb-4">Boutique</h4>
            <ul className="space-y-2 text-sm text-fb-text-muted">
              <li><Link href="/collections" className="hover:text-fb-lilac-dark transition">Shop</Link></li>
              <li><Link href="/science" className="hover:text-fb-lilac-dark transition">Science</Link></li>
              <li><Link href="/craft" className="hover:text-fb-lilac-dark transition">Craft</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-semibold tracking-widest uppercase mb-4">Institute</h4>
            <ul className="space-y-2 text-sm text-fb-text-muted">
              <li><Link href="/consult" className="hover:text-fb-lilac-dark transition">Consultations</Link></li>
              <li><Link href="/protocols" className="hover:text-fb-lilac-dark transition">Protocols</Link></li>
              <li><Link href="/faq" className="hover:text-fb-lilac-dark transition">FAQ</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-semibold tracking-widest uppercase mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-fb-text-muted">
              <li><a href="#" className="hover:text-fb-lilac-dark transition">Contact</a></li>
              <li><a href="#" className="hover:text-fb-lilac-dark transition">Shipping</a></li>
              <li><a href="#" className="hover:text-fb-lilac-dark transition">Returns</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-semibold tracking-widest uppercase mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-fb-text-muted">
              <li><a href="#" className="hover:text-fb-lilac-dark transition">Privacy</a></li>
              <li><a href="#" className="hover:text-fb-lilac-dark transition">Terms</a></li>
              <li><a href="#" className="hover:text-fb-lilac-dark transition">Disclaimer</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-200 pt-8 text-center">
          <p className="text-xs text-fb-text-muted tracking-widest uppercase">
            © 2026 FROM BIRTH. All rights reserved. | Privacy Policy | Terms of Service
          </p>
        </div>
      </div>
    </footer>
  );
};
