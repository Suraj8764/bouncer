'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BottomNav from '@/components/BottomNav';
import BouncerCard, { BouncerData } from '@/components/BouncerCard';

export default function BouncersListPage() {
  const [bouncers, setBouncers] = useState<BouncerData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filters
  const [statusFilter, setStatusFilter] = useState<'all' | 'available' | 'busy'>('all');
  const [selectedLocation, setSelectedLocation] = useState<string>('all');

  useEffect(() => {
    async function loadBouncers() {
      try {
        setLoading(true);
        const res = await fetch('/api/bouncers');
        const json = await res.json();
        if (json.success) {
          setBouncers(json.data);
        } else {
          setError(json.error || 'Failed to load operative roster.');
        }
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : 'Network error';
        setError(msg);
      } finally {
        setLoading(false);
      }
    }
    loadBouncers();
  }, []);

  // Filter logic
  const filteredBouncers = bouncers.filter((b) => {
    // Status Filter
    if (statusFilter === 'available' && !b.isAvailable) return false;
    if (statusFilter === 'busy' && b.isAvailable) return false;

    // Location Filter
    if (selectedLocation !== 'all') {
      if (!b.location.toLowerCase().includes(selectedLocation.toLowerCase())) {
        return false;
      }
    }
    return true;
  });

  const availableCount = bouncers.filter((b) => b.isAvailable).length;

  return (
    <div className="min-h-screen flex flex-col bg-background font-body-md text-on-surface antialiased selection:bg-primary-container selection:text-on-primary-container">
      <Header />

      <main className="w-full pt-24 sm:pt-28 bg-background min-h-screen pb-24 md:pb-12 overflow-x-hidden">
        <div className="flex flex-col w-full">
          
          {/* Tactical Header & Status HUD */}
          <section className="w-full bg-surface-container-lowest px-margin py-space-xl relative overflow-hidden border-b border-outline-variant/15 cyber-grid-bg">
            <div className="absolute -right-24 -top-24 w-96 h-96 rounded-full bg-primary/10 blur-3xl pointer-events-none animate-pulse-glow"></div>
            <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row md:items-end justify-between gap-space-lg relative z-10">
              <div>
                <div className="flex items-center gap-space-xs font-mono text-[11px] text-primary tracking-widest uppercase mb-space-xs">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
                  </span>
                  <span>Tactical Escort Unit • Live Roster Dispatch</span>
                </div>
                <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface tracking-tight uppercase">
                  Available Bouncers
                </h1>
                <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl mt-space-xs">
                  Choose professional security for your event. Rigorously vetted, background-verified personnel ready for on-demand deployment.
                </p>
              </div>

              {/* Quick Metrics Ribbon */}
              <div className="vengeance-card hud-corner-tl flex items-center gap-space-sm bg-surface-container-low p-space-xs rounded-2xl self-start md:self-auto shadow-xl border border-white/10">
                <div className="px-space-md py-space-xs flex flex-col">
                  <span className="font-mono text-[10px] text-outline uppercase tracking-wider">Active Force</span>
                  <span className="font-headline-sm text-headline-sm text-on-surface font-bold">{bouncers.length || 28} Officers</span>
                </div>
                <div className="w-px h-8 bg-white/10"></div>
                <div className="px-space-md py-space-xs flex flex-col">
                  <span className="font-mono text-[10px] text-outline uppercase tracking-wider">Avg Response</span>
                  <span className="font-headline-sm text-headline-sm text-primary font-bold">15 Mins</span>
                </div>
                <div className="w-px h-8 bg-white/10"></div>
                <div className="px-space-md py-space-xs flex flex-col">
                  <span className="font-mono text-[10px] text-outline uppercase tracking-wider">Readiness</span>
                  <span className="font-headline-sm text-headline-sm text-emerald-400 font-bold">98.4%</span>
                </div>
              </div>
            </div>
          </section>

          {/* Control & Filter Module */}
          <section className="w-full bg-surface-container/95 px-margin py-space-md sticky top-20 z-40 backdrop-blur-md shadow-lg border-b border-outline-variant/20">
            <div className="max-w-[1280px] mx-auto flex flex-col gap-space-md">
              {/* Filter Controls */}
              <div className="flex flex-wrap items-center gap-space-sm">
                {/* Location Filter */}
                <div className="flex items-center gap-space-xs bg-surface-container-lowest px-space-sm py-space-xs rounded-lg text-on-surface border border-white/5 shrink-0">
                  <span className="material-symbols-outlined text-primary text-[18px]">location_on</span>
                  <span className="font-label-sm text-label-sm text-outline uppercase">Region:</span>
                  <select
                    className="bg-transparent font-label-md text-label-md text-on-surface focus:outline-none cursor-pointer pr-space-xs"
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                  >
                    <option className="bg-surface-container-high text-on-surface" value="all">All Locations</option>
                    <option className="bg-surface-container-high text-on-surface" value="bhadrak">Bhadrak</option>
                    <option className="bg-surface-container-high text-on-surface" value="bhubaneswar">Bhubaneswar</option>
                    <option className="bg-surface-container-high text-on-surface" value="cuttack">Cuttack</option>
                  </select>
                </div>

                {/* Availability Filter */}
                <div className="flex items-center bg-surface-container-lowest p-space-xs rounded-lg border border-white/5 shrink-0">
                  <button
                    onClick={() => setStatusFilter('all')}
                    className={`px-space-md py-space-xs rounded font-label-sm text-label-sm uppercase transition-all ${
                      statusFilter === 'all'
                        ? 'bg-surface-container-highest text-primary font-bold'
                        : 'text-on-surface-variant hover:text-on-surface'
                    }`}
                  >
                    All Units
                  </button>
                  <button
                    onClick={() => setStatusFilter('available')}
                    className={`px-space-md py-space-xs rounded font-label-sm text-label-sm uppercase transition-all flex items-center gap-1 ${
                      statusFilter === 'available'
                        ? 'bg-surface-container-highest text-primary font-bold'
                        : 'text-on-surface-variant hover:text-on-surface'
                    }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    Available Now ({availableCount})
                  </button>
                  <button
                    onClick={() => setStatusFilter('busy')}
                    className={`px-space-md py-space-xs rounded font-label-sm text-label-sm uppercase transition-all ${
                      statusFilter === 'busy'
                        ? 'bg-surface-container-highest text-primary font-bold'
                        : 'text-on-surface-variant hover:text-on-surface'
                    }`}
                  >
                    Busy
                  </button>
                </div>
              </div>

              {/* Live Sort & Clearance Indicator */}
              <div className="flex items-center justify-between gap-space-md">
                <div className="flex items-center gap-space-xs text-on-surface-variant font-label-sm text-label-sm">
                  <span className="material-symbols-outlined text-[16px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
                    verified_user
                  </span>
                  <span>Tier-1 Protection Only</span>
                </div>
                <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">
                  <span>{filteredBouncers.length}</span> Personnel Listed
                </span>
              </div>
            </div>
          </section>

          {/* Tactical Personnel Roster */}
          <section className="w-full px-margin py-space-xl">
            <div className="max-w-[1280px] mx-auto">
              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-lg">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex flex-col bg-surface-container-low rounded-xl p-4 animate-pulse h-96">
                      <div className="w-full aspect-square bg-surface-container rounded-lg mb-4" />
                      <div className="h-6 w-3/4 bg-surface-container rounded mb-2" />
                      <div className="h-4 w-1/2 bg-surface-container rounded mb-4" />
                      <div className="h-10 w-full bg-surface-container rounded mt-auto" />
                    </div>
                  ))}
                </div>
              ) : error ? (
                <div className="p-space-lg rounded-xl bg-surface-container-low text-center border border-rose-500/20 max-w-md mx-auto">
                  <span className="material-symbols-outlined text-rose-400 text-[36px] mb-2">warning</span>
                  <p className="text-rose-300 font-headline-sm text-headline-sm">{error}</p>
                </div>
              ) : filteredBouncers.length === 0 ? (
                <div className="p-space-xl rounded-xl bg-surface-container-low text-center border border-white/5 max-w-md mx-auto">
                  <span className="material-symbols-outlined text-outline text-[40px] mb-2">person_search</span>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface">No bouncers found</h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                    Try adjusting your location or status filter.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-space-lg">
                  {filteredBouncers.map((bouncer) => (
                    <BouncerCard key={bouncer.bouncerId || bouncer._id} bouncer={bouncer} />
                  ))}
                </div>
              )}
            </div>
          </section>

        </div>
      </main>

      <Footer />
      <BottomNav />
    </div>
  );
}
