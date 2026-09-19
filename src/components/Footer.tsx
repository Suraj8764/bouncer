import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="relative w-full bg-surface-container-lowest border-t border-outline-variant/20 pt-space-xl pb-space-xl text-on-surface overflow-hidden">
      {/* Ambient background tactical glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-primary/40 to-transparent"></div>
      <div className="absolute -top-24 left-1/3 w-96 h-32 bg-primary/5 blur-3xl pointer-events-none"></div>

      <div className="w-full max-w-[1280px] mx-auto px-margin relative z-10">
        {/* Top Main Row */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-space-lg pb-space-lg border-b border-white/5">
          {/* Brand Info */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-space-md">
            {/* Tactical Shield Logo with subtle hover glow */}
            <div className="flex items-center gap-3 group cursor-pointer">
              <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-primary/40 shadow-[0_2px_12px_rgba(226,178,88,0.25)] shrink-0 bg-surface-container-lowest group-hover:border-primary transition-all">
                <Image
                  src="/icons/icon-192x192.png"
                  alt="BOUNCE Mobile App Logo"
                  width={40}
                  height={40}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-headline-sm text-headline-sm text-on-surface font-bold tracking-tight uppercase">BOUNCE</span>
                <span className="font-label-sm text-[10px] text-outline tracking-widest uppercase">Tactical Private Security Group</span>
              </div>
            </div>

            {/* Tactical Grid Pill */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-container-high/60 border border-white/5 font-mono text-[10px] text-outline tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>GRID // 21.054°N 86.495°E • PAN-ODISHA DISPATCH</span>
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 font-label-md text-label-md text-on-surface-variant">
            <Link href="/" className="hover:text-primary transition-colors flex items-center gap-1 group">
              <span className="opacity-0 group-hover:opacity-100 text-primary text-xs transition-opacity">&gt;</span>
              <span>Home</span>
            </Link>
            <Link href="/bouncers" className="hover:text-primary transition-colors flex items-center gap-1 group">
              <span className="opacity-0 group-hover:opacity-100 text-primary text-xs transition-opacity">&gt;</span>
              <span>Available Roster</span>
            </Link>
            <Link href="/status" className="hover:text-primary transition-colors flex items-center gap-1 group">
              <span className="opacity-0 group-hover:opacity-100 text-primary text-xs transition-opacity">&gt;</span>
              <span>Live Tracker</span>
            </Link>
            <a href="tel:91800268623" className="hover:text-primary transition-colors flex items-center gap-1 group">
              <span className="opacity-0 group-hover:opacity-100 text-primary text-xs transition-opacity">&gt;</span>
              <span>Dispatch Desk</span>
            </a>
            <Link
              href="/book"
              className="px-3.5 py-1.5 rounded-lg bg-primary/10 border border-primary/30 text-primary hover:bg-primary hover:text-on-primary transition-all font-bold text-xs uppercase tracking-wider vengeance-btn"
            >
              Requisition Escort
            </Link>
          </div>
        </div>

        {/* Tactical Badges & Compliance Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-space-md border-b border-white/5">
          <div className="flex items-center gap-2.5 p-2 rounded-lg bg-surface-container-low/50 border border-white/5">
            <div className="w-8 h-8 rounded bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
              <span className="material-symbols-outlined text-[18px]">verified</span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-label-sm text-[10px] text-on-surface font-bold truncate">PSARA CERTIFIED</span>
              <span className="font-mono text-[9px] text-outline truncate">REG: PS/2026/OD/9941</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-2 rounded-lg bg-surface-container-low/50 border border-white/5">
            <div className="w-8 h-8 rounded bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
              <span className="material-symbols-outlined text-[18px]">shield</span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-label-sm text-[10px] text-on-surface font-bold truncate">TIER-1 VETTED</span>
              <span className="font-mono text-[9px] text-outline truncate">100% ARMED / UNARMED</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-2 rounded-lg bg-surface-container-low/50 border border-white/5">
            <div className="w-8 h-8 rounded bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
              <span className="material-symbols-outlined text-[18px]">lock</span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-label-sm text-[10px] text-on-surface font-bold truncate">VIP ANONYMITY</span>
              <span className="font-mono text-[9px] text-outline truncate">AES-256 ENCRYPTED</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-2 rounded-lg bg-surface-container-low/50 border border-white/5">
            <div className="w-8 h-8 rounded bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
              <span className="material-symbols-outlined text-[18px]">timer</span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-label-sm text-[10px] text-on-surface font-bold truncate">EXPRESS STANDBY</span>
              <span className="font-mono text-[9px] text-outline truncate">AVG ARRIVAL &lt; 15M</span>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Telemetry */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-space-sm pt-space-md font-body-sm text-xs text-outline">
          <p>© 2026 BOUNCE Tactical Escort Group. All rights reserved. Bhadrak • Bhubaneswar • Cuttack • Odisha.</p>
          <div className="flex items-center gap-space-md font-label-sm text-[11px] uppercase tracking-wider">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Dispatch Hub 01 Active
            </span>
            <span className="text-white/20">•</span>
            <span className="text-outline">Encrypted Sentinel Net</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

