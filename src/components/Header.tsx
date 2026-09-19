'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

interface HeaderProps {
  title?: string;
  showBack?: boolean;
  backHref?: string;
}

export default function Header({ title, showBack = false, backHref }: HeaderProps) {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-surface-container-lowest/90 backdrop-blur-2xl border-b border-outline-variant/30 shadow-[0_4px_30px_rgba(0,0,0,0.7)] transition-all">
      <div className="h-20 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 flex items-center justify-between gap-3 sm:gap-6">
        
        {/* Left: Brand Logo or Back Navigation */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0 min-w-0">
          {showBack ? (
            <div className="flex items-center gap-3">
              <Link
                href={backHref || '/'}
                aria-label="Go Back"
                className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center rounded-xl bg-surface-container-high/90 text-on-surface hover:text-primary hover:bg-surface-container-highest active:scale-95 transition-all border border-white/10 shadow-sm"
              >
                <span className="material-symbols-outlined text-[20px] sm:text-[22px]">arrow_back</span>
              </Link>
              {title ? (
                <div className="flex flex-col min-w-0">
                  <h1 className="font-headline-sm text-base sm:text-lg text-on-surface truncate uppercase tracking-tight font-bold">
                    {title}
                  </h1>
                  <span className="font-label-sm text-[10px] text-outline tracking-widest uppercase">
                    Tactical Operations
                  </span>
                </div>
              ) : null}
            </div>
          ) : (
            <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group">
              <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl overflow-hidden border border-primary/40 shadow-[0_2px_12px_rgba(226,178,88,0.25)] shrink-0 bg-surface-container-lowest group-hover:border-primary transition-all">
                <Image
                  src="/icons/icon-192x192.png"
                  alt="BOUNCE Mobile App Logo"
                  width={40}
                  height={40}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  priority
                />
              </div>
              <div className="flex flex-col">
                <span className="font-headline-md text-base sm:text-lg text-primary tracking-tight leading-none uppercase font-bold">
                  BOUNCE
                </span>
                <span className="font-label-sm text-[10px] text-outline tracking-widest uppercase mt-0.5">
                  Elite Protection
                </span>
              </div>
            </Link>
          )}
        </div>

        {/* Center: Desktop Navigation Links (Spacious and Premium) */}
        <nav className="hidden lg:flex items-center gap-1.5 p-1.5 bg-surface-container-low/70 rounded-2xl border border-outline-variant/30 backdrop-blur-md shadow-inner">
          <Link
            href="/"
            className={`px-4 py-2 rounded-xl font-label-md text-label-md transition-all ${
              pathname === '/'
                ? 'text-primary font-bold bg-surface-container-high shadow-[0_2px_8px_rgba(0,0,0,0.4)] border border-primary/20'
                : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container/60'
            }`}
          >
            Home
          </Link>
          <Link
            href="/bouncers"
            className={`px-4 py-2 rounded-xl font-label-md text-label-md transition-all ${
              pathname.startsWith('/bouncers')
                ? 'text-primary font-bold bg-surface-container-high shadow-[0_2px_8px_rgba(0,0,0,0.4)] border border-primary/20'
                : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container/60'
            }`}
          >
            Available Bouncers
          </Link>
          <Link
            href="/status"
            className={`px-4 py-2 rounded-xl font-label-md text-label-md transition-all ${
              pathname === '/status'
                ? 'text-primary font-bold bg-surface-container-high shadow-[0_2px_8px_rgba(0,0,0,0.4)] border border-primary/20'
                : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container/60'
            }`}
          >
            Check Status
          </Link>
        </nav>

        {/* Right: Actions, 24/7 Hotline, Book CTA & Customer Profile */}
        <div className="flex items-center gap-2 sm:gap-3 md:gap-4 shrink-0">
          
          {/* Hotline (Hidden on narrow mobile) */}
          <div className="hidden sm:flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-surface-container-low/80 border border-outline-variant/40 shadow-inner hover:border-primary/30 transition-all">
            <span className="material-symbols-outlined text-primary text-[20px]">shield</span>
            <div className="flex flex-col text-right">
              <span className="font-label-sm text-[9px] text-outline tracking-wider uppercase leading-tight">
                24/7 Hotline
              </span>
              <a
                href="tel:91800268623"
                className="font-label-md text-label-md text-on-surface hover:text-primary font-semibold tracking-tight transition-colors leading-tight"
              >
                +91 800-BOUNCE
              </a>
            </div>
          </div>

          {/* Quick Call Icon (Visible on small mobile only) */}
          <a
            href="tel:91800268623"
            title="Call 24/7 Dispatch Hotline"
            className="sm:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-surface-container-high text-primary border border-white/10 active:scale-95 transition-all shadow-sm"
          >
            <span className="material-symbols-outlined text-[20px]">call</span>
          </a>

          {/* Book Bouncer CTA Button */}
          <Link
            href="/book"
            className="inline-flex items-center justify-center gap-1.5 px-3 sm:px-5 py-2.5 rounded-xl bg-primary text-on-primary font-label-md sm:font-label-lg text-sm sm:text-base font-bold hover:bg-primary-fixed transition-all duration-150 active:scale-95 shadow-[0_4px_20px_rgba(226,178,88,0.35)] border border-primary/40 vengeance-btn"
          >
            <span className="material-symbols-outlined text-[18px] sm:text-[20px]">add_moderator</span>
            <span className="hidden xs:inline sm:inline">Book Bouncer</span>
            <span className="inline xs:hidden sm:hidden">Book</span>
          </Link>

          {/* Customer Profile & Booking Tracker (Direct to /status) */}
          <Link
            href="/status"
            title="Track My Booking & Customer Profile"
            className="relative flex items-center pl-2 sm:pl-3 border-l border-outline-variant/30 group"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-surface-container-high flex items-center justify-center ring-1 ring-primary/40 group-hover:ring-primary group-hover:bg-surface-container-highest transition-all shadow-sm">
              <span className="material-symbols-outlined text-[18px] sm:text-[20px] text-primary">person</span>
            </div>
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-surface-container-lowest animate-pulse"></span>
          </Link>

        </div>

      </div>

      {/* Subtle bottom ambient gold scanline */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent pointer-events-none"></div>
    </header>
  );
}
