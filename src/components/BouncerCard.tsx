'use client';

import Link from 'next/link';

export interface BouncerData {
  _id?: string;
  bouncerId: string;
  name: string;
  image: string;
  height: string;
  experience: string;
  location: string;
  price: number;
  description: string;
  isAvailable: boolean;
  rating?: number;
  missionsCount?: number;
  specializations?: string[];
  martialArts?: string;
  specialty?: string;
}

interface BouncerCardProps {
  bouncer: BouncerData;
}

export default function BouncerCard({ bouncer }: BouncerCardProps) {
  const isAvailable = bouncer.isAvailable;
  const martialArts = bouncer.martialArts || (bouncer.specializations && bouncer.specializations[0]) || 'Krav Maga';
  const specialty = bouncer.specialty || (bouncer.specializations && bouncer.specializations[1]) || 'VIP / Crowd';

  return (
    <div
      className={`vengeance-card hud-corner-br flex flex-col rounded-2xl overflow-hidden shadow-2xl transition-transform duration-200 group h-full ${
        isAvailable ? 'hover:-translate-y-1 hover:border-primary/50' : 'opacity-85'
      }`}
    >
      {/* Visual Image Header with Cyber-Tactical Brackets & Laser Scanner */}
      <Link
        href={`/bouncers/${bouncer.bouncerId}`}
        className="block relative w-full aspect-square bg-surface-container-highest overflow-hidden shrink-0 hud-corner-tl"
      >
        {/* Subtle Laser Scan on hover */}
        <div className="laser-scan-line opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        <img
          alt={`${bouncer.name} - Tactical Security Officer`}
          className={`w-full h-full object-cover object-top filter grayscale contrast-125 transition-all duration-500 ease-out ${
            isAvailable ? 'group-hover:scale-105 group-hover:grayscale-0' : ''
          }`}
          src={bouncer.image || '/images/raj_kumar.png'}
        />
        {/* Deep Vignette Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low via-transparent to-transparent opacity-90"></div>

        {/* Live Status Pill with Radar Beacon */}
        <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-surface-container-lowest/90 backdrop-blur-md flex items-center gap-1.5 shadow-lg border border-white/10">
          {isAvailable ? (
            <>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
              </span>
              <span className="font-mono text-[10px] text-emerald-400 uppercase tracking-widest font-bold">
                Available
              </span>
            </>
          ) : (
            <>
              <span className="w-2 h-2 rounded-full bg-rose-400"></span>
              <span className="font-mono text-[10px] text-rose-400 uppercase tracking-widest font-bold">
                On Mission
              </span>
            </>
          )}
        </div>

        {/* Tactical ID Overlay */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-surface-container-lowest/90 px-2.5 py-1 rounded border border-primary/25 backdrop-blur-sm shadow-md">
          <span className="material-symbols-outlined text-primary text-[14px]">badge</span>
          <span className="font-mono text-[11px] text-primary font-bold tracking-widest uppercase">
            {bouncer.bouncerId}
          </span>
        </div>
      </Link>

      {/* Body Content */}
      <div className="p-4 sm:p-5 flex flex-col flex-grow justify-between bg-surface-container-low">
        <div>
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0 flex-1">
              <Link href={`/bouncers/${bouncer.bouncerId}`}>
                <h2 className="font-headline-sm text-lg text-on-surface font-bold group-hover:text-primary transition-colors truncate">
                  {bouncer.name}
                </h2>
              </Link>
              <p className="font-label-sm text-xs text-outline flex items-center gap-1 mt-1 truncate">
                <span className="material-symbols-outlined text-[14px] text-primary shrink-0">pin_drop</span>
                <span className="truncate">{bouncer.location} • Executive Escort</span>
              </p>
            </div>
            <div className="flex items-center gap-1 text-primary font-label-sm text-xs font-bold bg-primary/10 px-2 py-0.5 rounded border border-primary/25 shrink-0">
              <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                star
              </span>
              {bouncer.rating || '4.9'}
            </div>
          </div>

          {/* Technical Specification Grid */}
          <div className="grid grid-cols-2 gap-1.5 mt-3.5 p-2 bg-surface-container-lowest rounded-xl border border-white/5">
            <div className="flex flex-col px-2 py-1">
              <span className="font-mono text-[9px] text-outline uppercase tracking-wider">Height</span>
              <span className="font-label-md text-xs sm:text-sm text-on-surface font-semibold truncate">{bouncer.height}</span>
            </div>
            <div className="flex flex-col px-2 py-1">
              <span className="font-mono text-[9px] text-outline uppercase tracking-wider">Experience</span>
              <span className="font-label-md text-xs sm:text-sm text-on-surface font-semibold truncate">{bouncer.experience}</span>
            </div>
            <div className="flex flex-col px-2 py-1">
              <span className="font-mono text-[9px] text-outline uppercase tracking-wider">Specialty</span>
              <span className="font-label-md text-xs sm:text-sm text-on-surface font-semibold truncate">{specialty}</span>
            </div>
            <div className="flex flex-col px-2 py-1">
              <span className="font-mono text-[9px] text-outline uppercase tracking-wider">Discipline</span>
              <span className="font-label-md text-xs sm:text-sm text-on-surface font-semibold truncate">{martialArts}</span>
            </div>
          </div>
        </div>

        {/* Price & Action Trigger */}
        <div className="pt-3.5 mt-3.5 flex items-center justify-between gap-3 border-t border-white/5">
          <div className="flex flex-col">
            <span className="font-mono text-[9px] text-outline uppercase tracking-wider">Tariff</span>
            <span className="font-headline-sm text-base sm:text-lg text-primary font-bold">
              ₹{bouncer.price.toLocaleString('en-IN')}{' '}
              <span className="font-label-sm text-[11px] text-on-surface-variant font-normal">/ Event</span>
            </span>
          </div>

          {isAvailable ? (
            <Link
              href={`/book?bouncerId=${bouncer.bouncerId}`}
              className="px-4 py-2 rounded-xl bg-primary text-on-primary font-label-md text-xs sm:text-sm font-bold hover:bg-primary-fixed active:scale-95 transition-all flex items-center gap-1 shadow-lg shadow-primary/25 shrink-0 border border-primary/40 vengeance-btn"
            >
              <span>Book Now</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </Link>
          ) : (
            <Link
              href={`/bouncers/${bouncer.bouncerId}`}
              className="px-3.5 py-2 rounded-xl bg-surface-container-high text-outline font-label-md text-xs font-semibold hover:bg-surface-container-highest transition-all flex items-center gap-1 shrink-0 vengeance-btn border border-white/5"
            >
              <span>Dossier</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
