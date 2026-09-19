'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BottomNav from '@/components/BottomNav';
import { BouncerData } from '@/components/BouncerCard';

export default function BouncerDetailPage() {
  const params = useParams();
  const router = useRouter();
  const bouncerId = params?.id as string;

  const [bouncer, setBouncer] = useState<BouncerData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadBouncer() {
      if (!bouncerId) return;
      try {
        setLoading(true);
        const res = await fetch(`/api/bouncers/${bouncerId}`);
        const json = await res.json();
        if (json.success) {
          setBouncer(json.data);
        } else {
          setError(json.error || 'Operative profile not found');
        }
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : 'Failed to fetch details';
        setError(msg);
      } finally {
        setLoading(false);
      }
    }
    loadBouncer();
  }, [bouncerId]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-background font-body-md text-on-surface antialiased">
        <Header showBack backHref="/bouncers" title="Bouncer Dossier" />
        <main className="flex-1 flex flex-col items-center justify-center pt-24 pb-12">
          <span className="material-symbols-outlined text-primary text-[40px] animate-spin">
            progress_activity
          </span>
          <p className="font-label-md uppercase tracking-widest text-outline mt-3">
            Decrypting Operative Dossier...
          </p>
        </main>
      </div>
    );
  }

  if (error || !bouncer) {
    return (
      <div className="min-h-screen flex flex-col bg-background font-body-md text-on-surface antialiased">
        <Header showBack backHref="/bouncers" title="Bouncer Dossier" />
        <main className="flex-1 flex flex-col items-center justify-center pt-24 px-margin text-center">
          <div className="w-16 h-16 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center mb-4">
            <span className="material-symbols-outlined text-[32px]">warning</span>
          </div>
          <h2 className="font-headline-sm text-on-surface mb-2">Operative Not Found</h2>
          <p className="font-body-md text-on-surface-variant mb-6">{error || 'Requested bouncer ID does not exist.'}</p>
          <Link
            href="/bouncers"
            className="h-12 px-6 rounded-xl bg-primary text-on-primary font-label-lg font-bold uppercase flex items-center justify-center"
          >
            Return to Operative Roster
          </Link>
        </main>
      </div>
    );
  }

  const isAvailable = bouncer.isAvailable;
  const martialArts = bouncer.martialArts || (bouncer.specializations && bouncer.specializations[0]) || 'Krav Maga';
  const specialty = bouncer.specialty || (bouncer.specializations && bouncer.specializations[1]) || 'VIP / Crowd';

  return (
    <div className="min-h-screen flex flex-col bg-background font-body-md text-on-surface antialiased selection:bg-primary-container selection:text-on-primary-container">
      <Header showBack backHref="/bouncers" title={bouncer.name} />

      <main className="w-full pt-24 sm:pt-28 bg-background min-h-screen pb-24 lg:pb-16 overflow-x-hidden">
        <div className="flex flex-col w-full">
          <div className="w-full max-w-[1280px] mx-auto px-margin py-space-md lg:py-space-lg flex flex-col gap-space-lg">
            
            {/* Top Navigation & Global Deployment Status Ribbon */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-space-sm bg-surface-container-low p-space-md rounded-2xl shadow-md border border-white/10 vengeance-card hud-corner-tl">
              <Link
                href="/bouncers"
                className="inline-flex items-center gap-space-xs font-label-lg text-label-lg text-on-surface-variant hover:text-primary transition-colors group"
              >
                <span className="material-symbols-outlined text-[18px] group-hover:-translate-x-1.5 transition-transform">arrow_back</span>
                <span>Back to Available Bouncers</span>
              </Link>
              <div className="flex items-center gap-space-md">
                <div className="flex items-center gap-space-xs bg-surface-container px-space-md py-space-xs rounded-full border border-white/10 shadow-inner">
                  {isAvailable ? (
                    <>
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
                      </span>
                      <span className="font-mono text-[11px] text-emerald-400 uppercase tracking-wider font-bold">
                        Officer Status: Ready for Immediate Deployment
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="w-2 h-2 rounded-full bg-rose-400"></span>
                      <span className="font-mono text-[11px] text-rose-300 uppercase tracking-wider font-bold">
                        Officer Status: Mobilized On-Duty (Busy)
                      </span>
                    </>
                  )}
                </div>
                <span className="hidden md:inline-block font-mono text-[11px] text-outline">REF: SEC-OR-{bouncer.bouncerId}</span>
              </div>
            </div>

            {/* Main Dossier Showcase: Split Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start w-full min-w-0">
              
              {/* Left Column: Tactical Portrait & Rapid Quick-Actions (5 Cols) */}
              <div className="lg:col-span-5 flex flex-col gap-space-md lg:sticky lg:top-28">
                {/* Visual Card with Vengeance Laser & HUD Reticles */}
                <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-surface-container-lowest shadow-2xl group border border-primary/25 hud-corner-tl hud-corner-br">
                  {/* Laser Scan line on photo */}
                  <div className="laser-scan-line"></div>

                  <img
                    alt={`${bouncer.name} - Tactical Executive Protection Specialist`}
                    className="w-full h-full object-cover object-top filter grayscale contrast-110 group-hover:grayscale-0 group-hover:scale-102 transition-all duration-700 ease-out"
                    src={bouncer.image || '/images/raj_kumar.png'}
                  />
                  {/* Tactical Scrim & Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-surface-container-lowest/30 to-transparent"></div>

                  {/* Overhead Operative Status Tag */}
                  <div className="absolute top-space-md left-space-md flex flex-wrap gap-space-xs">
                    <span className="bg-surface-container-lowest/90 backdrop-blur-md text-primary px-space-sm py-space-xs rounded-lg font-mono text-[10px] uppercase tracking-wider flex items-center gap-1 shadow-md border border-primary/30 font-bold">
                      <span className="material-symbols-outlined text-[14px]">military_tech</span> Tier-1 VIP Escort
                    </span>
                    {isAvailable && (
                      <span className="bg-emerald-950/80 backdrop-blur-md text-emerald-400 px-space-sm py-space-xs rounded-lg font-mono text-[10px] uppercase tracking-wider flex items-center gap-1 shadow-md border border-emerald-500/30 font-bold">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span> Live Active
                      </span>
                    )}
                  </div>

                  {/* Bottom Visual Footprint: Pricing & Clearance Badge */}
                  <div className="absolute bottom-space-md inset-x-space-md flex items-end justify-between gap-space-sm bg-surface-container-high/95 backdrop-blur-lg p-space-md rounded-xl shadow-xl border border-white/10">
                    <div className="flex flex-col">
                      <span className="font-mono text-[10px] text-on-surface-variant uppercase tracking-wider">Deployment Base Tariff</span>
                      <div className="flex items-baseline gap-space-xs">
                        <span className="font-headline-lg text-headline-lg text-primary">₹{bouncer.price.toLocaleString('en-IN')}</span>
                        <span className="font-body-sm text-body-sm text-on-surface-variant">/ Event (6h)</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-mono text-[10px] text-outline block">VETTING SCORE</span>
                      <span className="font-headline-sm text-headline-sm text-on-surface font-bold tracking-tight">99.8% A+</span>
                    </div>
                  </div>
                </div>

                {/* Quick Action Terminal */}
                <div className="flex flex-col gap-space-sm bg-surface-container p-space-md rounded-2xl shadow-xl border border-white/10 vengeance-card hud-corner-tl">
                  {isAvailable ? (
                    <Link
                      href={`/book?bouncerId=${bouncer.bouncerId}`}
                      className="w-full py-space-md px-space-lg bg-primary hover:bg-primary-fixed text-on-primary font-label-lg text-label-lg font-bold rounded-xl flex items-center justify-center gap-space-sm shadow-xl shadow-primary/20 transition-all active:scale-95 vengeance-btn border border-primary/40"
                    >
                      <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                        shield_person
                      </span>
                      <span>Book {bouncer.name} for Event</span>
                    </Link>
                  ) : (
                    <button
                      disabled
                      className="w-full py-space-md px-space-lg bg-surface-container-high text-outline font-label-lg text-label-lg rounded-xl flex items-center justify-center gap-space-sm cursor-not-allowed"
                    >
                      <span className="material-symbols-outlined text-[20px]">lock_clock</span>
                      <span>Currently Mobilized on Mission</span>
                    </button>
                  )}

                  <a
                    href="tel:91800268623"
                    className="w-full py-space-sm px-space-md bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-label-md text-label-md rounded-lg flex items-center justify-center gap-space-xs transition-colors border border-white/5"
                  >
                    <span className="material-symbols-outlined text-[18px] text-primary">call</span>
                    <span>Call Dispatch Desk (+91 800-BOUNCE)</span>
                  </a>

                  <div className="flex items-center justify-center gap-space-xs text-outline font-label-sm text-label-sm pt-space-xs">
                    <span className="material-symbols-outlined text-[14px]">lock</span>
                    <span>Instant Dispatch Lock • Full NDAs Guaranteed</span>
                  </div>
                </div>

                {/* Tactical Attire Options */}
                <div className="bg-surface-container-low p-space-md rounded-xl flex flex-col gap-space-sm shadow-sm border border-white/5">
                  <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">Permitted Uniform Dress Codes</span>
                  <div className="grid grid-cols-3 gap-space-xs text-center">
                    <div className="bg-surface-container p-space-xs rounded flex flex-col items-center">
                      <span className="material-symbols-outlined text-[20px] text-on-surface-variant">dry_cleaning</span>
                      <span className="font-label-sm text-label-sm text-on-surface mt-1">Black-Tie Suit</span>
                    </div>
                    <div className="bg-surface-container p-space-xs rounded flex flex-col items-center">
                      <span className="material-symbols-outlined text-[20px] text-on-surface-variant">security</span>
                      <span className="font-label-sm text-label-sm text-on-surface mt-1">Safari Armor</span>
                    </div>
                    <div className="bg-surface-container p-space-xs rounded flex flex-col items-center">
                      <span className="material-symbols-outlined text-[20px] text-on-surface-variant">visibility_off</span>
                      <span className="font-label-sm text-label-sm text-on-surface mt-1">Concealed Civilian</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: In-Depth Operational Dossier (7 Cols) */}
              <div className="lg:col-span-7 flex flex-col gap-space-lg">
                
                {/* Header & Identity Matrix */}
                <div className="bg-surface-container p-space-lg md:p-space-xl rounded-xl shadow-md flex flex-col gap-space-md border border-white/5">
                  <div className="flex flex-wrap items-center justify-between gap-space-sm">
                    <div className="inline-flex items-center gap-space-xs bg-surface-container-high px-space-sm py-0.5 rounded font-label-sm text-label-sm text-primary uppercase tracking-wider border border-white/5">
                      <span className="material-symbols-outlined text-[14px]">badge</span> Operational Unit ID: {bouncer.bouncerId}
                    </div>
                    <div className="flex items-center gap-space-xs text-outline font-label-sm text-label-sm uppercase">
                      <span className="material-symbols-outlined text-[16px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span> State Certified PSARA 2026
                    </div>
                  </div>

                  <div className="flex flex-col gap-space-xs">
                    <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface tracking-tight leading-none">
                      {bouncer.name}
                    </h1>
                    <p className="font-headline-sm text-headline-sm text-on-surface-variant">
                      Executive Protection Specialist &amp; Tactical Escort Lead
                    </p>
                  </div>

                  {/* Credential Badges Row */}
                  <div className="flex flex-wrap gap-space-xs pt-space-xs">
                    <span className="bg-surface-container-high text-on-surface px-space-sm py-space-xs rounded font-label-md text-label-md flex items-center gap-1.5 border border-white/5">
                      <span className="material-symbols-outlined text-[16px] text-primary">verified</span> PSARA Certified
                    </span>
                    <span className="bg-surface-container-high text-on-surface px-space-sm py-space-xs rounded font-label-md text-label-md flex items-center gap-1.5 border border-white/5">
                      <span className="material-symbols-outlined text-[16px] text-primary">fingerprint</span> Govt. Background Cleared
                    </span>
                    <span className="bg-surface-container-high text-on-surface px-space-sm py-space-xs rounded font-label-md text-label-md flex items-center gap-1.5 border border-white/5">
                      <span className="material-symbols-outlined text-[16px] text-primary">medical_services</span> CPR &amp; Trauma First Aid
                    </span>
                    <span className="bg-surface-container-high text-on-surface px-space-sm py-space-xs rounded font-label-md text-label-md flex items-center gap-1.5 border border-white/5">
                      <span className="material-symbols-outlined text-[16px] text-primary">sports_martial_arts</span> Armed / Tactical Protocol
                    </span>
                  </div>
                </div>

                {/* Physical & Tactical Metrics Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-space-sm">
                  <div className="bg-surface-container-low p-space-md rounded-xl shadow-sm flex flex-col gap-1 border border-white/5">
                    <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">Physical Stature</span>
                    <span className="font-headline-md text-headline-md text-on-surface font-bold">{bouncer.height}</span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">96 kg • Solid Build</span>
                  </div>

                  <div className="bg-surface-container-low p-space-md rounded-xl shadow-sm flex flex-col gap-1 border border-white/5">
                    <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">Field Seniority</span>
                    <span className="font-headline-md text-headline-md text-on-surface font-bold">{bouncer.experience}</span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">{bouncer.missionsCount || 250}+ Incident-Free Ops</span>
                  </div>

                  <div className="bg-surface-container-low p-space-md rounded-xl shadow-sm flex flex-col gap-1 border border-white/5">
                    <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">Operational Station</span>
                    <span className="font-headline-md text-headline-md text-on-surface font-bold truncate">{bouncer.location}</span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">Deployable Pan-Odisha</span>
                  </div>

                  <div className="bg-surface-container-low p-space-md rounded-xl shadow-sm flex flex-col gap-1 border border-white/5">
                    <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">Martial Arts Discipline</span>
                    <span className="font-headline-md text-headline-md text-on-surface font-bold">{martialArts}</span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">Black Belt / Tactical Restraint</span>
                  </div>

                  <div className="bg-surface-container-low p-space-md rounded-xl shadow-sm flex flex-col gap-1 border border-white/5">
                    <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">Language Proficiency</span>
                    <span className="font-headline-md text-headline-md text-on-surface font-bold">Odia, Hindi, Eng</span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">Diplomatic Communication</span>
                  </div>

                  <div className="bg-surface-container-low p-space-md rounded-xl shadow-sm flex flex-col gap-1 border border-white/5">
                    <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">Client Trust Score</span>
                    <span className="font-headline-md text-headline-md text-primary font-bold">{bouncer.rating || '4.9'} / 5.0</span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">100% Five-Star Rating</span>
                  </div>
                </div>

                {/* Tactical Biography & Background */}
                <div className="bg-surface-container-low p-space-lg md:p-space-xl rounded-xl shadow-md flex flex-col gap-space-md border border-white/5">
                  <div className="flex items-center gap-space-xs font-label-sm text-label-sm text-primary uppercase tracking-widest">
                    <span className="material-symbols-outlined text-[16px]">description</span>
                    <span>Operational Background &amp; Profile Summary</span>
                  </div>
                  <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                    {bouncer.description}
                  </p>
                  <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                    Experienced across state banquets, high-profile celebrity security corridors, corporate shareholder conclaves, and luxury wedding escort duty. Rigorously vetted through civil, medical, and psychological security screening benchmarks.
                  </p>
                </div>

              </div>

            </div>

          </div>
        </div>
      </main>

      <Footer />
      <BottomNav />
    </div>
  );
}
