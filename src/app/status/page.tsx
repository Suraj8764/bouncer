'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BottomNav from '@/components/BottomNav';

interface BookingItem {
  bookingId: string;
  customerName: string;
  phone: string;
  eventType: string;
  eventDate: string;
  startTime: string;
  endTime: string;
  eventLocation: string;
  bouncersRequired: number;
  selectedBouncers: string[];
  additionalRequirement?: string;
  totalAmount: number;
  status: 'Pending' | 'Confirmed' | 'Assigned' | 'Completed' | 'Cancelled';
  createdAt: string;
}

function StatusTrackerContent() {
  const searchParams = useSearchParams();
  const initialId = searchParams.get('id') || 'BKG-10025';

  const [bookingIdInput, setBookingIdInput] = useState(initialId);
  const [mobileInput, setMobileInput] = useState('+91 98765 43210');
  const [booking, setBooking] = useState<BookingItem | null>(null);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (initialId) {
      handleSearch(initialId);
    }
  }, [initialId]);

  async function handleSearch(idToQuery?: string) {
    const query = (idToQuery || bookingIdInput || '').trim().toUpperCase();
    if (!query) return;

    setLoading(true);
    setNotFound(false);
    setSearched(true);

    try {
      const res = await fetch(`/api/bookings/${query}`);
      const data = await res.json();
      if (data.success && data.data) {
        setBooking(data.data);
      } else {
        setBooking(null);
        setNotFound(true);
      }
    } catch (e) {
      console.error('Failed to query booking status:', e);
      setBooking(null);
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  }

  const steps = [
    { title: '1. Pending', subtitle: 'Command queue triage', icon: 'hourglass_top' },
    { title: '2. Confirmed', subtitle: 'Risk perimeter locked', icon: 'verified' },
    { title: '3. Assigned', subtitle: 'Operative dispatched', icon: 'badge' },
    { title: '4. Completed', subtitle: 'Mission accomplished', icon: 'task_alt' },
  ];

  const getStepIndex = (status: string) => {
    switch (status) {
      case 'Pending': return 0;
      case 'Confirmed': return 1;
      case 'Assigned': return 2;
      case 'Completed': return 3;
      case 'Cancelled': return -1;
      default: return 0;
    }
  };

  const currentStep = booking ? getStepIndex(booking.status) : 0;
  const isCancelled = booking?.status === 'Cancelled';

  return (
    <div className="bg-background text-on-surface font-body-md text-body-md min-h-screen flex flex-col antialiased selection:bg-primary selection:text-on-primary">
      <Header />

      <main className="w-full pt-24 sm:pt-28 bg-background min-h-screen pb-24 lg:pb-16 overflow-x-hidden">
        <div className="relative w-full max-w-[1280px] mx-auto px-margin py-space-xl">
          
          {/* Top Decorative Tracker Badge & Header */}
          <div className="flex flex-col items-center text-center mb-space-xl relative">
            <div className="inline-flex items-center gap-space-xs px-space-md py-space-xs rounded-full bg-surface-container-high shadow-inner mb-space-sm border border-primary/25">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span className="font-mono text-[11px] text-primary uppercase tracking-widest font-semibold">
                Tactical Audit &amp; Dispatch Sentinel
              </span>
            </div>
            <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface uppercase tracking-tight">
              Check Your Booking
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl mt-space-xs">
              Enter your Booking ID and mobile number to verify live status, agent deployment credentials, and operational checkpoints.
            </p>
          </div>

          {/* Search / Retrieval Module */}
          <div className="w-full max-w-4xl mx-auto mb-space-xl bg-surface-container-low p-space-md md:p-space-lg rounded-2xl shadow-2xl border border-white/10 vengeance-card hud-corner-tl">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSearch();
              }}
              className="grid grid-cols-1 md:grid-cols-12 gap-space-md items-end"
            >
              {/* Field 1: Booking ID */}
              <div className="md:col-span-5 flex flex-col gap-space-xs">
                <label className="font-mono text-[10px] text-outline uppercase tracking-wider flex items-center justify-between" htmlFor="booking-id">
                  <span>Booking Identifier</span>
                  <span className="text-primary font-mono lowercase text-[10px]">alphanumeric</span>
                </label>
                <div className="relative flex items-center">
                  <span className="material-symbols-outlined absolute left-space-md text-outline text-[20px] pointer-events-none">tag</span>
                  <input
                    id="booking-id"
                    type="text"
                    value={bookingIdInput}
                    onChange={(e) => setBookingIdInput(e.target.value)}
                    placeholder="e.g. BKG-10025"
                    className="w-full bg-surface-container-lowest text-on-surface font-headline-sm text-headline-sm uppercase tracking-wider pl-11 pr-space-md py-3 rounded-xl focus:outline-none focus:bg-surface-container transition-all shadow-inner placeholder:text-outline/50 border border-white/5"
                  />
                </div>
              </div>

              {/* Field 2: Mobile Number */}
              <div className="md:col-span-4 flex flex-col gap-space-xs">
                <label className="font-mono text-[10px] text-outline uppercase tracking-wider flex items-center justify-between" htmlFor="mobile-no">
                  <span>Client Mobile</span>
                  <span className="text-outline font-mono lowercase text-[10px]">otp-linked</span>
                </label>
                <div className="relative flex items-center">
                  <span className="material-symbols-outlined absolute left-space-md text-outline text-[20px] pointer-events-none">call</span>
                  <input
                    id="mobile-no"
                    type="tel"
                    value={mobileInput}
                    onChange={(e) => setMobileInput(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full bg-surface-container-lowest text-on-surface font-body-lg text-body-lg pl-11 pr-space-md py-3 rounded-xl focus:outline-none focus:bg-surface-container transition-all shadow-inner placeholder:text-outline/50 border border-white/5"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="md:col-span-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full h-[50px] inline-flex items-center justify-center gap-space-xs bg-primary text-on-primary font-label-lg text-label-lg font-bold rounded-xl hover:bg-primary-fixed transition-all duration-200 active:scale-95 shadow-xl shadow-primary/20 vengeance-btn border border-primary/40"
                >
                  {loading ? (
                    <>
                      <span className="material-symbols-outlined text-[20px] animate-spin">progress_activity</span>
                      <span>Scanning...</span>
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-[20px]">radar</span>
                      <span>Check Status</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Result View */}
          {loading ? (
            <div className="w-full max-w-4xl mx-auto p-12 text-center bg-surface-container-low rounded-xl border border-white/5">
              <span className="material-symbols-outlined text-primary text-[40px] animate-spin mb-3">progress_activity</span>
              <p className="font-label-md uppercase tracking-widest text-outline">Querying Tactical Satellite Link...</p>
            </div>
          ) : notFound ? (
            <div className="w-full max-w-4xl mx-auto p-8 text-center bg-surface-container-low rounded-xl border border-rose-500/20">
              <span className="material-symbols-outlined text-rose-400 text-[40px] mb-2">search_off</span>
              <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">Requisition #{bookingIdInput} Not Found</h3>
              <p className="font-body-md text-body-md text-on-surface-variant mt-1">
                Please verify your booking reference ID or speak directly with Dispatch.
              </p>
            </div>
          ) : booking ? (
            <div className="w-full max-w-4xl mx-auto flex flex-col gap-space-lg transition-opacity duration-300">
              
              {/* Operational Dossier Card */}
              <div className="bg-surface-container-low rounded-xl overflow-hidden shadow-2xl border border-white/5">
                
                {/* Header Strip */}
                <div className="p-space-md md:p-space-lg bg-surface-container flex flex-wrap items-center justify-between gap-space-md border-b border-white/5">
                  <div className="flex items-center gap-space-md">
                    <div className="w-12 h-12 rounded-lg bg-surface-container-high flex items-center justify-center text-primary shadow-inner border border-white/5">
                      <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                        shield_person
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center gap-space-sm">
                        <span className="font-label-sm text-label-sm text-outline uppercase tracking-widest font-mono">Reference</span>
                        <span className="px-space-xs py-0.5 rounded bg-surface-container-lowest font-mono font-headline-sm text-headline-sm text-primary tracking-wider border border-white/5">
                          {booking.bookingId}
                        </span>
                      </div>
                      <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                        Client: {booking.customerName} • {booking.eventType} • Protocol V4
                      </p>
                    </div>
                  </div>

                  {/* Status Pill */}
                  <div className="inline-flex items-center gap-space-xs px-space-md py-space-xs rounded-full bg-primary/10 shadow-inner border border-primary/20">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
                    </span>
                    <span className="font-label-md text-label-md text-primary font-bold tracking-wide uppercase">
                      {booking.status}
                    </span>
                  </div>
                </div>

                {/* 4-Step Tactical Timeline */}
                {!isCancelled ? (
                  <div className="p-space-md md:p-space-lg bg-surface-container-lowest border-b border-white/5">
                    <div className="flex items-center justify-between mb-space-md">
                      <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">Dispatch Progress Chain</span>
                      <span className="font-label-sm text-label-sm text-primary tracking-widest font-mono">
                        {currentStep + 1} OF 4 VERIFICATIONS COMPLETED
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-space-md">
                      {steps.map((step, idx) => {
                        const isDone = idx < currentStep;
                        const isActive = idx === currentStep;

                        return (
                          <div
                            key={step.title}
                            className={`flex sm:flex-col items-center sm:items-center text-left sm:text-center gap-space-sm p-space-sm rounded-lg transition-all ${
                              isActive
                                ? 'bg-surface-container-high border border-primary/30'
                                : isDone
                                ? 'bg-surface-container-low opacity-90'
                                : 'opacity-40'
                            }`}
                          >
                            <div
                              className={`w-10 h-10 rounded-full flex items-center justify-center z-10 ${
                                isActive
                                  ? 'bg-primary text-on-primary shadow-[0_0_20px_rgba(255,206,116,0.6)]'
                                  : isDone
                                  ? 'bg-emerald-500 text-white'
                                  : 'bg-surface-container-highest text-outline'
                              }`}
                            >
                              <span className="material-symbols-outlined text-[20px]">
                                {isDone ? 'check' : step.icon}
                              </span>
                            </div>
                            <div>
                              <h4 className={`font-label-lg text-label-lg font-bold ${isActive ? 'text-primary' : 'text-on-surface'}`}>
                                {step.title}
                              </h4>
                              <p className="font-body-sm text-body-sm text-on-surface-variant">
                                {step.subtitle}
                              </p>
                              {isActive && (
                                <span className="inline-block mt-0.5 px-1.5 py-0.5 rounded bg-primary/20 text-primary font-mono text-[9px] uppercase tracking-wider font-semibold">
                                  Active State
                                </span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <div className="p-space-md bg-rose-500/10 border-b border-rose-500/20 text-center">
                    <span className="font-label-md text-label-md text-rose-400 font-bold uppercase tracking-wider">
                      Mission Terminated / Cancelled by Command
                    </span>
                  </div>
                )}

                {/* Details Bento */}
                <div className="p-space-md md:p-space-lg grid grid-cols-1 md:grid-cols-2 gap-space-md">
                  <div className="flex flex-col gap-1 p-space-md rounded-xl bg-surface-container-high border border-white/5">
                    <span className="font-label-sm text-label-sm text-outline uppercase">Target Tactical Zone / Venue</span>
                    <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">{booking.eventLocation}</span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">Schedule: {booking.eventDate} ({booking.startTime} - {booking.endTime} IST)</span>
                  </div>

                  <div className="flex flex-col gap-1 p-space-md rounded-xl bg-surface-container-high border border-white/5">
                    <span className="font-label-sm text-label-sm text-outline uppercase">Assigned Force &amp; Tariff</span>
                    <span className="font-headline-sm text-headline-sm text-primary font-semibold">{booking.bouncersRequired} Tactical Officers</span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">Total Rate: ₹{booking.totalAmount?.toLocaleString('en-IN')} (PSARA Certified)</span>
                  </div>
                </div>

                {/* Footer Strip */}
                <div className="p-space-md bg-surface-container flex flex-wrap items-center justify-between gap-space-sm border-t border-white/5">
                  <div className="flex items-center gap-space-xs text-outline font-label-sm text-label-sm">
                    <span className="material-symbols-outlined text-[16px] text-emerald-400">cell_tower</span>
                    <span>Direct GPS Telemetry Uplink Active</span>
                  </div>
                  <a
                    href="tel:91800268623"
                    className="inline-flex items-center gap-space-xs px-space-md py-space-xs rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-primary font-label-md text-label-md font-semibold transition-colors border border-white/5"
                  >
                    <span className="material-symbols-outlined text-[16px]">call</span>
                    <span>Call Shift Commander</span>
                  </a>
                </div>

              </div>

            </div>
          ) : null}

        </div>
      </main>

      <Footer />
      <BottomNav />
    </div>
  );
}

export default function StatusPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex flex-col bg-background font-body-md text-on-surface items-center justify-center">
          <span className="material-symbols-outlined text-primary text-[36px] animate-spin">progress_activity</span>
          <p className="font-label-md uppercase tracking-widest text-outline mt-3">Loading Status Sentinel...</p>
        </div>
      }
    >
      <StatusTrackerContent />
    </Suspense>
  );
}
