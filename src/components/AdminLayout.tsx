'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

interface AdminLayoutProps {
  children: React.ReactNode;
  activeNav?: 'dashboard' | 'bouncers' | 'bookings' | 'audit';
}

export default function AdminLayout({ children, activeNav = 'dashboard' }: AdminLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    // Check if auth cookie or storage exists
    const hasAuthCookie = document.cookie.includes('bounce_admin_auth=');
    const hasLocalStorage = localStorage.getItem('bounce_admin_logged_in') === 'true';

    if (!hasAuthCookie && !hasLocalStorage) {
      router.push(`/admin/login?redirect=${encodeURIComponent(pathname)}`);
    } else {
      setAuthenticated(true);
    }
  }, [pathname, router]);

  const handleSignOut = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
    } catch (e) {
      console.error('Logout error:', e);
    }
    localStorage.removeItem('bounce_admin_logged_in');
    document.cookie = 'bounce_admin_auth=; Max-Age=0; path=/;';
    router.push('/admin/login');
  };

  if (authenticated === null) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background text-on-surface">
        <span className="material-symbols-outlined text-primary text-[40px] animate-spin mb-3">
          admin_panel_settings
        </span>
        <p className="font-label-md uppercase tracking-widest text-outline">
          Verifying Tactical Clearance...
        </p>
      </div>
    );
  }

  return (
    <div className="bg-background font-body-md text-on-surface antialiased selection:bg-primary-container selection:text-on-primary-container min-h-screen flex flex-col">
      {/* Top Fixed Command Console Header */}
      <header className="fixed top-0 left-0 w-full z-50 bg-surface-container-lowest/95 backdrop-blur-xl border-b border-outline-variant/30 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.85)]">
        <div className="h-20 w-full px-4 sm:px-6 md:px-8 flex items-center justify-between gap-space-md">
          <div className="flex items-center gap-space-lg">
            <Link href="/admin" className="flex items-center gap-space-sm shrink-0">
              <svg className="h-8 w-auto object-contain text-primary" viewBox="0 0 160 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 8L28 8C36 8 40 12 40 18C40 22 37 24.5 33 26C38 27.5 42 30.5 42 36C42 42 36 46 27 46L12 46L12 8Z" stroke="#E2B258" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                <path d="M12 26L26 26" stroke="#E2B258" strokeWidth="3" strokeLinecap="round"/>
                <polygon points="21,15 25,18 21,21" fill="#E2B258"/>
                <polygon points="21,33 25,36 21,39" fill="#E2B258"/>
                <text x="54" y="32" fontFamily="var(--font-syne), system-ui, sans-serif" fontWeight="800" fontSize="22" letterSpacing="4.5" fill="#FFFFFF">BOUNCE</text>
                <circle cx="150" cy="27" r="3" fill="#E2B258"/>
              </svg>
              <div className="hidden sm:flex flex-col">
                <span className="font-headline-md text-headline-md text-primary tracking-tight leading-none uppercase">
                  BOUNCE
                </span>
                <span className="font-label-sm text-label-sm text-outline tracking-widest uppercase">
                  Command Console
                </span>
              </div>
            </Link>

            <div className="hidden md:flex items-center gap-space-xs text-outline font-label-md text-label-md border-l border-outline-variant/30 pl-space-md">
              <span className="hover:text-on-surface transition-colors cursor-pointer">Admin</span>
              <span className="material-symbols-outlined text-[14px] text-outline">chevron_right</span>
              <span className="text-primary font-semibold capitalize">{activeNav}</span>
            </div>
          </div>

          {/* Desktop Top Links */}
          <nav className="hidden xl:flex items-center gap-space-xs px-space-xs py-space-xs bg-surface-container-low/60 rounded-xl border border-outline-variant/20">
            <Link
              href="/admin"
              className={`px-space-md py-space-sm rounded-lg font-label-md text-label-md transition-colors ${
                pathname === '/admin'
                  ? 'text-primary font-semibold bg-surface-container-high'
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
              }`}
            >
              Dashboard
            </Link>
            <Link
              href="/admin/bouncers"
              className={`px-space-md py-space-sm rounded-lg font-label-md text-label-md transition-colors ${
                pathname === '/admin/bouncers'
                  ? 'text-primary font-semibold bg-surface-container-high'
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
              }`}
            >
              Personnel Roster
            </Link>
            <Link
              href="/admin/bookings"
              className={`px-space-md py-space-sm rounded-lg font-label-md text-label-md transition-colors ${
                pathname === '/admin/bookings'
                  ? 'text-primary font-semibold bg-surface-container-high'
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
              }`}
            >
              Dispatch Requisitions
            </Link>
            <Link
              href="/"
              className="px-space-md py-space-sm rounded-lg font-label-md text-label-md text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors"
            >
              Client Site
            </Link>
          </nav>

          <div className="flex items-center gap-space-sm md:gap-space-md shrink-0">
            <div className="hidden sm:flex items-center gap-space-xs px-space-sm py-space-xs rounded-full bg-emerald-500/10 border border-emerald-500/30">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="font-label-sm text-label-sm text-emerald-300 font-semibold tracking-wider uppercase">Sentinel Active</span>
            </div>

            <div className="hidden lg:flex items-center gap-space-xs px-space-md py-space-xs rounded-xl bg-surface-container-low border border-outline-variant/40">
              <span className="material-symbols-outlined text-primary text-[18px]">phone_in_talk</span>
              <div className="flex flex-col text-right">
                <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">Hotline</span>
                <a className="font-label-md text-label-md text-on-surface hover:text-primary font-semibold transition-colors" href="tel:91800268623">
                  +91 800-BOUNCE
                </a>
              </div>
            </div>

            <div className="flex items-center gap-space-xs px-space-sm py-space-xs rounded-xl bg-surface-container-high border border-outline-variant/30">
              <div className="relative">
                <div className="w-8 h-8 rounded-full bg-surface-container-lowest flex items-center justify-center ring-1 ring-primary/60">
                  <span className="material-symbols-outlined text-[18px] text-primary">person</span>
                </div>
                <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-surface-container-high"></span>
              </div>
              <div className="hidden md:flex flex-col text-left">
                <span className="font-label-md text-label-md text-on-surface font-semibold leading-tight">Cmdr. Vance Cole</span>
                <span className="font-label-sm text-[10px] text-primary tracking-wider uppercase">Chief Dispatch</span>
              </div>
              <button
                onClick={handleSignOut}
                className="ml-space-xs p-1 text-on-surface-variant hover:text-rose-400 transition-colors"
                title="Sign Out"
              >
                <span className="material-symbols-outlined text-[20px]">logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Left Sidebar Fixed (Desktop) */}
      <aside className="fixed top-20 left-0 w-64 h-[calc(100vh-5rem)] bg-surface-container-lowest/90 backdrop-blur-xl border-r border-outline-variant/20 flex flex-col justify-between py-space-md px-space-sm z-40 hidden md:flex">
        <div className="flex flex-col gap-space-sm">
          <div className="px-space-sm py-space-xs font-label-sm text-label-sm text-outline tracking-wider uppercase">
            Command Ops
          </div>
          <nav className="flex flex-col gap-space-xs">
            <Link
              href="/admin"
              className={`flex items-center justify-between px-space-md py-space-sm rounded-lg font-label-md text-label-md transition-colors ${
                pathname === '/admin'
                  ? 'text-primary font-semibold bg-surface-container-high'
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
              }`}
            >
              <div className="flex items-center gap-space-sm">
                <span className="material-symbols-outlined text-[18px]">dashboard</span>
                <span>Dashboard</span>
              </div>
              {pathname === '/admin' && <span className="w-1.5 h-1.5 rounded-full bg-primary" />}
            </Link>

            <Link
              href="/admin/bouncers"
              className={`flex items-center justify-between px-space-md py-space-sm rounded-lg font-label-md text-label-md transition-colors ${
                pathname === '/admin/bouncers'
                  ? 'text-primary font-semibold bg-surface-container-high'
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
              }`}
            >
              <div className="flex items-center gap-space-sm">
                <span className="material-symbols-outlined text-[18px]">shield_person</span>
                <span>Tactical Roster</span>
              </div>
              <span className="px-space-xs py-0.5 rounded bg-surface-container-highest text-[10px] font-label-sm text-outline font-bold">
                Roster
              </span>
            </Link>

            <Link
              href="/admin/bookings"
              className={`flex items-center justify-between px-space-md py-space-sm rounded-lg font-label-md text-label-md transition-colors ${
                pathname === '/admin/bookings'
                  ? 'text-primary font-semibold bg-surface-container-high'
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
              }`}
            >
              <div className="flex items-center gap-space-sm">
                <span className="material-symbols-outlined text-[18px]">calendar_month</span>
                <span>Dispatch Operations</span>
              </div>
              <span className="px-space-xs py-0.5 rounded bg-primary-container/20 text-primary text-[10px] font-label-sm font-bold">
                QUEUE
              </span>
            </Link>

            <Link
              href="/status"
              className="flex items-center justify-between px-space-md py-space-sm rounded-lg font-label-md text-label-md text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors"
            >
              <div className="flex items-center gap-space-sm">
                <span className="material-symbols-outlined text-[18px]">radar</span>
                <span>Status Tracker</span>
              </div>
            </Link>
          </nav>
        </div>

        {/* DEFCON Level Badge */}
        <div className="p-space-sm rounded-xl bg-surface-container-low border border-outline-variant/30 flex flex-col gap-space-xs">
          <div className="flex items-center justify-between">
            <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">DEFCON Level</span>
            <span className="font-label-sm text-label-sm text-primary font-bold">SEC-2</span>
          </div>
          <p className="font-body-sm text-[11px] text-on-surface-variant">All armed personnel telemetry active across sectors.</p>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="w-full pt-20 md:pl-64 bg-background min-h-screen overflow-x-hidden">
        <div className="px-margin py-space-lg max-w-[1500px] mx-auto w-full">
          {children}
        </div>
      </main>
    </div>
  );
}
