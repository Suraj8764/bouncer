'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function BottomNav() {
  const pathname = usePathname();

  // Hide on admin routes
  if (pathname.startsWith('/admin')) {
    return null;
  }

  const isHome = pathname === '/';
  const isBouncers = pathname.startsWith('/bouncers');
  const isBook = pathname === '/book';
  const isStatus = pathname.startsWith('/status') || pathname.startsWith('/booking-success');

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-surface-container-lowest/90 backdrop-blur-2xl border-t border-outline-variant/30 shadow-[0_-4px_24px_rgba(0,0,0,0.85)] pb-[env(safe-area-inset-bottom)]">
      <div className="h-16 px-3 flex items-center justify-around max-w-md mx-auto">
        
        {/* Home Tab */}
        <Link
          href="/"
          className={`flex flex-col items-center justify-center min-w-[54px] py-1 transition-all ${
            isHome ? 'text-primary scale-105' : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          <span className="material-symbols-outlined text-[22px]" style={{ fontVariationSettings: isHome ? "'FILL' 1" : "'FILL' 0" }}>
            shield_with_house
          </span>
          <span className={`font-label-sm text-[10px] tracking-wider mt-0.5 ${isHome ? 'font-bold text-primary' : 'text-outline'}`}>
            Home
          </span>
          <span className={`w-1 h-1 rounded-full bg-primary mt-0.5 transition-opacity ${isHome ? 'opacity-100' : 'opacity-0'}`} />
        </Link>

        {/* Bouncers Tab */}
        <Link
          href="/bouncers"
          className={`flex flex-col items-center justify-center min-w-[54px] py-1 transition-all ${
            isBouncers ? 'text-primary scale-105' : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          <span className="material-symbols-outlined text-[22px]" style={{ fontVariationSettings: isBouncers ? "'FILL' 1" : "'FILL' 0" }}>
            badge
          </span>
          <span className={`font-label-sm text-[10px] tracking-wider mt-0.5 ${isBouncers ? 'font-bold text-primary' : 'text-outline'}`}>
            Bouncers
          </span>
          <span className={`w-1 h-1 rounded-full bg-primary mt-0.5 transition-opacity ${isBouncers ? 'opacity-100' : 'opacity-0'}`} />
        </Link>

        {/* Middle Elevated Book Button */}
        <Link
          href="/book"
          className="flex flex-col items-center justify-center -mt-5 relative group"
        >
          <div className="w-14 h-14 rounded-2xl bg-primary text-on-primary flex items-center justify-center shadow-[0_4px_24px_rgba(226,178,88,0.45)] ring-4 ring-surface-container-lowest active:scale-95 transition-all vengeance-btn border border-primary/40">
            <span className="material-symbols-outlined text-[26px]">add_moderator</span>
          </div>
          <span className={`font-label-sm text-[10px] tracking-wider mt-1 ${isBook ? 'font-bold text-primary' : 'text-outline'}`}>
            Book
          </span>
        </Link>

        {/* Status Tracker Tab */}
        <Link
          href="/status"
          className={`flex flex-col items-center justify-center min-w-[54px] py-1 transition-all ${
            isStatus ? 'text-primary scale-105' : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          <span className="material-symbols-outlined text-[22px]">radar</span>
          <span className={`font-label-sm text-[10px] tracking-wider mt-0.5 ${isStatus ? 'font-bold text-primary' : 'text-outline'}`}>
            Status
          </span>
          <span className={`w-1 h-1 rounded-full bg-primary mt-0.5 transition-opacity ${isStatus ? 'opacity-100' : 'opacity-0'}`} />
        </Link>

        {/* 24/7 Hotline Support */}
        <a
          href="tel:91800268623"
          className="flex flex-col items-center justify-center min-w-[54px] py-1 text-on-surface-variant hover:text-primary transition-all active:scale-95"
        >
          <span className="material-symbols-outlined text-[22px]">support_agent</span>
          <span className="font-label-sm text-[10px] tracking-wider mt-0.5 text-outline">
            Hotline
          </span>
          <span className="w-1 h-1 rounded-full bg-transparent mt-0.5 opacity-0" />
        </a>

      </div>
    </nav>
  );
}
